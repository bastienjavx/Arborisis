# Arborisis — Architecture Laravel recommandée

> Document de référence technique — version MVP 1.0
> Date : 2026-05-05

---

## 1. Résumé technique

Arborisis est une plateforme sociale premium de field recording nature, construite comme une **SPA hybride** avec Laravel (backend API + SSR), Inertia.js (bridge), Vue 3 (frontend réactif), et Tailwind CSS (design system). Le choix privilégie une expérience utilisateur fluide, moderne et cartographique, tout en conservant la simplicité de développement et la sécurité de Laravel. Le stockage audio est externalisé sur Contabo S3 (compatible AWS S3 API). Le système de crédits internes ECHO repose sur Stripe Checkout avec une logique métier strictement transactionnelle côté serveur.

---

## 2. Stack finale recommandée

### Backend
| Technologie | Choix | Justification |
|-------------|-------|---------------|
| **Laravel** | 12.x (dernière stable) | Ecosystème mature, Cashier, Queues, Notifications, Filament |
| **PHP** | 8.3+ (8.5.2 disponible) | Typage fort, performance, enums, fibers |
| **PostgreSQL** | 16+ | **Recommandé** — typage géographique natif (PostGIS), JSONB, index GIST pour coordonnées |
| **Redis** | 7+ | Cache, sessions, queues, rate limiting |
| **Laravel Cashier (Stripe)** | 15.x | Gestion complète des abonnements/paiements Stripe |
| **Laravel Queue** | Database/Redis | Traitement asynchrone : upload audio, waveform, notifications |
| **Laravel Notifications** | Intégré | Notifications in-app, email |
| **Laravel Storage** | Driver S3 | Contabo S3 compatible |
| **Laravel Sanctum** | Intégré | Authentification API stateless si besoin futur (API mobile) |
| **Filament** | 3.x | Admin panel rapide, robuste, maintenable |

### Frontend
| Technologie | Choix | Justification |
|-------------|-------|---------------|
| **Inertia.js** | 2.x | Bridge Laravel ↔ Vue sans API REST séparée. Routage côté serveur, réactivité côté client. |
| **Vue 3** | 3.4+ | Composition API, réactivité fine, écosystème riche |
| **TypeScript** | Optionnel V1 | Recommandé dès le début pour les types ECHO, transactions, coordonnées. MVP : JSDoc + props typées. |
| **Tailwind CSS** | 4.x | Utility-first, design system cohérent, dark mode natif |
| **shadcn-vue** | Dernier | Composants UI accessibles, premium, cohérents avec Tailwind |
| **Leaflet** | 1.9+ | Open source, léger, clusters, personnalisable, pas de token obligatoire |
| **Wavesurfer.js** | 7.x | Waveform audio moderne, performante, accessible |
| **VueUse** | 10+ | Composables utilitaires (géolocalisation, media queries, clipboard) |

### Pourquoi Inertia/Vue plutôt que Livewire ?

| Critère | Inertia + Vue | Livewire + Alpine |
|---------|---------------|-------------------|
| Expérience carte interactive | **Excellente** — réactivité client, pas de round-trip serveur | Limitée — rechargements partiels |
| Lecteur audio persistant | **Facile** — état global Vue, mini-player global | Complexe — état dispersé |
| Performance UX | **SPA-like** | Classique requête/Réponse |
| Courbe d'apprentissage | Moyenne (Vue à apprendre) | Faible (reste dans Blade) |
| Évolutivité mobile future | **Prête** — API déjà isolée, passage PWA/Native facile | Refactor majeur nécessaire |
| Maintenabilité long terme | **Élevée** — séparation claire front/back | Couplée à Laravel |
| Écosystème composants | **Riche** (shadcn-vue, Vue ecosystem) | Croissante mais plus limitée |

**Verdict** : Pour Arborisis, la carte interactive et le lecteur audio sont le cœur de l'expérience. Inertia + Vue offre la fluidité nécessaire sans la complexité d'une API REST séparée.

---

