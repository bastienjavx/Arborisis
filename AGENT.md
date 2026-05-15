# AGENT.md — Guide complet pour agents IA et contributeurs

> **Projet** : Arborisis  
> **Date du guide** : 2026-05-15  
> **Version cible** : Laravel 12 + Vue 3 + Inertia.js  
> **Lis ce fichier en entier avant toute modification.**

---

## 1. Vision du projet

**Arborisis** est une plateforme sociale premium de *field recording* dédiée aux sons de la nature. Sa mission est de créer un espace numérique calme, immersif et respectueux où les enregistreurs du monde entier publient, partagent et découvrent des paysages sonores naturels géolocalisés.

**Ambiance produit** : *"Silence is not empty. It is full of answers."* — interface sombre, chaleureuse, contemplative. Métaphore visuelle : un studio d'enregistrement vintage caché dans une cabane couverte de mousse. Pas de dark patterns, pas de FOMO, pas de notifications agressives.

**Public cible** : field recorders, sound designers, naturalistes, amateurs de nature, créateurs de contenu audio immersif.

**Fonctionnalités principales** :
- Publication de sons géolocalisés avec métadonnées riches
- Carte interactive mondiale (Leaflet) avec clustering
- Lecteur audio premium avec waveform (Wavesurfer.js)
- Interactions sociales : like, commentaire, follow, favoris
- Système de crédits internes **ECHO** pour soutenir les créateurs
- Gamification : points Arborisis, check-in géolocalisé, quêtes, achievements, médailles, XP/niveaux
- Présence temps réel approximative sur la carte
- Radio web immersive avec animateur IA, playlists et podcasts
- Analyse audio automatique (spectrogramme, détection d'espèces BirdNET, features)
- Blog IA généré automatiquement
- Chat communautaire (salons publics + messages privés)
- Bot Discord intégré
- PWA avec offline support et push notifications

---

## 2. Résumé technique du projet

### Stack confirmé (extrait du code)

| Couche | Technologie | Détail |
|--------|-------------|--------|
| **Backend** | Laravel 12.x | PHP 8.3+ strict (`declare(strict_types=1)`) |
| **Frontend** | Vue 3.4+ | Composition API, Inertia.js 2.x |
| **Styles** | Tailwind CSS 3.x | Palette personnalisée `arbor-*` |
| **State** | Pinia 3.x | Store player global, PWA, consent |
| **Base de données** | SQLite (dev) / PostgreSQL (prod recommandé) | Redis pour cache/sessions/queues |
| **Auth** | Laravel Breeze (Inertia/Vue) + Fortify | Email vérifié, rôles enum |
| **Admin** | Filament 3.x | Panel `/admin`, restriction modérateur+ |
| **Carte** | Leaflet 1.9 + vue-leaflet + markercluster | Thème sombre custom |
| **Audio player** | Wavesurfer.js 7.x | Waveform + mini-player persistant |
| **Visualisations** | Three.js 0.184 + Plotly.js | Particules, scènes 3D, spectrogramme |
| **Stockage** | Cloudflare R2 (principal) + local | Legacy Contabo S3 via driver AWS |
| **Paiements** | Stripe PHP SDK 20.x | Checkout Sessions + webhooks |
| **Real-time** | Laravel Reverb + Echo + Pusher-js | Présence, chat, notifications |
| **Push** | web-push (Minishlink) + VAPID | Service Worker personnalisé |
| **Queues** | Database/Redis | Jobs audio, radio, blog, gamification |
| **Tests** | Pest PHP 4.7 | Feature + Unit |
| **Lint** | Laravel Pint | PSR-12 approximatif |
| **Build** | Vite 8 + Laravel Vite Plugin | SSR + PWA (vite-plugin-pwa) |

### Stack satellite confirmé

| Sous-système | Technologie | Localisation |
|--------------|-------------|--------------|
| **Discord Bot** | Node.js 20+, discord.js 14, Express | `arborisis/discord-bot/` |
| **Audio Analyzer** | Python 3.10, FastAPI, librosa, BirdNET, FFmpeg | `services/audio-analyzer/` |
| **Radio streaming** | Icecast + Liquidsoap (externe) | VPS séparé possible |
| **Orchestration analyse** | Cloudflare Worker + Queue | `workers/audio-analysis-orchestrator/` |
| **R2 Proxy** | Cloudflare Worker | `workers/r2-proxy/` |

---

## 3. Architecture générale

### Structure du repository

```
arborisis/                          ← Racine Git
├── AGENT.md                        ← Ce fichier
├── AGENTS.md                       ← Règles rapides (ne pas supprimer)
├── ARCHITECTURE.md                 ← Architecture initiale (référence)
├── TASKS.md                        ← Suivi MVP (legacy, à vérifier)
├── TASKS_GAMIFICATION.md           ← Suivi gamification (legacy)
├── docs/                           ← Documentation ops
│   ├── audio-analysis-pipeline.md
│   ├── deploiement-gitlab-vps.md
│   ├── migration-r2.md
│   └── audit-ux-frontend.md
├── .gitlab-ci.yml                  ← CI/CD GitLab
├── .gitlab/deploy/                 ← Scripts déploiement VPS
├── infrastructure/                 ← Infra as code
│   ├── audio-analyzer-worker/
│   ├── radio/
│   └── uptime-kuma/
├── services/
│   └── audio-analyzer/             ← Service Python FastAPI
├── workers/
│   ├── audio-analysis-orchestrator/
│   └── r2-proxy/
└── arborisis/                      ← Application Laravel (dossier principal)
    ├── app/
    │   ├── Console/Commands/       ← Commandes artisan (sitemap, radio, etc.)
    │   ├── Enums/                  ← 30+ enums PHP
    │   ├── Events/                 ← Events métier + gamification
    │   ├── Filament/               ← Ressources admin
    │   ├── Http/Controllers/       ← Web + API
    │   ├── Http/Middleware/        ← Inertia, auth interne, modérateur
    │   ├── Http/Requests/          ← Form Requests (validation)
    │   ├── Jobs/                   ← Queue jobs
    │   ├── Listeners/              ← 20+ listeners gamification/social
    │   ├── Models/                 ← 45+ modèles Eloquent
    │   ├── Notifications/          ← Email personnalisés
    │   ├── Observers/              ← SoundFile, User
    │   ├── Policies/               ← 10 policies
    │   ├── Providers/              ← AppServiceProvider, Filament AdminPanel
    │   └── Services/               ← 60+ services métier
    ├── bootstrap/
    ├── config/
    ├── database/
    │   ├── factories/
    │   ├── migrations/             ← 80+ migrations
    │   └── seeders/
    ├── discord-bot/                ← Bot Node.js (Express + discord.js)
    ├── docs/
    ├── public/
    ├── python/                     ← Scripts Python inline (venv)
    ├── resources/
    │   ├── css/app.css
    │   ├── js/
    │   │   ├── app.js              ← Entry Inertia + PWA + MCP tools
    │   │   ├── bootstrap.js
    │   │   ├── echo.js             ← Laravel Echo / Reverb
    │   │   ├── pwa.js              ← Service Worker + store PWA
    │   │   ├── ssr.js
    │   │   ├── sw.js               ← Service Worker généré
    │   │   ├── Components/         ← 70+ composants Vue
    │   │   ├── Composables/        ← 10+ composables
    │   │   ├── Layouts/            ← Authenticated, Guest
    │   │   ├── Pages/              ← 35+ pages Inertia
    │   │   └── Stores/             ← Pinia (player, consent, pwa)
    │   └── views/app.blade.php     ← Layout racine
    ├── routes/
    │   ├── web.php
    │   ├── api.php
    │   └── auth.php
    ├── storage/
    ├── tests/                      ← Pest PHP (Feature + Unit)
    ├── composer.json
    ├── package.json
    ├── tailwind.config.js
    ├── vite.config.js
    └── phpunit.xml
```

### Carte mentale textuelle

```
[Browser]
  ├─ Vue 3 SPA (Inertia) ─────────┐
  ├─ Leaflet Map (sounds/points)  │
  ├─ Wavesurfer Player            │──→ XHR Inertia ──→ [Laravel Backend]
  ├─ Three.js (particles/3D)      │
  └─ PWA (SW, offline, push)      │

[Laravel Backend]
  ├─ HTTP Layer (Routes → Middleware → Controllers → FormRequests → Policies)
  ├─ Service Layer (Sound, Echo, Gamification, Radio, AudioAnalysis, etc.)
  ├─ Models Eloquent (45+ tables, relations, soft deletes)
  ├─ Events/Listeners (découplage métier)
  ├─ Jobs/Queues (async : audio, radio, blog, gamification)
  ├─ Filament Admin (/admin)
  └─ Internal APIs (Discord bot, Audio analyzer, Radio)

[Data & Storage]
  ├─ PostgreSQL/SQLite (données métier)
  ├─ Redis (cache, sessions, queues, rate limiting, presence)
  ├─ Cloudflare R2 (audio, covers, analyses, previews)
  └─ Local disk (dev, radio cache)

[External]
  ├─ Stripe (paiements ECHO)
  ├─ Cloudflare Workers (orchestration analyse, R2 proxy)
  ├─ VPS Workers Python (analyse audio FastAPI)
  ├─ Icecast/Liquidsoap (streaming radio)
  └─ Discord API (bot + OAuth)
```

---

## 4. Fonctionnalités principales

### Déjà implémentées (confirmé par le code)

| Domaine | Fonctionnalité |
|---------|----------------|
| **Auth** | Inscription, connexion, email verification, reset password, rôles (user/creator/moderator/admin) |
| **Profils** | Edition profil, avatar, suppression de compte (soft delete), connexion Discord |
| **Sons** | Upload audio (MP3/WAV/FLAC/M4A, max 500Mo), métadonnées (titre, description, date, équipement, licence), cover image, catégories, tags, environnements |
| **Géoloc** | Coordonnées exactes + publiques floutées, flag `is_sensitive` |
| **Carte** | Affichage GeoJSON sons + points Arborisis, clustering, recherche, filtres catégorie/environnement |
| **Social** | Like, commentaire (avec soft delete), follow/unfollow, liste followers/following/friends, signalement |
| **Player** | Lecteur Wavesurfer, mini-player global persistant (Pinia), persistance localStorage, mode radio |
| **ECHO** | Wallet, achat via Stripe Checkout (packs), dons à un son ou créateur, historique transactions, page transparence |
| **Gamification** | Points Arborisis (CRUD, modération pending/approved/rejected), check-in géolocalisé (anti-cheat), quêtes (daily/weekly), achievements, médailles, XP/niveaux, streaks |
| **Présence** | Mise à jour position approximative, affichage carte, expiration auto, modes de visibilité |
| **Radio** | Streaming Icecast, channels, programme grid, now-playing, podcasts IA, DJ IA (ElevenLabs), listener sessions, interactions (like/react/share) |
| **Chat** | Salons publics (CRUD, join/leave, ban), messages privés, modération salon |
| **Blog** | Articles IA générés quotidiennement, index/show public |
| **Audio Analysis** | Pipeline asynchrone (R2 → Queue → Worker Python → Callback Laravel), BirdNET, spectrogramme, waveform, features, qualité |
| **Discord** | Bot Node.js avec commandes, notifications sons, lien compte, radio voice channel |
| **Newsletter** | Inscription/désinscription, campagnes admin |
| **Contact** | Formulaire contact avec tickets et réponses admin |
| **PWA** | Service Worker, offline banner, install prompt, update prompt, file d'attente offline |
| **Push** | Web Push VAPID, abonnement/désabonnement |
| **Stats** | Dashboard scientifique public (catégories, environnements, heatmap géo, features audio) |
| **Admin** | Filament avec ressources Users, Sounds, Categories, Wallets, Transactions, Reports, Points, Quêtes, Achievements, Médailles, etc. |
| **Agent Discovery** | `.well-known` endpoints, OpenAPI, MCP server-card, skills index |

### Partiellement implémentées / En évolution

- **Radio émissions complètes IA** (`RADIO_HOST_EMISSION_ENABLED=false` en env) — structure présente, feature flaggée
- **Podcasts radio** — génération présente, publication conditionnée
- **Daily Sound Ideas** — généré mais non visible dans toutes les pages
- **Group Recording Events** — API présente, usage limité
- **Nearby Interactions** — API présente, usage limité

### Prévu / À confirmer

- API publique documentée (OpenAPI est généré mais pas stabilisé)
- Application mobile native
- Export données utilisateur RGPD automatisé
- Modération automatique IA des signalements

---

## 5. Modèle de domaine

### Entités clés et règles

#### User
- **Rôle** : Compte central. Auth + rôle enum + gamification fields (`xp_total`, `level`, `current_streak`, `longest_streak`, `geo_consent_given_at`)
- **Relations** : `profile` (1-1), `sounds`, `likes`, `comments`, `following`/`followers` (N-N via `follows`), `wallet`, `echoTransactions`, `discordAccount`, `arborisisPoints`, `arborisisVisits`, `questProgress`, `achievements`, `medals`, `xpEvents`, `chatRooms`, `chatConversations`
- **Règles** : Soft delete. Slug auto-généré. Email verification obligatoire pour actions sensibles. Peut accéder à Filament si `isModerator()`.

#### Profile
- **Rôle** : Profil public enrichi séparé du compte (RGPD)
- **Relations** : `user` (1-1 inverse)
- **Risque** : Ne pas confondre `User::name` (display) et `Profile` (bio, avatar, social links)

#### Sound
- **Rôle** : Fiche sonore publiée
- **Relations** : `user`, `category`, `environment`, `tags` (N-N), `soundFile` (1-1), `soundLocation` (1-1), `soundAnalysis` (1-1), `likes`, `comments`, `reports` (morphs)
- **Règles** : `status` (draft/pending/published/hidden), `visibility` (public/followers/private). Seuls les `public()` sont visibles anonymement. Soft delete.
- **Risque** : `cover_url` et `audio_url` génèrent des URLs signées/temporaires — ne pas les cacher longtemps côté client.

#### SoundFile / SoundLocation
- **Rôle** : Séparation fichier et localisation pour évolutions futures
- **Règles** : `SoundLocation` masque `exact_latitude`/`exact_longitude` en JSON. `public_*` uniquement exposé. Floutage à 2 décimales si `is_sensitive=true`.
- **Risque critique** : Jamais exposer `exact_latitude`/`exact_longitude` dans une API publique.

#### ArborisisPoint
- **Rôle** : Point d'intérêt naturel créé par la communauté (gamification)
- **Relations** : `user`, `approvedBy`, `reports`, `suggestions`
- **Règles** : `moderation_status` (pending/approved/rejected). `latitude`/`longitude` exacts hidden. `approximate_*` pour API publique. Floutage selon `NatureSensitivityLevel`. Approuvé par modérateur avant visibilité publique.

#### ArborisisVisit
- **Rôle** : Check-in géolocalisé d'un utilisateur sur un point
- **Règles** : Distance max configurable (`gamification.check_in_radius`, défaut 100m). Cooldown Redis. Limite/jour. Détection vitesse impossible. Score anti-cheat stocké.

#### Wallet / EchoTransaction / EchoDonation
- **Rôle** : Système de crédits ECHO
- **Règles** : `Wallet` balance en `decimal:2`. `EchoTransaction` immuable (suppression interdite par boot model). Types : purchase, donation_sent, donation_received, platform_fee, community_fund. Stripe Checkout pour l'achat.
- **Répartition** : 70% créateur, 20% infra, 10% fonds communautaire (documentaire, pas automatiquement appliquée dans toutes les transactions — vérifier le `DonationService`)

#### Quest / QuestProgress / Achievement / UserAchievement / Medal / UserMedal / XpEvent
- **Rôle** : Gamification
- **Règles** : Quêtes auto-démarrées quand `updateProgress` appelé. Objectifs typés enum. Achievements avec `progress_snapshot`. Médailles avec `source_type/source_id`. XP cumulé dans `users.xp_total`, niveau recalculé par job.

#### UserPresence
- **Rôle** : Position temps réel approximative sur la carte
- **Règles** : Expiration auto. Visibilité configurable. Jamais de coordonnées exactes.

#### SoundAnalysis / BirdnetDetection
- **Rôle** : Résultats analyse audio automatique
- **Relations** : `sound`, `birdnetDetections`
- **Règles** : Clés R2 stockées, pas les fichiers en base. Statut enum (pending/processing/completed/failed)

#### ChatRoom / ChatMessage / ChatConversation / ChatPrivateMessage
- **Rôle** : Chat communautaire
- **Règles** : `ChatRoom` a un créateur et des membres (pivot avec `banned_at`). Messages avec `parent_id` pour threads. Modération via `ChatModerationController`.

#### RadioPodcast / RadioSchedule / RadioChannel / RadioListenerSession / RadioJingle / RadioHostPersonality
- **Rôle** : Sous-système radio web
- **Règles** : Génération IA conditionnée par feature flags. Podcasts avec statuts (draft/pending/published). Listener sessions trackées avec heartbeat.

#### Report / PointReport / ContactTicket / NewsletterCampaign / BlogPost
- **Rôle** : Modération, support, marketing, contenu
- **Règles** : Reports polymorphes (`reportable`). Contact tickets avec réponses. Blog posts IA avec statuts.

---

## 6. Règles métier importantes

### Publication d'un son
1. Utilisateur authentifié + vérifié + rôle autorisé (`canUpload()`)
2. FormRequest `StoreSoundRequest` : MIME audio strict, max 500Mo, titre 3-255 car, coords valides, cover 10Mo max
3. `SoundUploadService` : transaction DB + S3/R2 atomique
4. Extraction durée audio via `AudioDurationService`
5. Stockage fichier avec nom UUID, séparation `sound_files`
6. Localisation : exactes en base, publiques floutées si `is_sensitive`
7. Tags créés automatiquement (firstOrCreate par slug)
8. Analyse audio déclenchée async (R2 pipeline ou legacy queue)
9. Event `SoundPublished` → listeners (Discord, push, quêtes, achievements)
10. Cleanup fichiers S3 en cas d'échec transaction

### Confidentialité GPS
- **Règle d'or** : `exact_latitude`/`exact_longitude` ne sortent JAMAIS en JSON/API publique
- `SoundLocation` et `ArborisisPoint` ont les champs exacts dans `$hidden`
- API carte utilise uniquement `public_latitude` / `public_longitude`
- Floutage automatique : `round(..., 2)` si sensible
- `ArborisisPoint` : `publicCoordinates()` selon `NatureSensitivityLevel`
- Consentement `geo_consent_given_at` stocké et révocable
- Positions historiques visites : pas de conservation long terme des exactes

### Propriété intellectuelle
- Enum `LicenseType` sur chaque son (ex: CC-BY, CC0, All Rights Reserved)
- L'utilisateur conserve la propriété de son enregistrement
- Arborisis a une licence d'hébergement et de diffusion

### Modération
- Points Arborisis : `pending` → `approved` par modérateur obligatoirement
- Sons : peuvent être `hidden` par admin
- Commentaires : soft delete par auteur ou modérateur
- Chat : ban par modérateur de salon
- Signalements (Reports) : workflow review via Filament

### Upload audio
- Formats : MP3, WAV, FLAC, M4A
- Max 500 Mo (512000 KB dans FormRequest)
- Validation MIME côté serveur (pas seulement extension)
- Stockage sur disque configuré (`audio_disk` env, R2 préféré)
- URLs temporaires/signées selon le disk

### Crédits ECHO
- **ECHO n'est PAS une cryptomonnaie, PAS un investissement**
- Transactions atomiques DB uniquement
- Journal immuable (pas de modif/suppression `EchoTransaction`)
- Achat via Stripe Checkout (webhook sécurisé avec signature)
- Dons directs entre utilisateurs ou vers un son

### Suppression de contenu
- Sons : soft delete cascade (vérifiez les observers)
- Users : soft delete, anonymisation si contenu public lié
- Compte : suppression = suppression données gamification (sauf si anonymisation requise)

---

## 7. Backend Laravel

### Routes importantes

**Web (`routes/web.php`)** :
- `GET /` — Landing
- `GET /sounds`, `/sounds/{slug}`, `/sounds/create`, `POST /sounds` — Sons
- `GET /map` — Carte sons
- `GET /arborisis-map` — Carte gamification (auth)
- `GET /creators`, `/creators/{slug}` — Profils créateurs
- `GET /radio`, `/radio/c/{channel}`, `/radio/stream`, `/radio/stream.m3u` — Radio
- `GET /blog/{slug}` — Blog
- `GET /dashboard` — Dashboard utilisateur
- `GET /wallet`, `POST /wallet/checkout` — ECHO
- `POST /donations` — Dons
- `POST /webhooks/stripe` — Webhook Stripe (sans CSRF)
- Routes chat sous `/chat/*`
- Routes auth Discord sous `/auth/discord/*`
- `.well-known/*` — Agent discovery, OpenAPI, MCP

**API (`routes/api.php`)** :
- `GET /api/map/sounds` — GeoJSON sons publics
- `GET /api/map/sounds/search` — Recherche carte
- `GET /api/health`, `/api/health/radio` — Healthchecks
- Gamification sous `/api/arborisis-points`, `/api/quests`, `/api/achievements`, `/api/medals`, `/api/me/*`, `/api/presence/*`, `/api/nearby/*`, `/api/group-events/*`
- Radio interne sous `/api/internal/radio/*` (token protégé)
- Discord interne sous `/api/internal/discord/*` (token + throttle)
- Audio analysis callback `POST /api/internal/audio-analysis/callback`
- Analyse publique `GET /api/sounds/{sound}/analysis` (Sanctum)

### Controllers clés

| Controller | Domaine |
|------------|---------|
| `Web\SoundController` | CRUD sons, listing |
| `Web\MapController` | Page carte |
| `Web\CreatorController` / `CreatorProfileController` | Profils créateurs |
| `Web\DashboardController` | Dashboard |
| `Web\WalletController` | ECHO checkout |
| `Web\EchoDonationController` | Dons |
| `Web\LikeController` / `CommentController` / `FollowController` / `ReportController` | Social |
| `Web\ChatRoomController` / `ChatMessageController` / `ChatPrivateMessageController` / `ChatModerationController` | Chat |
| `Web\RadioController` / `RadioManagerController` | Radio + admin radio |
| `Web\AudioAnalysisController` | Analyse audio |
| `Web\BlogController` | Blog |
| `Api\MapController` | GeoJSON API |
| `Api\Gamification\*Controller` | 10 controllers gamification |
| `Api\InternalAudioAnalysisController` | Callback analyse |
| `Api\InternalDiscordController` | API interne bot Discord |
| `Api\InternalRadioController` | API interne radio |
| `StripeWebhookController` | Webhooks Stripe |
| `AgentDiscoveryController` | Discovery well-known |

### Services clés

| Service | Responsabilité |
|---------|----------------|
| `Sound\SoundUploadService` | Upload transactionnel DB+S3 |
| `Echo\WalletService` | Crédit/débit wallet atomique |
| `Echo\DonationService` | Logique de don ECHO |
| `Echo\StripeCheckoutService` | Stripe Checkout Sessions |
| `Gamification\ArborisisPointService` | CRUD points + modération |
| `Gamification\GeoValidationService` | Distance Haversine, précision |
| `Gamification\AntiCheatService` | Cooldown, limite/jour, vitesse impossible |
| `Gamification\QuestService` | Progression quêtes auto-start |
| `Gamification\AchievementService` | Déblocage achievements |
| `Gamification\XpService` | Attribution XP, recalcule niveau |
| `Gamification\MedalService` | Attribution médailles |
| `Gamification\PresenceService` | Gestion présence temps réel |
| `AudioAnalysis\AudioAnalysisCallbackService` | Traitement retour analyse |
| `AudioAnalysis\AudioAnalysisOrchestrationService` | Retry, load balancing workers |
| `Radio\RadioStreamService` | Streaming Icecast |
| `Radio\RadioAudioProductionService` | Production audio IA |
| `Radio\RadioPodcastGenerationService` | Génération podcasts |
| `Storage\SignedUrlService` | URLs signées R2 |
| `Discord\DiscordNotificationService` | Notifications async Discord |
| `Push\PushNotificationService` | Web push |

### Jobs clés

| Job | Usage |
|-----|-------|
| `ProcessAudioAnalysis` | Analyse legacy directe |
| `RequestAudioAnalysis` | Dispatch vers worker Python |
| `GenerateDailyQuests` / `GenerateWeeklyQuests` | Génération quêtes IA |
| `RecalculateUserLevel` | Recalcule niveau utilisateur |
| `CleanExpiredPresence` | Nettoyage présence Redis/DB |
| `GenerateRadioContent` | Génération contenu radio |
| `GenerateDailyBlogPost` | Génération article blog IA |
| `GenerateDailySoundIdeas` | Idées d'enregistrement quotidiennes |
| `SendDiscordNotificationJob` | Queue notifications Discord |
| `ValidateSuspiciousVisits` | Validation async visites suspectes |

### Policies

- `SoundPolicy` : view/create/update/delete/like/unlike
- `ArborisisPointPolicy` : view/create/update/delete/report
- `CommentPolicy` : view/create/update/delete
- `LikePolicy` / `FollowPolicy` / `ReportPolicy` : CRUD sociaux
- `WalletPolicy` / `EchoTransactionPolicy` : accès financier
- `ChatRoomPolicy` / `ChatMessagePolicy` : création salon, modération
- `ContactTicketPolicy` : accès support
- `UserPolicy` : view/update/delete user

### Middlewares

- `HandleInertiaRequests` : Partage `auth.user` + Ziggy
- `EnsureIsModerator` : Accès Filament
- `AuthenticateInternalBot` / `VerifyInternalApiToken` / `VerifyRadioInternalToken` : APIs internes
- `EnsureCanAccessRadioManager` : Admin radio
- `AddAgentDiscoveryLinks` : Liens well-known dans les réponses

### Auth
- Laravel Breeze (Inertia/Vue) + Fortify
- Guard `web` par défaut, `sanctum` pour API mobile/analyse
- Rôles enum : `Visitor`, `User`, `Creator`, `Moderator`, `Admin`
- Permissions via Policies + Gates, pas de package spatie/permission
- Email verification obligatoire pour routes `verified`
- OAuth Discord via Socialite + provider Discord

---

## 8. Frontend Vue.js

### Structure des composants

**Layouts** : `AuthenticatedLayout.vue` (nav + sidebar), `GuestLayout.vue`

**Pages principales** (`resources/js/Pages/`) :
- `Landing.vue` — Page d'accueil immersive
- `Sounds/Index.vue`, `Sounds/Show.vue`, `Sounds/Create.vue`, `Sounds/Record.vue` — Sons
- `Map/Index.vue` — Carte sons
- `ArborisisMap/Index.vue` — Carte gamification
- `Creators/Index.vue` — Liste créateurs
- `Profile/Show.vue`, `Profile/Edit.vue` — Profil
- `Dashboard.vue` — Dashboard utilisateur
- `Wallet/Show.vue`, `Wallet/DonationHistory.vue`, `Wallet/Success.vue`, `Wallet/Cancel.vue` — ECHO
- `Radio/Index.vue`, `Radio/Shows.vue` — Radio
- `Chat/Index.vue`, `Chat/Room.vue`, `Chat/Conversation.vue` — Chat
- `Blog/Index.vue`, `Blog/Show.vue` — Blog
- `AudioAnalysis/Dashboard.vue`, `AudioAnalysis/Public.vue` — Analyse audio
- `ScientificStats/Index.vue` — Stats publiques
- `Auth/*.vue` — Login, register, forgot, reset, verify

**Composants clés** :
- `Audio/MiniPlayer.vue` — Player global persistant
- `Audio/WaveSurfer.vue` — Waveform interactive
- `Audio/AudioRecorder.vue` — Enregistrement navigateur
- `Map/SoundMap.vue` — Carte Leaflet
- `Gamification/*` — 15 composants gamification (point forms, visit, presence, etc.)
- `AudioAnalysis/*` — 7 composants analyse (spectrogramme, features, heatmap)
- `Radio/*` — 6 composants radio (visualizer, now-playing, channel switcher)
- `Chat/*` — 6 composants chat
- `Social/*` — LikeButton, FollowButton, CommentSection, ReportModal
- `Scientific/*` — 8 composants dataviz (charts, heatmap, tables)
- `Three/ParticleField.vue`, `Three/WaveformScene.vue` — Three.js

### Stores Pinia

- `player.js` — État lecteur audio global (persisté localStorage)
- `consent.js` — Consentements cookies/GDPR
- `pwa.js` — État PWA (install, update, offline)

### Composables

- `useAudioAnalysis.js` — Analyse audio côté client
- `useAudioRecorder.js` — Enregistrement microphone
- `useMapPresence.js` — Présence temps réel carte
- `useNearbyNotifications.js` — Notifications proximité
- `useNetworkStatus.js` — État réseau
- `useOfflineQueue.js` — File d'attente offline
- `usePushNotifications.js` — Web push
- `useRadioAudio.js` / `useRadioSession.js` — Radio
- `useWakeLock.js` — Empêche veille écran
- `useWebAudio.js` — API Web Audio

### Design system

- Tailwind config étendu avec palette `arbor-*`
- Polices : Cormorant (display), DM Sans (body), JetBrains Mono (mono/echo)
- Dark mode par défaut (`darkMode: 'class'`)
- Animations custom : fade-in, slide-up, wave, glow-pulse, reel-spin
- Z-index scale custom jusqu'à `z-map-max` (1000)

---

## 9. Base de données

### Tables principales (80+ migrations)

**Socle** : `users`, `profiles`, `password_reset_tokens`, `cache`, `sessions`, `jobs`, `failed_jobs`

**Sons** : `categories`, `environments`, `tags`, `sounds`, `sound_files`, `sound_locations`, `sound_tag`, `sound_listens`

**Social** : `likes`, `comments`, `follows`, `reports`

**ECHO** : `wallets`, `echo_transactions`, `echo_donations`

**Gamification** : `arborisis_points`, `arborisis_visits`, `point_reports`, `point_suggestions`, `quests`, `quest_progress`, `achievements`, `user_achievements`, `medals`, `user_medals`, `xp_events`, `user_presences`, `nearby_interactions`, `group_recording_events`, `group_recording_participants`

**Audio Analysis** : `sound_analyses`, `sound_visualizations`, `birdnet_detections`

**Radio** : `radio_settings`, `radio_channels`, `radio_schedules`, `radio_podcasts`, `radio_dj_announcements`, `radio_jingles`, `radio_host_personalities`, `radio_listener_sessions`, `radio_generation_jobs`, `radio_reactions`

**Chat** : `chat_rooms`, `chat_messages`, `chat_room_user`, `chat_conversations`, `chat_private_messages`, `chat_conversation_user`

**Autres** : `contact_tickets`, `contact_ticket_replies`, `newsletter_subscribers`, `newsletter_campaigns`, `push_subscriptions`, `blog_posts`, `daily_sound_ideas`, `user_sound_idea_progress`, `species_facts`, `discord_settings`, `user_discord_accounts`

### Conventions DB
- Soft deletes sur toutes les tables utilisateur/UGC
- Clés étrangères nommées et contraintes
- `decimal(10,2)` pour tous les montants
- JSONB pour métadonnées flexibles (quand PostgreSQL utilisé)
- Index sur colonnes filtrées fréquemment
- Enums PHP pour tous les statuts et rôles

---

## 10. Audio et médias

### Upload
- **Formats** : MP3, WAV, FLAC, M4A
- **Max** : 500 Mo (configurable via `AUDIO_MAX_FILE_SIZE_MB`)
- **Validation** : MIME types stricts côté serveur
- **Stockage** : R2 préféré (`sounds/original/{sound_id}/{filename}`), fallback local/S3
- **Cover** : JPG/JPEG/PNG/WEBP, max 10 Mo

### Streaming
- URLs signées/temporaires selon disk (R2 = SignedUrlService, S3 = temporaryUrl, local = url directe)
- Durée URL : 60 minutes pour S3
- Preview MP3 générée côté analyzer

### Analyse audio
- Pipeline asynchrone : Upload R2 → Event Notification → Cloudflare Queue → Worker → VPS Python FastAPI → Callback Laravel
- **Fallback** : Job Laravel `RequestAudioAnalysis` si pipeline R2 défaillant
- **Résultats** : waveform JSON, spectrogramme WEBP, features JSON, birdnet JSON, summary JSON
- Stockage résultats sur R2 (`sounds/analysis/{sound_id}/`)

### Radio
- Streaming MP3 via Icecast (`/radio/stream`)
- Playlist M3U (`/radio/stream.m3u`)
- Cache audio local (`radio_cache` disk)
- Crossfade configurable
- DJ IA ElevenLabs (feature flag `RADIO_DJ_ENABLED`)
- Podcasts IA générés périodiquement

---

## 11. Sécurité

### Authentification & Autorisations
- Auth session classique (Breeze) + Sanctum pour API
- Rôles enum, pas de permissions granulaires (Policies uniquement)
- Email verification requise pour actions sensibles
- OAuth Discord avec tokens chiffrés (`encrypted:` cast)

### Validation & Injection
- Form Requests sur TOUTES les entrées utilisateur
- Validation MIME stricte fichiers audio
- Coordonnées GPS bornées (-90/90, -180/180)
- Pas de raw SQL exposé — Eloquent partout

### CSRF / XSS
- CSRF automatique Laravel (sauf webhooks Stripe/DISCORD/Radio internes explicitement exemptés)
- Inertia gère le CSRF côté client
- Blade échappement natif

### Rate Limiting
- Throttle Laravel sur routes sensibles :
  - Contact : 5/min
  - Newsletter : 3/min
  - Push subscriptions : 10/min
  - Radio interactions : 60/min
  - Gamification (check-in, points, quêtes) : 10-60/min selon endpoint
  - Discord interne : throttle custom `discord`

### Données sensibles
- **GPS exactes** : jamais en API publique (`$hidden` + getters publics)
- **Clés S3/R2** : jamais côté client
- **Secrets Stripe** : server-side uniquement, webhook vérifié par signature
- **Tokens internes** : `ANALYZER_SECRET`, `DISCORD_INTERNAL_API_TOKEN`, `RADIO_INTERNAL_TOKEN`
- **Env** : `.env` jamais commité (exclu par rsync deploy)

### Modération
- Tous les points Arborisis passent par `pending` avant `approved`
- Reports avec workflow Examiner/Résoudre/Rejeter
- Chat ban par modérateur salon
- Soft delete sur contenu utilisateur

---

## 12. Performance

### Requêtes N+1
- Toujours eager-loader les relations fréquentes : `soundLocation`, `soundFile`, `user`, `category`, `tags`
- `MapController` utilise `with([...])` systématiquement

### Cache
- Redis pour sessions, cache, queues
- Cache config/routes/views en production (`php artisan config:cache`)
- Cache radio audio local (fichiers physiques)

### Pagination
- Sons publics paginés côté serveur
- API carte retourne collection complète (attention à la volumétrie — clustering côté client + filtres)

### Jobs & Queues
- Upload audio : pas bloquant (analyse async)
- Génération radio : queue dédiée
- Génération blog : queue dédiée
- Nettoyage présence : queue schedule

### Frontend
- Lazy loading images
- Vite code splitting par page Inertia
- PWA cache stratégique
- Three.js / Plotly : chargement à la demande

---

## 13. DevOps et déploiement

### CI/CD GitLab
- **Stages** : quality → test → build → deploy
- **Jobs** :
  - `composer` : validation composer.lock
  - `pint` : lint PHP (allow_failure)
  - `php_tests` : Pest PHP
  - `python_tests` : pytest sur `services/audio-analyzer/`
  - `frontend_build` : Vite build + SSR
  - `deploy_production` : manuel, branche par défaut uniquement

### Déploiement VPS
- **Méthode** : SSH + rsync avec releases
- **Structure** :
  ```
  /var/www/arborisis/
  ├── current → releases/main-xxx-yyy
  ├── releases/
  └── shared/
      ├── .env
      ├── storage/
      └── python-venv/
  ```
- **Script** : `.gitlab/deploy/deploy.sh` + `remote-release.sh`
- **Exclusions rsync** : `.env`, `.git/`, `node_modules/`, `vendor/`, `storage/`, `python/venv/`, `tests/`

### Serveur de production
- **OS** : Ubuntu/Debian
- **Web** : Nginx → PHP-FPM
- **PHP** : 8.3+ avec extensions pgsql, redis, intl, zip, xml, curl, mbstring, bcmath
- **DB** : PostgreSQL 16+ (recommandé)
- **Cache/Queue** : Redis 7+
- **Process** : Supervisor pour queue workers
- **Dépendances** : ffmpeg, python3, python3-venv

### Workers queue (Supervisor)
```ini
command=php /var/www/arborisis/current/artisan queue:work redis --sleep=3 --tries=3 --timeout=120
```

### Scheduler Laravel
```bash
* * * * * cd /var/www/arborisis/current && php artisan schedule:run >> /dev/null 2>&1
```

### Post-déploiement
```bash
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan queue:restart  # si RUN_QUEUE_RESTART=true
```

### Audio Analyzer Workers (VPS séparés)
- Docker Compose sur VPS dédiés
- 3 instances FastAPI derrière Nginx (least_conn)
- Cloudflare Worker d'orchestration avec failover
- Pas de DB ni Redis sur ces VPS

---

## 14. Qualité de code

### Conventions PHP
- `declare(strict_types=1);` en début de chaque fichier
- Typage strict partout (paramètres, retours, propriétés)
- Enums PHP pour tous les statuts/catégories/roles
- Form Requests pour validation
- Services pour logique métier (pas dans controllers)
- Policies pour autorisation
- Eloquent avec relations typées
- Soft deletes sur données utilisateur
- Transactions DB pour opérations sensibles

### Conventions Vue
- Composition API (`<script setup>`)
- Props typées (JSDoc ou TypeScript)
- Composables réutilisables pour logique transversale
- Pinia pour état global
- Tailwind utility-first

### Tests
- **Pest PHP** : Feature tests (auth, social, gamification, radio, wallet, audio) + Unit tests (services)
- **pytest** : Tests Python audio analyzer
- Commande : `composer test` ou `php artisan test`

### Lint
- **Pint** : `composer pint` ou `./vendor/bin/pint`

---

## 15. Commandes essentielles

```bash
# Installation
cd arborisis
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed

# Développement
composer dev          # Lance serveur + queue + logs + vite en parallèle
npm run dev           # Vite dev server
npm run build         # Build prod + SSR + copie SW

# Queues
php artisan queue:work redis --sleep=3 --tries=3
php artisan queue:listen

# Tests
php artisan test
./vendor/bin/pest

# Lint
./vendor/bin/pint

# Cache production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Scheduler
php artisan schedule:work   # Dev

# Radio
php artisan radio:generate-emission
php artisan radio:generate-flash
php artisan radio:health-check

# Gamification
php artisan db:seed --class=SeedDemoArborisisPoints

# Analyse audio
php artisan reanalyze:sounds

# Sitemap
php artisan sitemap:generate
```

---

## 16. Risques et zones sensibles

| Risque | Niveau | Détail |
|--------|--------|--------|
| **Exposition GPS exactes** | **Critique** | Vérifier systématiquement `$hidden` et les API resources |
| **Fraude ECHO / double paiement** | **Élevé** | Webhook Stripe idempotent, transactions atomiques, pas de modification `EchoTransaction` |
| **Coût stockage R2/S3** | Moyen | Limite upload, compression, archivage |
| **Spam contenu** | Moyen | Rate limiting, modération obligatoire points, CAPTCHA potentiel |
| **Conformité légale ECHO** | **Élevé** | Disclaimers présents, pas de promesse de rendement |
| **Performance carte** | Moyen | Clustering client + serveur, attention si >10k points |
| **Jobs longs audio/radio** | Moyen | Timeout 120s queue, VPS analyzer séparé |
| **Fuite secrets .env** | **Élevé** | Vérifier excludes rsync, jamais dans logs |
| **Discord bot token** | Moyen | API interne tokenisée, pas exposée publiquement |
| **Radio licensing** | Moyen | Sons sous licence, vérifier droits diffusion |

---

## 17. Comment ajouter une fonctionnalité

### Pattern obligatoire
```
Route → FormRequest → Controller → Service → Model → Event → Listener → Job (si async)
                              ↓
                         Policy (auth)
```

### Checklist d'ajout de feature
1. [ ] Migration avec `down()` propre et foreign keys nommées
2. [ ] Enum si statuts/catégories nouveaux
3. [ ] Model avec relations typées, casts, `$fillable`, soft delete si pertinent
4. [ ] Form Request avec validation stricte
5. [ ] Policy avec méthodes explicites
6. [ ] Service métier (pas dans le controller)
7. [ ] Controller léger (délègue au service)
8. [ ] Event si side-effects (notifications, quêtes, achievements)
9. [ ] Listener si réaction métier
10. [ ] Tests Pest (feature + unit)
11. [ ] Filament Resource si admin
12. [ ] Vue Page + Composants si frontend
13. [ ] Routes dans `web.php` (pages) ou `api.php` (data)
14. [ ] Rate limiting si route publique/sensible
15. [ ] Mise à jour `AGENT.md` si changement architecture

### Conventions spécifiques
- **GPS** : Toujours séparer exact/publique. Toujours valider `-90,90` / `-180,180`.
- **Audio** : Toujours valider MIME. Toujours utiliser `SoundUploadService` pattern transactionnel.
- **ECHO** : Toujours transaction DB. Jamais modifier/supprimer `EchoTransaction`.
- **Gamification** : Toujours dispatcher l'event métier (ex: `SoundPublished`, `ArborisisPointVisited`) pour déclencher quêtes/achievements/XP automatiquement.
- **Chat** : Toujours vérifier `banned_at` dans le pivot room-user.
- **Radio** : Toujours respecter les feature flags (`RADIO_*_ENABLED`).

---

## 18. Documentation externe référencée

- `ARCHITECTURE.md` — Architecture initiale et choix stack
- `design.md` — Design system complet (colors, typography, spacing, components)
- `docs/audio-analysis-pipeline.md` — Pipeline analyse audio
- `docs/deploiement-gitlab-vps.md` — Guide déploiement ops
- `docs/migration-r2.md` — Migration stockage vers R2
- `docs/audit-ux-frontend.md` — Audit UX
- `TASKS.md` / `TASKS_GAMIFICATION.md` — Suivi features (peuvent être obsolètes)

---

*Ce document est la source de vérité pour tout agent IA ou contributeur travaillant sur Arborisis. En cas de conflit avec un autre document, celui-ci prime sauf instructions explicites de l'utilisateur.*
