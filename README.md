<div align="center">

<!-- Animated Header Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1a4d2e,50:2d6a4f,100:40916c&height=280&section=header&text=ARBORISIS&fontSize=70&fontColor=d8f3dc&animation=fadeIn&fontAlignY=38&desc=La%20plateforme%20sociale%20premium%20d%C3%A9di%C3%A9e%20aux%20sons%20de%20la%20nature&descAlignY=55&descSize=18&descColor=b7e4c7"/>

<br>

<!-- Animated Typing Tagline -->
<img src="https://readme-typing-svg.demolab.com?font=Cormorant+Garamond&weight=600&size=26&duration=4000&pause=1000&color=52B788&center=true&vCenter=true&width=800&lines=%C3%89coutez+le+monde+sauvage.;Capturez+l'invisible.;Partagez+la+beaut%C3%A9+des+sons+de+la+nature.;Protegez+ce+qui+compte." alt="Typing SVG" />

<br><br>

<!-- Primary Badges Row -->
<a href="https://php.net"><img src="https://img.shields.io/badge/PHP-8.3%2B-777BB4?style=for-the-badge&logo=php&logoColor=white&labelColor=1a1a2e"/></a>
<a href="https://laravel.com"><img src="https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white&labelColor=1a1a2e"/></a>
<a href="https://vuejs.org"><img src="https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white&labelColor=1a1a2e"/></a>
<a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=1a1a2e"/></a>

<br>

<!-- CI/CD Badges Row -->
<a href="https://github.com/bastienjavx/Arborisis/actions"><img src="https://img.shields.io/github/actions/workflow/status/bastienjavx/Arborisis/ci.yml?branch=main&style=flat-square&label=CI&labelColor=1a1a2e&color=52B788&logo=githubactions&logoColor=white"/></a>
<a href="https://github.com/bastienjavx/Arborisis/actions"><img src="https://img.shields.io/github/actions/workflow/status/bastienjavx/Arborisis/security.yml?branch=main&style=flat-square&label=Security&labelColor=1a1a2e&color=e63946&logo=shield&logoColor=white"/></a>
<a href="https://gitlab.com/bastienjavaux/arborisis.com"><img src="https://img.shields.io/gitlab/pipeline-status/bastienjavaux%2Farborisis.com?branch=main&style=flat-square&label=Pipeline&labelColor=1a1a2e&color=40916c&logo=gitlab&logoColor=white"/></a>

<br>

<!-- Quality Badges Row -->
<a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-ffb703?style=flat-square&labelColor=1a1a2e"/></a>
<a href="#"><img src="https://img.shields.io/badge/Tests-Pest-7B68EE?style=flat-square&labelColor=1a1a2e&logo=checkmarx&logoColor=white"/></a>
<a href="#"><img src="https://img.shields.io/badge/Linter-Pint-FF6B6B?style=flat-square&labelColor=1a1a2e"/></a>
<a href="#"><img src="https://img.shields.io/badge/Types-Strict-3178C6?style=flat-square&labelColor=1a1a2e&logo=typescript&logoColor=white"/></a>

<br><br>