## 3. Architecture globale

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │  Vue 3 SPA   │  │   Leaflet    │  │   Wavesurfer.js Player   │  │
│  │  (Inertia)   │  │    Map       │  │                          │  │
│  └──────┬───────┘  └──────┬───────┘  └───────────┬──────────────┘  │
│         │                 │                      │                 │
│         └─────────────────┴──────────────────────┘                 │
│                           │                                        │
│                    Inertia Requests (XHR)                          │
└───────────────────────────┬────────────────────────────────────────┘
                            │
┌───────────────────────────┼────────────────────────────────────────┐
│                      LARAVEL BACKEND                                │
│                           │                                         │
│  ┌────────────────────────┼─────────────────────────────────────┐  │
│  │      HTTP Layer        │  Routes → Middleware → Controllers   │  │
│  │                        │  Form Requests → Policies → Gates    │  │
│  └────────────────────────┼─────────────────────────────────────┘  │
│                           │                                         │
│  ┌────────────────────────┼─────────────────────────────────────┐  │
│  │     Service Layer      │  SoundService, EchoService,         │  │
│  │                        │  UploadService, NotificationService   │  │
│  └────────────────────────┼─────────────────────────────────────┘  │
│                           │                                         │
│  ┌────────────────────────┼─────────────────────────────────────┐  │
│  │       Models           │  Eloquent + Relationships             │  │
│  └────────────────────────┼─────────────────────────────────────┘  │
│                           │                                         │
│  ┌────────────┬───────────┴───────────┬─────────────────────────┐  │
│  │ PostgreSQL │       Redis           │      Contabo S3         │  │
│  │  (Data)    │  (Cache/Queue/Session)│   (Audio/Images)        │  │
│  └────────────┴───────────────────────┴─────────────────────────┘  │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  External : Stripe (paiements), Mail (notifications),       │   │
│  │  Filament (admin panel)                                     │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### Principes architecturaux
- **Single Responsibility** : Un service = un domaine métier
- **Fail-safe** : Les uploads sont transactionnels (DB + S3)
- **Privacy-first** : Les coordonnées exactes ne sortent jamais publiquement
- **Audit trail** : Toute transaction ECHO est journalisée immuablement
- **Defense in depth** : Validation à tous les niveaux (Form Request → Policy → Service → DB)

---

## 4. Structure des dossiers

