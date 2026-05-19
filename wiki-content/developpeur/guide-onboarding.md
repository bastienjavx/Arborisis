# Onboarding — Nouveau Développeur

## Bienvenue

Arborisis est une plateforme sociale premium de field recording nature. Stack : Laravel 12 + Vue 3 + Inertia.js + Tailwind CSS + PostgreSQL/PostGIS + Redis.

## Prérequis

- PHP 8.3+ avec extensions : `pgsql`, `redis`, `gd`, `exif`, `bcmath`, `intl`, `zip`
- Node.js 20+ + npm
- PostgreSQL 16+ (ou Docker)
- Redis 7+ (ou Docker)
- Composer 2.x
- Git

## Installation locale

### 1. Cloner le repo

```bash
git clone <repo-url> <redacted>
cd <redacted>/<redacted>
```

### 2. Installer les dépendances

```bash
composer install
npm install
```

### 3. Configurer l'environnement

```bash
cp .env.example .env
php artisan key:generate
```

Éditez `.env` avec vos paramètres locaux :
```env
APP_URL=http://localhost:8000
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=<redacted>
DB_USERNAME=<redacted>
DB_PASSWORD=secret

REDIS_HOST=localhost
REDIS_PORT=6379

STRIPE_KEY=pk_test_...
STRIPE_SECRET=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

CONTABO_S3_KEY=...
CONTABO_S3_SECRET=...
```

### 4. Base de données

```bash
# Créer la DB et l'utilisateur
createdb <redacted>

# Migrations + seeders
php artisan migrate
php artisan db:seed
```

### 5. Storage & liens

```bash
php artisan storage:link
```

### 6. Compiler les assets

```bash
npm run dev    # dev avec HMR
# ou
npm run build  # production
```

### 7. Lancer le serveur

```bash
php artisan serve
```

L'application est accessible sur `http://localhost:8000`.

## Docker (recommandé)

Pour une stack complète avec PostgreSQL, Redis, Nginx, Queue Workers et Reverb :

```bash
cd infrastructure/docker
docker compose --profile web --profile data up -d
```

Les profils disponibles :
- `web` — Nginx, App Laravel, SSR, Reverb
- `workers` — Queue, Scheduler, Discord Bot
- `data` — PostgreSQL, Redis
- `tunnel` — Cloudflare Tunnel
- `wiki` — Wiki.js (voir documentation wiki)

## Structure du code

```
app/
  Console/Commands/      # Commandes Artisan
  Enums/                 # Enums PHP (statuts, rôles, catégories)
  Events/Gamification/   # Événements domaine
  Filament/              # Ressources et pages admin
  Http/
    Controllers/Api/     # API REST
    Controllers/Web/     # Pages Inertia
    Requests/            # Form Requests (validation)
  Jobs/                  # Jobs async
  Listeners/             # Event listeners
  Models/                # Eloquent (55+ modèles)
  Policies/              # Autorisations
  Services/              # Logique métier (CRITICAL)
    AI/                  # OpenRouter, ElevenLabs
    Audio/               # Upload, analyse
    Echo/                # Wallet, transactions
    Gamification/        # XP, quêtes, anti-triche
    Radio/               # Stream, DJ, podcasts
    Scientific/          # Stats, listening points
    Social/              # Likes, follows, chat
resources/js/
  Components/            # Composants Vue réutilisables
  Composables/           # Logique réactive partagée
  Pages/                 # Pages Inertia (routing Laravel)
  Stores/                # Pinia (player, PWA, consent)
```

## Conventions de code (obligatoires)

### PHP
- `declare(strict_types=1);` en haut de chaque fichier
- Typage strict sur tous les paramètres et retours
- Enums pour tous les statuts et rôles
- Form Request pour toute validation entrante
- Policy pour toute autorisation
- Service pour toute logique métier (jamais dans le contrôleur)
- `DB::transaction()` pour ECHO et uploads
- `decimal(10,2)` pour les montants

### Vue
- Composition API (`<script setup>`)
- Props typées
- Pinia pour l'état global
- Tailwind CSS avec palette Arborisis

## Tests

```bash
# Lancer tous les tests
./vendor/bin/pest

# Avec couverture
./vendor/bin/pest --coverage
```

## Git Workflow

1. Créez une branche par feature : `feat/nom-de-la-feature`
2. Commits conventionnels : `feat:`, `fix:`, `docs:`, `refactor:`, `test:`
3. Push et ouvrez une Merge Request sur GitLab
4. La CI/CD lance : Quality → Test → Build → Deploy

## Points d'attention

### Sécurité
- **Jamais** exposer de clés S3 côté client
- **Jamais** retourner de coordonnées GPS exactes en API publique
- Valider strictement les MIME types des uploads
- Rate limiting sur les routes sensibles
- Vérifier la signature des webhooks Stripe

### Performance
- Utiliser `OpenSearch` pour la recherche de sons (pas de `LIKE %%`)
- Cacher les stats aggrégées via `StatsCacheService`
- Lazy load les composants lourds (carte, charts)
- Utiliser `instanciation` pour les listes longues

### RGPD
- Account deletion = suppression données gamification (anonymisation si contenu public)
- Export JSON des données utilisateur sur demande
- Consentement géolocalisation stocké et révocable

## Contacts

- **Lead Tech** : [à compléter]
- **Channel Discord dev** : [à compléter]
- **Documentation** : ce wiki (`wiki.<redacted>.com`)

## Ressources utiles

- [Architecture détaillée](/developpeur/architecture-detaillee)
- [Pipeline Analyse Audio](/developpeur/pipeline-analyse-audio)
- [Conventions Agents](/developpeur/conventions-agents)
- [Déploiement GitLab → VPS](/developpeur/deploiement-gitlab-vps)
- [Design System](/reference/design-system)
