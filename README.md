<div align="center">

# 🌿 Arborisis

**La plateforme sociale premium dédiée aux sons de la nature.**

*Capturez, partagez et explorez le monde sonore sauvage.*

[![CI](https://github.com/bastienjavx/Arborisis/actions/workflows/ci.yml/badge.svg)](https://github.com/bastienjavx/Arborisis/actions)
[![Security](https://github.com/bastienjavx/Arborisis/actions/workflows/security.yml/badge.svg)](https://github.com/bastienjavx/Arborisis/actions)
[![PHP Version](https://img.shields.io/badge/PHP-8.3%2B-777BB4?logo=php&logoColor=white)](https://php.net)
[![Laravel Version](https://img.shields.io/badge/Laravel-12.x-FF2D20?logo=laravel&logoColor=white)](https://laravel.com)
[![Vue.js Version](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vuedotjs&logoColor=white)](https://vuejs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[🌐 Site web](https://arborisis.com) · [📖 Documentation](#documentation) · [🚀 Installation](#installation-rapide) · [🤝 Contribuer](#contribuer)

</div>

---

## 📸 Aperçu

<div align="center">

| Pipeline CI/CD |
|:---:|
| ![Pipeline](docs/assets/gitlab-pipelines.png) |

</div>

---

## ✨ Qu'est-ce qu'Arborisis ?

Arborisis est une **plateforme sociale immersive** pensée pour les *field recorders*, naturalistes et amateurs de sons sauvages. Elle permet de :

- 🎙️ **Uploader** des enregistrements naturels avec métadonnées riches (équipement, environnement, conditions)
- 🗺️ **Explorer** une carte interactive mondiale des sons (Leaflet + clustering)
- 💚 **Soutenir** les créateurs via le système de crédits internes **ECHO**
- 🔒 **Protéger** la biodiversité — les coordonnées GPS exactes ne sont jamais exposées publiquement
- 🎧 **Écouter** via un lecteur premium avec waveform (Wavesurfer.js)

> **ECHO** est un système de crédits internes — ni cryptomonnaie, ni investissement. Une façon simple de valoriser le travail des créateurs.

---

## 🛠 Stack Technique

### Backend
| Technologie | Version | Rôle |
|-------------|---------|------|
| **Laravel** | 12.x | Framework PHP — API, auth, queues |
| **PHP** | 8.3+ | Typage strict, enums, performance |
| **PostgreSQL** | 16+ | Base de données + PostGIS (géospatial) |
| **Redis** | 7+ | Cache, sessions, queues, rate limiting |
| **Laravel Cashier** | 15.x | Intégration Stripe (packs ECHO) |
| **Filament** | 3.x | Panel d'administration |
| **Contabo S3** | — | Stockage audio et images |

### Frontend
| Technologie | Version | Rôle |
|-------------|---------|------|
| **Vue 3** | 3.4+ | SPA réactive (Composition API) |
| **Inertia.js** | 2.x | Bridge Laravel ↔ Vue sans API REST |
| **Tailwind CSS** | 4.x | Design system utility-first |
| **shadcn-vue** | Dernier | Composants UI accessibles |
| **Leaflet** | 1.9+ | Carte interactive mondiale |
| **Wavesurfer.js** | 7.x | Waveform audio premium |
| **Pinia** | — | État global (mini-player persistant) |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Vue 3 SPA   │  │   Leaflet    │  │ Wavesurfer.js    │  │
│  │  (Inertia)   │  │    Map       │  │ Player           │  │
│  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘  │
│         └─────────────────┴─────────────────────┘            │
│                           │                                 │
│                    Inertia Requests (XHR)                   │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────┼─────────────────────────────────┐
│                    LARAVEL BACKEND                          │
│  ┌────────────────────────┼─────────────────────────────┐   │
│  │  HTTP Layer            │  Routes → Middleware → ...  │   │
│  │  Service Layer         │  SoundService, EchoService   │   │
│  │  Models                │  Eloquent + Relations        │   │
│  └────────────┬───────────┴───────────┬─────────────────┘   │
│               │                       │                     │
│  ┌────────────┴──┐  ┌────────────────┴──┐  ┌────────────┐  │
│  │  PostgreSQL   │  │      Redis        │  │ Contabo S3 │  │
│  │  (Data+PostGIS)│  │ (Cache/Queue)     │  │(Audio/Img) │  │
│  └───────────────┘  └───────────────────┘  └────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Principes clés
- **Single Responsibility** — Un service = un domaine métier
- **Privacy-first** — Coordonnées exactes jamais en API publique
- **Fail-safe** — Uploads transactionnels (DB + S3)
- **Audit trail** — Journal ECHO immuable
- **Defense in depth** — Validation à tous les niveaux

---

## 🚀 Installation Rapide

### Option A — Docker (recommandée)

Le plus simple pour démarrer en local ou sur un serveur frais. Nécessite seulement [Docker](https://docs.docker.com/get-docker/) et `git`.

```bash
git clone https://github.com/bastienjavx/Arborisis.git
cd Arborisis
./scripts/setup-dev.sh
```

Cela lance automatiquement :
- PostgreSQL 17 + PostGIS
- Redis 7
- Laravel (PHP-FPM + Nginx)
- SSR Inertia
- Reverb (websockets)
- Queue workers + Scheduler
- Discord bot (optionnel)

L'application est accessible sur **http://localhost**.

### Option B — Manuelle (sans Docker)

#### Prérequis
- PHP 8.3+
- PostgreSQL 16+ (avec PostGIS)
- Redis 7+
- Node.js 20+
- Composer 2+

#### 1. Cloner et installer
```bash
git clone https://github.com/bastienjavx/Arborisis.git
cd Arborisis/arborisis
composer install
npm install
```

#### 2. Configurer l'environnement
```bash
cp .env.example .env
php artisan key:generate
```

Éditer `.env` avec vos credentials :
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=arborisis
DB_USERNAME=arborisis
DB_PASSWORD=secret

CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
REDIS_HOST=127.0.0.1
```

#### 3. Base de données & assets
```bash
php artisan migrate --seed
npm run build
```

#### 4. Lancer
```bash
php artisan serve
npm run dev   # dans un autre terminal
```

---

## 🖥 Déploiement Serveur (VPS frais)

Sur un serveur Ubuntu/Debian vierge, en une commande :

```bash
curl -fsSL https://raw.githubusercontent.com/bastienjavx/Arborisis/dev/scripts/setup-server.sh | sudo bash
```

Ou manuellement :
```bash
git clone https://github.com/bastienjavx/Arborisis.git
cd Arborisis
sudo ./scripts/setup-server.sh
```

Le script :
- Installe Docker et Docker Compose
- Clone/met à jour le repo
- Génère les fichiers `.env` et les secrets
- Build et démarre tous les services
- Exécute les migrations

> ⚠️ **Après l'installation**, édite `arborisis/.env` pour ajouter tes clés S3/R2, Stripe, et configurer le SSL (Cloudflare Tunnel, Certbot, ou reverse proxy).

---

## 📂 Structure du Projet

Arborisis est un monorepo. L'application Laravel déployée reste dans
`arborisis/`; la racine sert à coordonner la documentation, la CI, les workers,
les services Python et l'infrastructure.

```
.
├── arborisis/                 # Laravel 12 + Inertia/Vue + Discord bot
├── workers/                   # Workers Cloudflare
├── services/audio-analyzer/   # Service Python FastAPI d'analyse audio
├── infrastructure/            # Docker, radio, wiki, monitoring, VPS
├── docs/                      # Documentation, audits, assets
├── wiki-content/              # Contenu Wiki.js
└── scripts/security/          # Audits passifs et dépendances
```

> Pour plus de détails, voir [`docs/repository-map.md`](docs/repository-map.md) et [`ARCHITECTURE.md`](ARCHITECTURE.md).

---

## 📖 Documentation

- [`docs/repository-map.md`](docs/repository-map.md) — carte du monorepo, commandes et règles de rangement.
- [`ARCHITECTURE.md`](ARCHITECTURE.md) — architecture Laravel/Inertia de référence.
- [`docs/deploiement-gitlab-vps.md`](docs/deploiement-gitlab-vps.md) — déploiement GitLab vers VPS.
- [`docs/security/audit-2026-05-19.md`](docs/security/audit-2026-05-19.md) — dernier audit sécurité passif.
- [`docs/agents/full-agent-guide.md`](docs/agents/full-agent-guide.md) — guide long pour agents IA et contributeurs.

---

## 🔧 Développement

### Commandes utiles
Depuis `arborisis/` :

```bash
# Mode développement
npm run dev

# Build production
npm run build

# Tests
php artisan test

# Queue worker
php artisan queue:work

# Linter
./vendor/bin/pint
```

Depuis la racine du dépôt :

```bash
# Audits de dépendances PHP/Node
scripts/security/dependency-audit.sh

# Vérification passive de production
scripts/security/passive-prod-check.sh https://arborisis.com
```

### Conventions de code
- PHP 8.3+ avec `declare(strict_types=1)`
- Enums PHP pour tous les statuts et rôles
- Form Requests pour toute validation entrante
- Policies Laravel pour les autorisations
- Services pour la logique métier (pas dans les controllers)
- Vue 3 Composition API + TypeScript recommandé
- Tailwind CSS avec palette personnalisée Arborisis

> Voir [`AGENTS.md`](AGENTS.md) pour les conventions complètes.

---

## 🚀 Déploiement

Les workflows GitHub Actions (`ci.yml`, `security.yml`) testent le backend, le frontend et auditent les dépendances à chaque PR.

### Option 1 — Docker Compose (recommandée)

Déploie l'ensemble de la stack (PostgreSQL, Redis, Laravel, Nginx, Workers) via Docker sur un seul serveur ou plusieurs. Voir [`scripts/setup-server.sh`](scripts/setup-server.sh) pour l'installation automatique sur un VPS vierge, ou [`infrastructure/docker/`](infrastructure/docker/) pour la configuration avancée.

```bash
cd infrastructure/docker
./deploy-local.sh data    # PostgreSQL + Redis
./deploy-local.sh web     # Laravel + Nginx + Reverb + SSR
./deploy-local.sh workers # Queue + Scheduler + Discord bot
```

### Option 2 — GitLab CI + VPS classique

Le pipeline GitLab CI (job manuel `deploy_production`) livre sur le VPS via SSH + rsync, avec releases atomiques et dossiers partagés.

Voir [`docs/deploiement-gitlab-vps.md`](docs/deploiement-gitlab-vps.md).

---

## 🧪 Tests

Depuis `arborisis/` :

```bash
# Tests complets
php artisan test

# Avec coverage
php artisan test --coverage

# Tests spécifiques
php artisan test --filter=SoundUploadTest
```

---

## 📋 Roadmap MVP

- [x] Socle Laravel + Inertia/Vue + design system
- [x] Upload audio + stockage S3 + métadonnées
- [x] Carte interactive (Leaflet) + clustering
- [x] Système social (likes, favoris, commentaires, follows)
- [ ] Système ECHO + Stripe Checkout
- [ ] Panel admin (Filament)
- [ ] Lecteur premium (Wavesurfer.js + mini-player)
- [ ] PWA + optimisations mobiles

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! Merci de lire [`CONTRIBUTING.md`](CONTRIBUTING.md) avant de proposer une PR.

### Rapport de bug
Utilisez le template **Bug** dans les [issues GitHub](../../issues).

### Proposition de fonctionnalité
Utilisez le template **Feature** dans les [issues GitHub](../../issues).

---

## 📜 Licence

Ce projet est sous licence MIT. Voir le fichier [`LICENSE`](LICENSE) pour plus de détails.

---

<div align="center">

🌿 *Arborisis — Écoutez la nature.*

</div>