```
<redacted>/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/                  # Breeze auth controllers
│   │   │   ├── Web/
│   │   │   │   ├── LandingController.php
│   │   │   │   ├── MapController.php
│   │   │   │   ├── SoundController.php
│   │   │   │   ├── CreatorController.php
│   │   │   │   ├── EchoController.php
│   │   │   │   └── Dashboard/
│   │   │   │       ├── DashboardController.php
│   │   │   │       ├── MySoundsController.php
│   │   │   │       ├── MyEchoController.php
│   │   │   │       └── SettingsController.php
│   │   │   └── Api/
│   │   │       ├── MapController.php      # API carte (JSON)
│   │   │       ├── SoundController.php    # API sons (JSON)
│   │   │       └── InteractionController.php
│   │   ├── Middleware/
│   │   ├── Requests/                  # Form Requests
│   │   │   ├── Sound/
│   │   │   │   ├── StoreSoundRequest.php
│   │   │   │   └── UpdateSoundRequest.php
│   │   │   ├── Echo/
│   │   │   │   ├── PurchaseEchoRequest.php
│   │   │   │   └── DonateEchoRequest.php
│   │   │   └── Auth/
│   │   └── Resources/                 # API Resources
│   ├── Models/
│   │   ├── User.php
│   │   ├── Profile.php
│   │   ├── Sound.php
│   │   ├── SoundFile.php
│   │   ├── SoundLocation.php
│   │   ├── Category.php
│   │   ├── Tag.php
│   │   ├── Like.php
│   │   ├── Favorite.php
│   │   ├── Comment.php
│   │   ├── Follow.php
│   │   ├── Report.php
│   │   ├── EchoWallet.php
│   │   ├── EchoTransaction.php
│   │   ├── EchoDonation.php
│   │   ├── EchoPurchase.php
│   │   └── AuditLog.php
│   ├── Services/                      # Logique métier
│   │   ├── Sound/
│   │   │   ├── SoundUploadService.php
│   │   │   ├── SoundLocationService.php
│   │   │   └── SoundDeleteService.php
│   │   ├── Echo/
│   │   │   ├── EchoWalletService.php
│   │   │   ├── EchoTransactionService.php
│   │   │   └── EchoDonationService.php
│   │   ├── Storage/
│   │   │   └── ContaboStorageService.php
│   │   ├── Payment/
│   │   │   └── StripeService.php
│   │   └── Notification/
│   │       └── UserNotificationService.php
│   ├── Policies/                      # Autorisations
│   │   ├── SoundPolicy.php
│   │   ├── UserPolicy.php
│   │   └── CommentPolicy.php
│   ├── Actions/                       # Actions Fortify (si custom)
│   ├── Events/
│   ├── Listeners/
│   ├── Jobs/                          # Queues
│   │   ├── ProcessAudioUpload.php
│   │   └── GenerateWaveform.php
│   └── Providers/
├── bootstrap/
├── config/
├── database/
│   ├── migrations/                    # Voir section 7
│   └── seeders/
│       ├── CategorySeeder.php
│       └── TagSeeder.php
├── resources/
│   ├── js/
│   │   ├── Pages/                     # Pages Inertia = routes
│   │   │   ├── Landing.vue
│   │   │   ├── Map.vue
│   │   │   ├── Sounds/
│   │   │   │   ├── Index.vue
│   │   │   │   ├── Show.vue
│   │   │   │   ├── Create.vue
│   │   │   │   └── Edit.vue
│   │   │   ├── Creators/
│   │   │   │   └── Show.vue
│   │   │   ├── Echo/
│   │   │   │   ├── Index.vue
│   │   │   │   └── Wallet.vue
│   │   │   ├── Dashboard/
│   │   │   │   ├── Index.vue
│   │   │   │   ├── Sounds.vue
│   │   │   │   ├── Echo.vue
│   │   │   │   └── Settings.vue
│   │   │   └── Auth/                  # Login, Register...
│   │   ├── Components/
│   │   │   ├── UI/                    # Boutons, cartes, modales
│   │   │   ├── Map/                   # Leaflet wrappers
│   │   │   ├── Audio/                 # Player, waveform
│   │   │   ├── Layout/                # Navbar, sidebar, footer
│   │   │   └── Dashboard/             # Composants dashboard
│   │   ├── Composables/               # VueUse + customs
│   │   │   ├── useMap.ts
│   │   │   ├── useAudioPlayer.ts
│   │   │   └── useEcho.ts
│   │   ├── Stores/                    # Pinia (si état complexe)
│   │   │   └── player.ts              # Mini-player global
│   │   ├── Types/                     # Types TypeScript
│   │   └── app.ts                     # Entry point Inertia
│   ├── css/
│   │   └── app.css                    # Tailwind directives + custom
│   └── views/
│       └── app.blade.php              # Layout racine Inertia
├── routes/
│   ├── web.php                        # Routes web principales
│   ├── api.php                        # API carte + données
│   └── admin.php                      # Routes Filament (auto)
├── storage/
├── tests/
│   ├── Feature/                       # Tests fonctionnels
│   └── Unit/                          # Tests unitaires services
├── composer.json
├── package.json
├── tailwind.config.js
├── vite.config.js
└── .env.example
```

---

## 5. Modèles Eloquent principaux

### User
Représente un compte utilisateur. Gère l'authentification et le rôle.

### Profile
Profil public enrichi (one-to-one avec User). Séparation compte/profil pour RGPD et flexibilité.

### Sound
Fiche sonore publiée. Contient les métadonnées, statut, visibilité.

### SoundFile
Fichier audio associé (one-to-one avec Sound). Séparation pour gérer versions/formats futurs.

### SoundLocation
Localisation d'un son (one-to-one avec Sound). Coordonnées exactes séparées des coordonnées publiques.

### Category / Tag
Taxonomie des sons. Many-to-many entre Sound et Tag.

### Like / Favorite / Comment / Follow
Interactions sociales. Polymorphes si nécessaire pour extensibilité.

### EchoWallet
Portefeuille interne. Solde en decimal(10,2). Jamais modifié directement.

### EchoTransaction
Journal immuable de tous les mouvements. Type : credit, debit, purchase, donation, fee, community_fund.

