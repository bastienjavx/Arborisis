# SSO OAuth2 — Laravel → Wiki.js

## Architecture

Wiki.js est configuré avec une stratégie OAuth2 personnalisée qui pointe sur l'application Laravel. Le flux est le suivant :

```
Utilisateur → wiki.arborisis.com → [clique "Connexion Arborisis"]
    → Redirect vers : https://arborisis.com/internal/wiki/oauth/authorize
    → Laravel vérifie la session utilisateur
    → Si connecté : génère un code OAuth temporaire
    → Redirect vers : wiki.arborisis.com/login/{provider}/callback?code=...
    → Wiki.js échange le code contre un token
    → Wiki.js récupère les infos utilisateur (/internal/wiki/oauth/user)
    → Connexion réussie (création de compte wiki si nécessaire)
```

## Configuration Wiki.js

Dans l'admin Wiki.js (`/admin/auth`) :

| Paramètre | Valeur |
|-----------|--------|
| Strategy | OAuth2 |
| Client ID | `arborisis-wiki` |
| Client Secret | `(voir .env WIKI_AUTH_OAUTH2_CLIENT_SECRET)` |
| Authorization URL | `https://arborisis.com/internal/wiki/oauth/authorize` |
| Token URL | `https://arborisis.com/internal/wiki/oauth/token` |
| User Info URL | `https://arborisis.com/internal/wiki/oauth/user` |
| Scopes | `openid profile email` |

Mapping des claims :
| Claim Wiki.js | Champ Laravel |
|---------------|---------------|
| ID | `id` |
| Email | `email` |
| Display Name | `name` |
| Groups | `role` (admin → Administrators, moderator → Editors, creator → Editors) |

## Endpoints Laravel à implémenter

### `GET /internal/wiki/oauth/authorize`

Vérifie que l'utilisateur est authentifié (session Laravel).
Si oui, génère un code OAuth temporaire (stocké en Redis, TTL 5 min) et redirige vers Wiki.js.

**Headers requis** : Aucun (session cookie)
**Query params** :
- `redirect_uri` — URL de callback Wiki.js
- `state` — CSRF token

**Response** : Redirect 302 vers `redirect_uri?code=XXX&state=YYY`

### `POST /internal/wiki/oauth/token`

Échange un code contre un token JWT.

**Headers** :
- `Authorization: Basic base64(client_id:client_secret)`
- `Content-Type: application/x-www-form-urlencoded`

**Body** :
- `grant_type=authorization_code`
- `code=XXX`
- `redirect_uri=YYY`

**Response** :
```json
{
  "access_token": "jwt-token",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### `GET /internal/wiki/oauth/user`

Retourne les informations de l'utilisateur authentifié.

**Headers** :
- `Authorization: Bearer <access_token>`

**Response** :
```json
{
  "id": 42,
  "email": "user@example.com",
  "name": "Jean Dupont",
  "role": "admin",
  "picture": "https://arborisis.com/storage/avatars/42.jpg"
}
```

## Middleware de protection

Ces endpoints doivent être protégés par :
1. **Rate limiting** : 10 req/min par IP
2. **Vérification du `redirect_uri`** : doit correspondre exactement à `https://wiki.arborisis.com/login/oauth2/callback`
3. **Vérification du `client_id`** et `client_secret`

## Fallback local

Si l'API Laravel est indisponible, Wiki.js dispose d'un compte admin local d'urgence :
- Username : `admin`
- Password : `(voir .env WIKI_ADMIN_PASSWORD)`

Ce compte ne doit être utilisé qu'en cas de panne SSO.

## Implémentation Laravel

Ajouter dans `routes/internal.php` :

```php
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Str;

Route::prefix('wiki/oauth')
    ->middleware(['auth', 'throttle:10,1'])
    ->group(function () {

    Route::get('/authorize', function () {
        $redirectUri = request('redirect_uri');
        $state = request('state');

        // Vérifier redirect_uri
        if ($redirectUri !== config('wiki.oauth_redirect_uri')) {
            abort(400, 'Invalid redirect_uri');
        }

        $code = Str::random(64);
        Redis::setex("wiki:oauth:code:$code", 300, json_encode([
            'user_id' => auth()->id(),
            'redirect_uri' => $redirectUri,
        ]));

        return redirect("$redirectUri?code=$code&state=$state");
    });

    Route::post('/token', function () {
        // Vérifier client credentials
        $auth = request()->header('Authorization');
        // ... validation Basic auth ...

        $code = request('code');
        $data = Redis::get("wiki:oauth:code:$code");

        if (!$data) {
            abort(400, 'Invalid or expired code');
        }

        Redis::del("wiki:oauth:code:$code");
        $data = json_decode($data, true);
        $user = User::find($data['user_id']);

        $token = JWT::encode([
            'sub' => $user->id,
            'email' => $user->email,
            'name' => $user->name,
            'role' => $user->role->value,
            'iat' => now()->timestamp,
            'exp' => now()->addHour()->timestamp,
        ], config('wiki.oauth_secret'), 'HS256');

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => 3600,
        ]);
    });

    Route::get('/user', function () {
        $token = str_replace('Bearer ', '', request()->header('Authorization'));
        $payload = JWT::decode($token, config('wiki.oauth_secret'), ['HS256']);

        $user = User::find($payload->sub);

        return response()->json([
            'id' => $user->id,
            'email' => $user->email,
            'name' => $user->name,
            'role' => $user->role->value,
            'picture' => $user->avatar_url,
        ]);
    });
});
```

## Configuration `.env`

```env
WIKI_OAUTH_REDIRECT_URI=https://wiki.arborisis.com/login/oauth2/callback
WIKI_OAUTH_SECRET=wiki-jwt-secret-key-min-32-chars
```

## Dépannage

| Problème | Cause | Solution |
|----------|-------|----------|
| "Invalid client" | Client ID/Secret mismatch | Vérifier la correspondance entre Wiki.js et Laravel |
| "Invalid code" | Code expiré ou déjà utilisé | Le code est à usage unique, TTL 5 min |
| "Unauthorized" | Token JWT expiré | Wiki.js rafraîchit automatiquement |
| Boucle de connexion | Session Laravel invalide | Se reconnecter sur arborisis.com d'abord |
