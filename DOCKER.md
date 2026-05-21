# Arborisis — Documentation Docker

> Guide complet de dockerisation, déploiement et gestion des conteneurs Arborisis.

---

## Table des matières

- [Architecture](#architecture)
- [Images Docker](#images-docker)
- [Variables d'environnement](#variables-denvironnement)
- [Environnements](#environnements)
  - [Développement](#développement)
  - [Staging](#staging)
  - [Production](#production)
- [Commandes utiles](#commandes-utiles)
- [CI/CD GitHub Actions](#cicd-github-actions)
- [Stratégie de tagging GHCR](#stratégie-de-tagging-ghcr)
- [Sécurité](#sécurité)
- [Troubleshooting](#troubleshooting)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client                              │
│                    (Navigateur / API)                       │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                      Nginx (Reverse Proxy)                   │
│         Rate limiting, Gzip, Headers sécurité               │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              PHP-FPM (Laravel Application)                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  Web App    │  │  API        │  │  Filament Admin     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │
         ┌─────────────┼─────────────┐
         ▼             ▼             ▼
┌──────────────┐ ┌──────────┐ ┌──────────────┐
│  PostgreSQL  │ │  Redis   │ │  Queue Worker │
│  + PostGIS   │ │          │ │  + Scheduler  │
└──────────────┘ └──────────┘ └──────────────┘
                       │
         ┌─────────────┼─────────────┐
         ▼             ▼             ▼
┌──────────────┐ ┌──────────┐ ┌──────────────────┐
│ Discord Bot  │ │  Python  │ │  Cloudflare      │
│  (Node.js)   │ │ Analyzer │ │  Workers (edge)  │
└──────────────┘ └──────────┘ └──────────────────┘
```

### Services principaux

| Service | Rôle | Port exposé |
|:---|:---|:---|
| `app` | Application Laravel (PHP-FPM 8.4) | 9000 (interne) |
| `nginx` | Reverse proxy + serveur statique | 80 |
| `db` | PostgreSQL 16 + PostGIS 3.4 | 5432 (interne) |
| `redis` | Cache, sessions, queues | 6379 (interne) |
| `queue` | Worker Laravel Queue (Redis) | — |
| `scheduler` | Laravel Scheduler (cron toutes les 60s) | — |
| `discord-bot` | Bot Discord Node.js | 3001 (interne) |
| `python-analyzer` | Service d'analyse audio Python | 8000 (interne) |

---

## Images Docker

### Registre

**GitHub Container Registry (GHCR)** :
- `ghcr.io/bastienjavx/arborisis-app`
- `ghcr.io/bastienjavx/arborisis-nginx`
- `ghcr.io/bastienjavx/arborisis-discord-bot`
- `ghcr.io/bastienjavx/arborisis-python-analyzer`

### Build multi-platform

Toutes les images sont buildées pour :
- `linux/amd64` (serveurs cloud standard)
- `linux/arm64` (Apple Silicon, AWS Graviton)

### Dockerfile `app`

Multi-stage build optimisé :

| Stage | Base | Rôle |
|:---|:---|:---|
| `php-base` | `php:8.4-fpm-alpine` | Extensions PHP + système |
| `composer-deps` | `php-base` | Installation Composer (prod) |
| `assets` | `node:22-alpine` | Build Vite (npm ci + npm run build) |
| `production` | `php-base` | Image finale (artefacts copiés) |

**Optimisations** :
- Pas de `node_modules` dans l'image finale
- OPcache JIT activé
- Compression Gzip Nginx
- Cache headers agressifs sur `/build/` et `/storage/`

### Dockerfile `dev`

- PHP 8.4-FPM Alpine + Xdebug 3
- Hot-reload Vite via conteneur `vite` séparé
- Volumes montés pour le code source

---

## Variables d'environnement

### Obligatoires

```bash
APP_KEY=base64:...          # Clé générée avec php artisan key:generate
APP_URL=https://arborisis.com

DB_CONNECTION=pgsql
DB_HOST=db
DB_DATABASE=arborisis
DB_USERNAME=arborisis
DB_PASSWORD=<secret>

REDIS_HOST=redis

QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
CACHE_STORE=redis
```

### Intégrations (optionnelles selon features)

```bash
# Stripe
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Cloudflare R2
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET=...

# Discord
DISCORD_BOT_TOKEN=...
DISCORD_GUILD_ID=...
DISCORD_INTERNAL_API_TOKEN=...

# Audio Analysis
ANALYZER_URL=http://python-analyzer:8000
ANALYZER_SECRET=...

# OpenRouter (IA)
OPENROUTER_API_KEY=...

# ElevenLabs (Radio IA)
ELEVENLABS_API_KEY=...
```

Voir `.env.docker` pour le template complet.

---

## Environnements

### Développement

```bash
# 1. Copier et éditer l'environnement
cp .env.docker .env
# Éditer les valeurs (DB_PASSWORD, APP_KEY, etc.)

# 2. Démarrer
docker compose -f docker-compose.dev.yml up -d

# 3. Installer les dépendances (premier lancement)
docker compose -f docker-compose.dev.yml exec app composer install
docker compose -f docker-compose.dev.yml exec vite npm install

# 4. Générer la clé et migrer
docker compose -f docker-compose.dev.yml exec app php artisan key:generate
docker compose -f docker-compose.dev.yml exec app php artisan migrate
```

**Accès** :
- Application : http://localhost:8080
- Vite HMR : http://localhost:5173
- PostgreSQL : localhost:54322
- Redis : localhost:63790
- Xdebug : port 9003

### Staging

```bash
cp .env.docker .env.staging
# Éditer avec les valeurs staging

docker compose -f docker-compose.staging.yml up -d
```

**Accès** : http://localhost:8080 (ou port configuré via `STAGING_PORT`)

### Production

```bash
# 1. Copier .env avec les secrets de production
cp .env.docker .env
# Éditer avec les valeurs production

# 2. Lancer
docker compose -f docker-compose.yml up -d

# 3. Migrations (une seule fois)
docker compose -f docker-compose.yml exec app php artisan migrate --force

# 4. Optimisations
docker compose -f docker-compose.yml exec app php artisan optimize
docker compose -f docker-compose.yml exec app php artisan queue:restart
```

**Accès** : http://localhost (ou via reverse proxy externe)

---

## Commandes utiles

### Artisan

```bash
# Dans le conteneur app
docker compose exec app php artisan <command>

# Exemples
docker compose exec app php artisan migrate:fresh --seed
docker compose exec app php artisan route:list
docker compose exec app php artisan tinker
```

### NPM / Vite

```bash
# En dev (via le conteneur vite)
docker compose -f docker-compose.dev.yml exec vite npm run build

# En production (déjà buildé dans l'image)
```

### Logs

```bash
# Tous les services
docker compose logs -f

# Un service spécifique
docker compose logs -f app
docker compose logs -f queue
docker compose logs -f scheduler
```

### Shell

```bash
# App
docker compose exec app sh

# Base de données
docker compose exec db psql -U arborisis -d arborisis

# Redis
docker compose exec redis redis-cli
```

### Maintenance

```bash
# Mettre en maintenance
docker compose exec app php artisan down

# Sortir de maintenance
docker compose exec app php artisan up

# Redémarrer un service
docker compose restart queue

# Rebuild complet
docker compose up -d --build --force-recreate

# Nettoyer
docker system prune -f
docker volume prune -f
```

---

## CI/CD GitHub Actions

### Workflows

| Workflow | Fichier | Déclenchement |
|:---|:---|:---|
| **CI** | `.github/workflows/ci.yml` | PR vers `main`/`develop`, push sur `develop` |
| **Security** | `.github/workflows/security.yml` | PR, push, cron hebdo |
| **Build & Push** | `.github/workflows/build-push.yml` | Push sur `main`, tags semver |
| **Deploy** | `.github/workflows/deploy.yml` | Manuel (`workflow_dispatch`) |

### Secrets GitHub requis

| Secret | Utilisé dans | Description |
|:---|:---|:---|
| `GITHUB_TOKEN` | Build & Push | Token natif GHCR (automatique) |
| `SSH_PRIVATE_KEY` | Deploy | Clé SSH pour le serveur production |
| `SSH_HOST` | Deploy | IP ou hostname du serveur |
| `SSH_PORT` | Deploy | Port SSH (défaut: 22) |
| `SSH_USER` | Deploy | Utilisateur SSH |
| `DEPLOY_PATH` | Deploy | Chemin du déploiement Docker sur le serveur |
| `APP_URL` | Deploy | URL de l'application (pour healthcheck) |

### Environnements GitHub

- `production` : protection branch + reviewers requis

---

## Stratégie de tagging GHCR

### Tags générés

| Événement | Tags créés |
|:---|:---|
| Push sur `main` | `latest`, `sha-<short>` |
| Tag `v1.2.3` | `v1.2.3`, `v1.2`, `sha-<short>`, `latest` |
| Tag `v1.2.3-beta.1` | `v1.2.3-beta.1`, `sha-<short>` |
| Manual dispatch | `<input_tag>` |

### Exemples d'images

```
ghcr.io/bastienjavx/arborisis-app:latest
ghcr.io/bastienjavx/arborisis-app:v1.2.3
ghcr.io/bastienjavx/arborisis-app:sha-a1b2c3d
ghcr.io/bastienjavx/arborisis-nginx:latest
```

### Déploiement d'une version spécifique

```bash
# Dans le workflow Deploy (manuel)
# Sélectionner l'action "deploy" et entrer le tag souhaité

# Ou en ligne de commande sur le serveur
export IMAGE_TAG=v1.2.3
docker compose -f docker-compose.yml pull
docker compose -f docker-compose.yml up -d
```

---

## Sécurité

### Bonnes pratiques

- **Aucun secret** dans les Dockerfiles ou fichiers versionnés
- `.env` et `.env.staging` dans `.gitignore`
- `docker-compose.override.yml` non versionné
- Images basées sur Alpine Linux (surface d'attaque minimale)
- Scan de secrets avec Gitleaks en CI
- Audit Composer et NPM en CI

### Headers de sécurité (Nginx)

- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` restreint

### Rate limiting

- API : 10 req/s (burst 20)
- Upload : 1 req/s (burst 5)

---

## Troubleshooting

### Erreur "Connection refused" à la base de données

```bash
# Vérifier que la DB est healthy
docker compose ps

# Voir les logs
docker compose logs db

# Réinitialiser
docker compose down -v
docker compose up -d db
```

### Erreur "Permission denied" sur storage

```bash
# Réparer les permissions
docker compose exec app chown -R www-data:www-data storage bootstrap/cache
```

### Xdebug ne se connecte pas

```bash
# Vérifier la configuration
docker compose -f docker-compose.dev.yml exec app php -v | grep -i xdebug

# S'assurer que le port 9003 est exposé
docker compose -f docker-compose.dev.yml ps
```

### Build Vite échoue dans Docker

```bash
# Augmenter la mémoire Docker Desktop
# Ou builder localement et monter le dossier public/build
```

### Container queue redémarre en boucle

```bash
# Vérifier que Redis est démarré
docker compose logs redis

# Vérifier la configuration queue
docker compose exec app php artisan config:show queue
```

---

## Ressources

- [Documentation Laravel](https://laravel.com/docs)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [GHCR Documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)

---

**Dernière mise à jour** : 2025-05-21