### EchoDonation
Don spécifique d'un utilisateur à un son ou créateur. Lieur transactionnel.

### EchoPurchase
Achat de pack ECHO via Stripe. Lie paiement Stripe et crédit wallet.

### Report
Signalement de contenu. Statuts : pending, reviewed, resolved, dismissed.

### AuditLog
Log d'audit administrateur. Action, acteur, cible, changements (JSONB).

---

## 6. Relations principales

```
User
├── hasOne → Profile
├── hasMany → Sound
├── hasMany → Like
├── hasMany → Favorite
├── hasMany → Comment
├── hasMany → Follow (followers)
├── hasMany → Follow (following)
├── hasOne → EchoWallet
├── hasMany → EchoTransaction (as source)
├── hasMany → EchoTransaction (as target, pour créateurs)
├── hasMany → Report (as reporter)
└── hasMany → Report (as reported)

Sound
├── belongsTo → User (creator)
├── hasOne → SoundFile
├── hasOne → SoundLocation
├── belongsTo → Category
├── belongsToMany → Tag
├── hasMany → Like
├── hasMany → Favorite
├── hasMany → Comment
└── hasMany → EchoDonation

EchoWallet
├── belongsTo → User
└── hasMany → EchoTransaction

EchoTransaction
├── belongsTo → EchoWallet (source)
├── belongsTo → EchoWallet (target, nullable)
├── morphTo → transactionnable (EchoPurchase, EchoDonation)
└── belongsTo → User (actor)
```

---

## 7. Tables MVP prioritaires

### Phase 1 — Socle (semaine 1)

| Table | Rôle | Clés/Contraintes |
|-------|------|------------------|
| **users** | Comptes | id, name, email, password, role(enum), email_verified_at, timestamps |
| **profiles** | Profils publics | user_id (FK, unique), avatar, bio, location, website, social_links(JSON), is_creator(bool), timestamps |
| **password_reset_tokens** | Laravel default | — |
| **failed_jobs** | Queues | — |
| **jobs** | Queues | — |
| **cache** / **sessions** | Cache/Session | — |

### Phase 2 — Sons (semaine 2)

| Table | Rôle | Clés/Contraintes |
|-------|------|------------------|
| **categories** | Taxonomie | id, name, slug, description, color, icon, order, timestamps |
| **tags** | Tags libres | id, name, slug, timestamps |
| **sounds** | Fiches sons | id, user_id(FK), category_id(FK), title, slug, description, recorded_at, duration, environment, equipment, license(enum), visibility(enum), status(enum), cover_image, play_count, timestamps, softDeletes |
| **sound_files** | Fichiers audio | id, sound_id(FK, unique), original_name, stored_name, path, mime_type, size_bytes, disk, timestamps |
| **sound_locations** | Localisations | id, sound_id(FK, unique), exact_latitude, exact_longitude, public_latitude, public_longitude, location_name, is_sensitive(bool), timestamps |
| **sound_tag** | Pivot | sound_id, tag_id |

### Phase 3 — Social (semaine 3)

| Table | Rôle | Clés/Contraintes |
|-------|------|------------------|
| **likes** | J'aime | id, user_id(FK), sound_id(FK), timestamps, unique(user_id, sound_id) |
| **favorites** | Favoris | id, user_id(FK), sound_id(FK), timestamps, unique(user_id, sound_id) |
| **comments** | Commentaires | id, user_id(FK), sound_id(FK), body, status(enum), timestamps, softDeletes |
| **follows** | Abonnements | id, follower_id(FK→users), following_id(FK→users), timestamps, unique(follower_id, following_id) |

### Phase 4 — ECHO + Stripe (semaine 4)