[🌐 **Site web**](https://arborisis.com) · [📖 **Documentation**](#-documentation) · [🚀 **Installation**](#-installation-rapide) · [🤝 **Contribuer**](#-contribuer) · [📜 **Architecture**](#-architecture)

</div>

---

<br>

## 🌿 Vision

<div align="center">

> *"Dans un monde visuellement saturé, Arborisis offre un refuge sonore.
> Chaque enregistrement est une fenêtre ouverte sur l'inaudible —
> le frémissement d'une feuille, le chant lointain d'un oiseau,
> le silence pesant d'une forêt au crépuscule."*

</div>

**Arborisis** est une plateforme sociale immersive pensée pour les *field recorders*, naturalistes, sound designers et tous ceux qui entendent le monde autrement. Elle allie **technologie de pointe**, **design premium** et **éthique environnementale** pour créer l'expérience de partage sonore la plus aboutie du web.

<div align="center">

| 🎙️ **Capturer** | 🗺️ **Explorer** | 💚 **Soutenir** | 🔒 **Protéger** |
|:---:|:---:|:---:|:---:|
| Enregistrements HD avec métadonnées riches | Carte interactive mondiale avec clustering | Système de crédits **ECHO** via Stripe | Coordonnées GPS exactes jamais exposées |

</div>

<br>

---

## ✨ Fonctionnalités

<div align="center">

### 🎵 **Audio & Création**

</div>

| Fonctionnalité | Description | Technologie |
|:---|:---|:---|
| 🎙️ **Upload Premium** | Upload audio avec validation MIME stricte, métadonnées riches (équipement, environnement, conditions) | Laravel Queues + R2 |
| 🌊 **Waveform Interactive** | Visualisation audio temps réel avec navigation précise | Wavesurfer.js 7 |
| 🎧 **Lecteur Global** | Mini-player persistant via Pinia, playlist continue, contrôles flottants | Vue 3 + Pinia |
| 🔬 **Analyse Audio IA** | Détection automatique d'espèces (BirdNET), tagging IA, extraction de caractéristiques | Python FastAPI + AI |
| 📻 **Radio Arborisis** | Webradio 24/7 avec DJ IA (ElevenLabs), podcasts auto-générés, émissions thématiques | Icecast + Liquidsoap |

<div align="center">

### 🗺️ **Carte & Découverte**

</div>

| Fonctionnalité | Description | Technologie |
|:---|:---|:---|
| 🌍 **Carte Mondiale** | Carte interactive Leaflet avec clustering, filtres par environnement/catégorie | Leaflet + OpenStreetMap |
| 📍 **Points d'Écoute** | Lieux scientifiques avec métriques environnementales, observations et historique | PostGIS + OpenMeteo |
| 🚶 **SoundWalks** | Parcours sonores guidés avec routage OSRM, points d'intérêt narratifs | OSRM + Vue 3 |
| 🎮 **Gamification** | Quêtes, succès, médailles, streaks, niveaux — avec anti-triche géospatial | Redis + Services métier |
| 💬 **Chat en Temps Réel** | Messagerie instantanée, salons thématiques, conversations privées | Laravel Reverb |

<div align="center">

### 💰 **Économie & Social**

</div>

| Fonctionnalité | Description | Technologie |
|:---|:---|:---|
| 💎 **ECHO** | Système de crédits internes (ni crypto, ni investissement) pour soutenir les créateurs | Stripe + Journal immuable |
| 👥 **Réseau Social** | Likes, favoris, commentaires, follows, groupes d'enregistrement | Eloquent + Inertia |
| 🤖 **Bot Discord** | Intégration communautaire, notifications, liaison de compte | Node.js + Socialite |
| 🔔 **Notifications Push** | Alertes navigateur via VAPID, newsletters segmentées | Web Push + Queues |
| 📊 **Dashboard Analytique** | Statistiques d'écoute, revenus ECHO, croissance audience | Filament + OpenSearch |

<br>

---

## 🛠 Stack Technique

<div align="center">

### Backend — *L'Orchestre*

</div>

<table align="center">
  <tr>
    <td align="center" width="140">
      <img src="https://skillicons.dev/icons?i=php" width="40"/><br>
      <b>PHP 8.3+</b><br>
      <sub>Typage strict, Enums, Performance</sub>
    </td>
    <td align="center" width="140">
      <img src="https://skillicons.dev/icons?i=laravel" width="40"/><br>
      <b>Laravel 12.x</b><br>
      <sub>API, Auth, Queues, Events</sub>
    </td>
    <td align="center" width="140">
      <img src="https://skillicons.dev/icons?i=postgres" width="40"/><br>
      <b>PostgreSQL 16+</b><br>
      <sub>Données + PostGIS spatial</sub>
    </td>
    <td align="center" width="140">
      <img src="https://skillicons.dev/icons?i=redis" width="40"/><br>
      <b>Redis 7+</b><br>
      <sub>Cache, Sessions, Queues</sub>
    </td>
    <td align="center" width="140">
      <img src="https://skillicons.dev/icons?i=stripe" width="40"/><br>
      <b>Stripe</b><br>
      <sub>Paiements ECHO</sub>
    </td>
  </tr>
</table>

<div align="center">

### Frontend — *L'Interface*

</div>

<table align="center">
  <tr>
    <td align="center" width="140">
      <img src="https://skillicons.dev/icons?i=vue" width="40"/><br>
      <b>Vue 3</b><br>
      <sub>Composition API, Réactivité</sub>
    </td>
    <td align="center" width="140">
      <img src="https://skillicons.dev/icons?i=ts" width="40"/><br>
      <b>TypeScript</b><br>
      <sub>Types stricts, Contrats</sub>
    </td>
    <td align="center" width="140">
      <img src="https://skillicons.dev/icons?i=tailwind" width="40"/><br>
      <b>Tailwind CSS 4</b><br>
      <sub>Design System Premium</sub>
    </td>
    <td align="center" width="140">
      <img src="https://skillicons.dev/icons?i=vite" width="40"/><br>
      <b>Vite + SSR</b><br>
      <sub>Build rapide, SEO</sub>
    </td>
    <td align="center" width="140">
      <img src="https://skillicons.dev/icons?i=pinia" width="40"/><br>
      <b>Pinia</b><br>
      <sub>État global, Player</sub>
    </td>
  </tr>
</table>

<div align="center">

### Infrastructure — *Le Terreau*

</div>

<table align="center">
  <tr>
    <td align="center" width="140">
      <img src="https://skillicons.dev/icons?i=docker" width="40"/><br>
      <b>Docker</b><br>
      <sub>Orchestration complète</sub>
    </td>
    <td align="center" width="140">
      <img src="https://skillicons.dev/icons?i=cloudflare" width="40"/><br>
      <b>Cloudflare R2</b><br>
      <sub>Stockage audio/images</sub>
    </td>
    <td align="center" width="140">
      <img src="https://skillicons.dev/icons?i=workers" width="40"/><br>
      <b>Cloudflare Workers</b><br>
      <sub>Edge computing, Proxy</sub>
    </td>
    <td align="center" width="140">
      <img src="https://skillicons.dev/icons?i=python" width="40"/><br>
      <b>Python FastAPI</b><br>
      <sub>Analyse audio, IA</sub>
    </td>
    <td align="center" width="140">
      <img src="https://skillicons.dev/icons?i=nodejs" width="40"/><br>
      <b>Node.js</b><br>
      <sub>Discord Bot, Services</sub>
    </td>
  </tr>
</table>

<br>

---

## 🏗 Architecture

<div align="center">

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              EXPERIENCE UTILISATEUR                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Vue 3     │  │  Leaflet    │  │ Wavesurfer  │  │    Mini-Player      │ │
│  │  (Inertia)  │  │    Map      │  │   Player    │  │     (Pinia)         │ │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘ │
│         └─────────────────┴─────────────────┴────────────────────┘            │
│                                       │                                      │
│                           Inertia / XHR / WebSocket                         │
└───────────────────────────────────────┬─────────────────────────────────────┘
                                        │
┌───────────────────────────────────────┼─────────────────────────────────────┐
│                           LARAVEL 12 BACKEND                                 │
│  ┌────────────────────────────────────┼────────────────────────────────┐    │
│  │  HTTP Layer    │ Routes → Middleware → FormRequest → Controllers     │    │
│  │  Service Layer │ SoundService │ EchoService │ RadioService │ ...    │    │
│  │  Domain Layer  │ 80+ Models │ Policies │ Events │ Jobs │ Listeners  │    │
│  └────────────────┬───────────────────┬────────────────┬────────────────┘    │
│                   │                   │                │                      │
│  ┌────────────────┴──┐  ┌─────────────┴────┐  ┌──────┴──────┐  ┌──────────┐ │
│  │   PostgreSQL      │  │      Redis       │  │    R2 S3    │  │ OpenSearch│ │
│  │  (Data + PostGIS) │  │ (Cache/Queue/RT) │  │(Audio/Images)│  │  Search   │ │
│  └───────────────────┘  └──────────────────┘  └─────────────┘  └──────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
                                        │
┌───────────────────────────────────────┼─────────────────────────────────────┐
│                         SERVICES & WORKERS EXTERNES                          │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  ┌────────────┐ │
│  │ Python FastAPI │  │  CF Workers    │  │  Discord Bot   │  │  Radio     │ │
│  │Audio Analysis  │  │AI Agent / Proxy│  │  Node.js       │  │ Icecast+LS│ │
│  └────────────────┘  └────────────────┘  └────────────────┘  └────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

</div>

### Principes Architecturaux

- 🎯 **Single Responsibility** — Un service = un domaine métier (70+ services)
- 🔒 **Privacy by Design** — Coordonnées exactes jamais exposées via API publique
- 🛡️ **Defense in Depth** — Validation à tous les niveaux (Request → Policy → Service)
- 💰 **Transactions Atomiques** — Uploads DB + S3 rollback-safe
- 📜 **Journal Immuable** — ECHO : écriture unique, pas de modification/suppression
- ⚡ **Async First** — Tout traitement lourd passe par les queues Redis

<br>

---

## 🚀 Installation Rapide

### Option A — Docker (Recommandée)

```bash
# Cloner le monorepo
git clone https://github.com/bastienjavx/Arborisis.git
cd Arborisis

# Lancer l'installation complète
./scripts/setup-dev.sh
```

**Ce script démarre automatiquement :**
- 🐘 PostgreSQL 17 + PostGIS
- ⚡ Redis 7
- 🟣 Laravel (PHP-FPM + Nginx)
- 🟢 SSR Inertia
- 🔵 Laravel Reverb (WebSockets)
- 🟠 Queue Workers + Scheduler
- ⚫ Discord Bot (optionnel)

> L'application est accessible sur **http://localhost**

### Option B — Manuelle

```bash
# Prérequis : PHP 8.3+, PostgreSQL 16+, Redis 7+, Node.js 20+, Composer 2+
git clone https://github.com/bastienjavx/Arborisis.git
cd Arborisis/arborisis

composer install
npm install
cp .env.example .env
php artisan key:generate

# Configurer .env (DB, Redis, R2, Stripe...)
php artisan migrate --seed
npm run build
php artisan serve
```

<br>

---

## 📂 Structure du Monorepo

```
Arborisis/
├── 🟣 arborisis/                  # Application Laravel 12 + Vue 3 + Inertia
│   ├── app/
│   │   ├── Services/              # 70+ services métier
│   │   ├── Models/                # 80+ modèles Eloquent
│   │   ├── Jobs/                  # Traitements asynchrones
│   │   └── Enums/                 # Types métier PHP 8.3
│   ├── resources/js/
│   │   ├── Pages/                 # 45+ pages Inertia/Vue
│   │   ├── Components/            # Composants UI réutilisables
│   │   ├── Composables/           # Logique Vue partagée
│   │   └── Stores/                # Pinia (player, auth, UI)
│   └── tests/                     # Tests Feature + Unit (Pest)
│
├── ⚡ workers/                     # Cloudflare Workers (Edge)
│   ├── arborisis-ai-agent/        # Agent IA conversationnel
│   ├── audio-analysis-orchestrator/
│   ├── audio-analyzer-container/
│   └── r2-proxy/                  # Proxy sécurisé R2
│
├── 🐍 services/audio-analyzer/    # Microservice Python FastAPI
│
├── ⚫ discord-bot/                # Bot communautaire Node.js
│
├── 🐳 infrastructure/             # Docker, Radio, Wiki, Monitoring
│
├── 📚 docs/                       # Documentation, audits, guides
│
└── 🔧 scripts/                    # Setup, déploiement, sécurité
```

<br>

---

## 🧪 Tests & Qualité

<div align="center">

| Commande | Description |
|:---|:---|
| `php artisan test` | Tests complets (Pest/PHPUnit) |
| `php artisan test --coverage` | Avec rapport de couverture |
| `./vendor/bin/pint` | Linter PHP (Laravel Pint) |
| `npm run build` | Build production + vérification |
| `composer audit` | Audit sécurité dépendances PHP |
| `npm audit` | Audit sécurité dépendances Node |

</div>

<br>

---

## 📖 Documentation

| Document | Description |
|:---|:---|
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Architecture Laravel/Inertia de référence (661 lignes) |
| [`AGENTS.md`](AGENTS.md) | Conventions strictes pour contributeurs et agents IA |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Guide de contribution (Conventional Commits) |
| [`docs/development-workflow.md`](docs/development-workflow.md) | Workflow complet : branches, tests, CI/CD |
| [`docs/audio-analysis-pipeline.md`](docs/audio-analysis-pipeline.md) | Pipeline d'analyse audio |
| [`docs/deploiement-gitlab-vps.md`](docs/deploiement-gitlab-vps.md) | Déploiement GitLab → VPS |

<br>

---

## 🗺 Roadmap

<div align="center">

| Phase | Statut | Description |
|:---:|:---:|:---|
| ✅ Phase 1 | **Terminé** | Socle Laravel + Inertia/Vue + Design System |
| ✅ Phase 2 | **Terminé** | Upload audio + Stockage R2 + Métadonnées |
| ✅ Phase 3 | **Terminé** | Carte interactive (Leaflet) + Clustering |
| ✅ Phase 4 | **Terminé** | Système social (likes, favoris, commentaires, follows) |
| ✅ Phase 5 | **Terminé** | Système ECHO + Stripe Checkout |
| ✅ Phase 6 | **Terminé** | Panel admin (Filament) + Lecteur premium |
| ✅ Phase 7 | **Terminé** | PWA + Optimisations mobiles + Gamification |
| 🔄 Phase 8 | **En cours** | Radio IA + Analyse audio + Discord Bot |

</div>

<br>

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! Consultez [`CONTRIBUTING.md`](CONTRIBUTING.md) avant de proposer une PR.

- 🐛 **Bug** → [Issues GitHub](../../issues) (template Bug)
- 💡 **Feature** → [Issues GitHub](../../issues) (template Feature)
- 🔒 **Sécurité** → Contact privé (voir SECURITY.md)

<br>

---

## 📜 Licence

Ce projet est sous licence **MIT**. Voir le fichier [`LICENSE`](LICENSE) pour plus de détails.

<div align="center">

**ECHO n'est pas une cryptomonnaie. ECHO n'est pas un investissement.**

</div>

<br>

---

<div align="center">

<!-- Animated Footer Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:40916c,50:2d6a4f,100:1a4d2e&height=150&section=footer&text=%C3%89coutez%20la%20nature.&fontSize=30&fontColor=d8f3dc&animation=fadeIn&fontAlignY=65"/>

<br>

[![Star](https://img.shields.io/badge/⭐-Star%20this%20repo-ffb703?style=for-the-badge&labelColor=1a1a2e)](https://github.com/bastienjavx/Arborisis)
[![Follow](https://img.shields.io/badge/🌿-Follow%20%40arborisis-52B788?style=for-the-badge&labelColor=1a1a2e)](https://arborisis.com)

</div>