| Table | Rôle | Clés/Contraintes |
|-------|------|------------------|
| **echo_wallets** | Portefeuilles | id, user_id(FK, unique), balance(decimal 10,2), currency(default 'ECHO'), timestamps |
| **echo_purchases** | Achats ECHO | id, user_id(FK), stripe_payment_intent_id, stripe_checkout_session_id, amount_echos, amount_cents, currency, status(enum), paid_at, timestamps |
| **echo_transactions** | Journal | id, wallet_id(FK), target_wallet_id(FK, nullable), type(enum), amount(decimal 10,2), balance_after(decimal 10,2), description, reference_type, reference_id, metadata(JSON), created_at |
| **echo_donations** | Dons | id, donor_id(FK→users), recipient_id(FK→users, nullable), sound_id(FK, nullable), amount(decimal 10,2), message, timestamps |
| **audit_logs** | Audit | id, user_id(FK, nullable), action, entity_type, entity_id, old_values(JSON), new_values(JSON), ip_address, user_agent, created_at |

### Phase 5 — Admin + Modération (semaine 5)

| Table | Rôle | Clés/Contraintes |
|-------|------|------------------|
| **reports** | Signalements | id, reporter_id(FK), reported_user_id(FK, nullable), sound_id(FK, nullable), comment_id(FK, nullable), reason(enum), description, status(enum), resolved_by(FK→users), resolved_at, timestamps |

**Note** : Les tables `badges`, `user_badges`, `creator_payouts`, `notifications` (DB) sont **futures V2**.

---

## 8. Routes MVP prioritaires

### Routes publiques (web.php)
```php
GET     /                           → LandingController@index
GET     /map                        → MapController@index
GET     /sounds                     → SoundController@index
GET     /sounds/{sound:slug}        → SoundController@show
GET     /creators/{user:slug}       → CreatorController@show
```

### Routes auth (Fortify/Breeze)
```php
GET|POST  /login                    → Auth\AuthenticatedSessionController
GET|POST  /register                 → Auth\RegisteredUserController
POST      /logout                   → Auth\AuthenticatedSessionController@destroy
GET|POST  /forgot-password          → Auth\PasswordResetLinkController
GET|POST  /reset-password           → Auth\NewPasswordController
```

### Routes authentifiées (web.php — middleware auth + verified)
```php
// Dashboard utilisateur
GET     /dashboard                  → DashboardController@index
GET     /dashboard/sounds           → Dashboard\MySoundsController@index
GET     /dashboard/sounds/create    → Dashboard\MySoundsController@create
POST    /dashboard/sounds           → Dashboard\MySoundsController@store
GET     /dashboard/sounds/{sound}/edit → Dashboard\MySoundsController@edit
PATCH   /dashboard/sounds/{sound}   → Dashboard\MySoundsController@update
DELETE  /dashboard/sounds/{sound}   → Dashboard\MySoundsController@destroy
GET     /dashboard/favorites        → Dashboard\FavoritesController@index
GET     /dashboard/echo             → Dashboard\EchoController@index
GET     /dashboard/settings         → Dashboard\SettingsController@index
PATCH   /dashboard/settings         → Dashboard\SettingsController@update
DELETE  /dashboard/account          → Dashboard\SettingsController@destroy

// Interactions
POST    /sounds/{sound}/like        → InteractionController@like
POST    /sounds/{sound}/favorite    → InteractionController@favorite
POST    /sounds/{sound}/comment     → InteractionController@comment
POST    /sounds/{sound}/report      → InteractionController@report
POST    /users/{user}/follow        → InteractionController@follow

// ECHO
GET     /echo                       → EchoController@index
GET     /echo/wallet                → EchoController@wallet
POST    /echo/buy                   → EchoController@buy        // Redirect Stripe
POST    /echo/donate/sound/{sound}  → EchoController@donateSound
POST    /echo/donate/user/{user}    → EchoController@donateUser
GET     /echo/transactions          → EchoController@transactions

// Stripe
POST    /stripe/webhook             → StripeWebhookController@handle
```

### Routes API (api.php — middleware api, throttle)
```php
GET     /api/map/sounds             → Api\MapController@sounds        // GeoJSON
GET     /api/map/clusters           → Api\MapController@clusters      // Clustering côté serveur
GET     /api/sounds                 → Api\SoundController@index       // Filtres, pagination
GET     /api/tags                   → Api\TagController@index         // Autocomplete
GET     /api/categories             → Api\CategoryController@index    // Liste publique
```

---

## 9. Plan MVP étape par étape

### Phase 1 — Socle Laravel (5-7 jours)
- [ ] Installation Laravel 12 avec Breeze (Inertia + Vue)
- [ ] Configuration PostgreSQL + Redis
- [ ] Configuration Tailwind + thème Arborisis (colors, fonts, dark mode)
- [ ] Modèles User + Profile + migrations
- [ ] Système de rôles (enum : visitor, user, creator, moderator, admin)
- [ ] Landing page statique (design system, hero, footer)
- [ ] Layout responsive (navbar, dark mode toggle)
- [ ] Dashboard utilisateur vide (sidebar, structure)

### Phase 2 — Sons et stockage (5-7 jours)
- [ ] Modèles : Category, Tag, Sound, SoundFile, SoundLocation
- [ ] Migrations + seeders (catégories nature : forêt, rivière, montagne, océan, etc.)
- [ ] Configuration Contabo S3 (filesystems.php, .env)
- [ ] Formulaire upload audio (validation MIME, taille, sécurité)
- [ ] Service SoundUploadService (transaction DB + S3)
- [ ] Page détail son (métadonnées, lecteur basique HTML5)
- [ ] Liste des sons (filtres par catégorie)
- [ ] Confidentialité géographique (arrondi coordonnées publiques)

### Phase 3 — Carte interactive (5-7 jours)
- [ ] Installation Leaflet + Vue wrapper
- [ ] API /api/map/sounds (GeoJSON avec coordonnées publiques)
- [ ] Affichage des points sur la carte
- [ ] Clustering (Leaflet.markercluster)
- [ ] Popup fiche son sur la carte
- [ ] Filtres carte (catégorie, tag, durée)
- [ ] Recherche par lieu (géocodage Nominatim/OpenStreetMap)
- [ ] Intégration carte dans la landing page (aperçu)

### Phase 4 — Social (4-5 jours)
- [ ] Système Like (toggle, compteur)
- [ ] Système Favoris (sauvegarde persistante)
- [ ] Commentaires (CRD simple, pas d'édition V1)
- [ ] Follow créateurs (toggle, compteurs)
- [ ] Page profil créateur (sons, stats, bio)
- [ ] Notifications simples (in-app, DB)
- [ ] Signalements (formulaire simple, DB)

### Phase 5 — ECHO + Stripe (5-7 jours)
- [ ] Modèles : EchoWallet, EchoPurchase, EchoTransaction, EchoDonation, AuditLog
- [ ] Service EchoWalletService (création wallet à l'inscription)
- [ ] Service EchoTransactionService (atomicité, validation)
- [ ] Intégration Stripe Checkout (packs 5/10/25/50/100 ECHO)
- [ ] Webhooks Stripe (signature vérifiée, idempotence)
- [ ] Page ECHO (achat, solde, disclaimers légaux)
- [ ] Don ECHO à un son ou créateur (modal, confirmation)
- [ ] Historique transactions (dashboard)
- [ ] Sécurité : double paiement, race conditions, validation montants

### Phase 6 — Admin + Modération (3-4 jours)
- [ ] Installation Filament 3
- [ ] Ressources : Users, Sounds, Comments, Reports
- [ ] Widgets stats (sons, utilisateurs, transactions)
- [ ] Actions modération (masquer son, suspendre commentaire)
- [ ] Gestion des signalements (workflow review)
- [ ] Logs d'audit visibles (Filament table)

### Phase 7 — Premium + Polish (3-5 jours)
- [ ] Lecteur audio premium (Wavesurfer.js)
- [ ] Waveform génération (job queue)
- [ ] Mini-player global persistant (Pinia store)
- [ ] Badges créateurs (statiques V1)
- [ ] Page transparence ECHO (stats publiques)
- [ ] Optimisations SEO (meta, OpenGraph)
- [ ] Tests fonctionnels critiques (upload, paiement, don)

---

## 10. Commandes d'installation

```bash
# 1. Créer le projet Laravel avec Breeze (Inertia + Vue)
composer create-project laravel/laravel <redacted>
cd <redacted>

# 2. Installer Breeze avec Inertia Vue
composer require laravel/breeze --dev
php artisan breeze:install inertia

# 3. Installer dépendances frontend
npm install

# 4. Packages frontend supplémentaires
npm install leaflet vue-leaflet wavesurfer.js pinia @vueuse/core
npm install -D @types/leaflet

# 5. Installer Filament
composer require filament/filament:"^3.0"
php artisan filament:install --panels

# 6. Installer Cashier Stripe
composer require laravel/cashier

# 7. Configurer PostgreSQL dans .env
# DB_CONNECTION=pgsql
# DB_HOST=127.0.0.1
# DB_PORT=5432
# DB_DATABASE=<redacted>
# DB_USERNAME=<redacted>
# DB_PASSWORD=secret

# 8. Configurer Redis dans .env
# CACHE_DRIVER=redis
# SESSION_DRIVER=redis
# QUEUE_CONNECTION=redis
# REDIS_HOST=127.0.0.1

# 9. Configurer Contabo S3 dans .env
# AWS_ACCESS_KEY_ID=xxx
# AWS_SECRET_ACCESS_KEY=xxx
# AWS_DEFAULT_REGION=eu2
# AWS_BUCKET=<redacted>-audio
# AWS_ENDPOINT=https://eu2.contabostorage.com
# AWS_USE_PATH_STYLE_ENDPOINT=true
# AWS_URL=https://eu2.contabostorage.com/<redacted>-audio

# 10. Lancer les migrations
php artisan migrate

# 11. Compiler les assets
npm run dev        # dev
npm run build      # production

# 12. Lancer le serveur
php artisan serve
```

---

## 11. Première tâche à faire maintenant

**Tâche immédiate : Initialiser le projet Laravel avec Breeze Inertia/Vue et configurer le design system Arborisis.**

Actions concrètes :
1. Créer le projet Laravel 12
2. Installer Breeze avec le stack Inertia + Vue
3. Configurer Tailwind avec la palette couleur Arborisis (bleu nuit, vert mousse, émeraude)
4. Créer le layout principal (navbar dark, footer, container responsive)
5. Implémenter la Landing Page statique (hero, mission, aperçu)
6. Créer les modèles User + Profile avec migrations
7. Mettre en place le système de rôles (enum)

**Estimation : 1-2 jours de développement.**

---

## Annexes

### Palette couleur Arborisis (Tailwind)
```js
// tailwind.config.js
colors: {
  arbor: {
    night:    '#0B1220',  // fond principal
    deep:     '#111827',  // surfaces
    moss:     '#4A6741',  // accent principal
    emerald:  '#34D399',  // accent lumineux
    sage:     '#8FA68E',  // texte secondaire
    cream:    '#F3F0E7',  // texte principal
    glass:    'rgba(255,255,255,0.05)', // glassmorphism
  }
}
```

### Enums clés (PHP 8.1+)
```php
enum UserRole: string {
    case Visitor = 'visitor';
    case User = 'user';
    case Creator = 'creator';
    case Moderator = 'moderator';
    case Admin = 'admin';
}

enum SoundStatus: string {
    case Draft = 'draft';
    case Pending = 'pending';
    case Published = 'published';
    case Hidden = 'hidden';
}

enum SoundVisibility: string {
    case Public = 'public';
    case Followers = 'followers';
    case Private = 'private';
}

enum EchoTransactionType: string {
    case Purchase = 'purchase';
    case DonationSent = 'donation_sent';
    case DonationReceived = 'donation_received';
    case PlatformFee = 'platform_fee';
    case CommunityFund = 'community_fund';
}
```

### Risques identifiés
| Risque | Niveau | Mitigation |
|--------|--------|------------|
| Coût stockage S3 audio | Moyen | Limite upload utilisateur, compression future, archivage |
| Fraude ECHO / double paiement | **Élevé** | Transactions DB atomiques, idempotence Stripe, validation webhook |
| Exposition coordonnées GPS | **Élevé** | Arrondi côté serveur, champ `is_sensitive`, jamais de coordonnées exactes en API publique |
| Spam contenu | Moyen | Rate limiting, modération Filament, CAPTCHA upload |
| Conformité légale ECHO | **Élevé** | Disclaimers clairs, pas de promesse rendement, validation juridique externe avant prod |
| Performance carte (milliers de points) | Moyen | Clustering côté serveur + client, pagination géographique |
