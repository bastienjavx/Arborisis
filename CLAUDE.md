# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**Arborisis** is a premium social platform for nature field recording. Users upload nature sound recordings with GPS coordinates, explore them on an interactive map, and support creators via the **ECHO** internal credits system. Key constraints: exact GPS coordinates are *never* exposed publicly; ECHO transactions must be strictly atomic and immutable.

The Laravel app lives in `<redacted>/`. All commands below run from that directory.

---

## Common Commands

```bash
# Development
npm run dev           # Vite dev server (frontend hot-reload)
php artisan serve     # Laravel dev server

# Build
npm run build         # Vite production build (includes SSR build)

# Tests (use Pest — runs in-memory SQLite)
php artisan test                          # all tests
php artisan test --filter=SoundUploadTest # single test class
php artisan test tests/Feature/Gamification/  # directory

# Linting
./vendor/bin/pint     # PHP auto-formatter (Laravel Pint)

# Queue worker
php artisan queue:work
php artisan queue:work --queue=discord    # Discord notification queue

# Artisan
php artisan migrate --seed
php artisan tinker
```

---

## Architecture

### Stack
- **Backend**: Laravel 12 / PHP 8.3+ · PostgreSQL 16+ (PostGIS) · Redis (cache, sessions, queues, rate limiting)
- **Frontend**: Vue 3 (Composition API) + Inertia.js (no separate REST API for pages) · Tailwind CSS 4 · Pinia · Leaflet · Wavesurfer.js
- **Storage**: Contabo S3 (AWS-compatible) for audio files and images; Cloudflare R2 for analysis outputs via a `r2-proxy` Cloudflare Worker
- **Admin**: Filament 3 panel
- **External services**: Stripe (ECHO credit purchases), ElevenLabs (radio DJ voice), OpenAI/Gemini (radio content generation)

### Request flow (Inertia pages)
`Browser → Inertia XHR → Laravel Route → Controller → Service → Eloquent Model → PostgreSQL/Redis/S3`

Controllers are thin; all domain logic lives in **Services** (`app/Services/`). Form Requests handle validation; Policies handle authorization.

### Key domains

| Domain | Services location | Notes |
|---|---|---|
| Gamification | `Services/Gamification/` | ArborisisPoints (nature waypoints), XP, quests, achievements, medals, streaks, anti-cheat, geo-validation |
| Radio | `Services/Radio/` | Icecast-based streaming, AI DJ announcements (ElevenLabs), jingles, schedule, podcast generation |
| Audio Analysis | `Services/AudioAnalysis/` | Orchestrates Python pipeline (librosa/scipy), stores results in R2 via `r2-proxy` worker |
| ECHO | `Services/Echo/` (planned), `Models/Wallet.php`, `Models/EchoTransaction.php` | Internal credit system — never a financial instrument; 70% creator / 20% infra / 10% community fund |
| Sound | `Services/Sound/` | Upload (DB + S3 transactional), waveform, location privacy |
| Discord Bot | `discord-bot/` (Node.js) | Communicates with Laravel via internal API (`DISCORD_INTERNAL_API_TOKEN`); queue `discord` |

### Gamification pattern (strict)
`Controller → FormRequest → Service → Model → Event → Listener`

Anti-cheat enforced via Redis cooldowns, daily check-in limits, and impossible-speed detection. All new ArborisisPoints are created with `pending` status and require moderation before becoming visible.

### Audio Analysis pipeline
1. Laravel `RequestAudioAnalysis` job → calls Python CLI (`python/cli.py`) via `PythonRunnerService`
2. Python extracts features (librosa, scipy) + generates spectrograms/visualizations
3. Results POSTed back to Laravel callback endpoint → stored in R2 via Cloudflare Worker (`workers/r2-proxy`)
4. `SoundAnalysis`/`SoundVisualization` models track analysis status

### Infrastructure components (outside `<redacted>/`)
- `workers/r2-proxy/` — Cloudflare Worker: proxies audio analysis results to Cloudflare R2
- `workers/audio-analysis-orchestrator/` — Cloudflare Worker: distributes analysis jobs across multiple VPS instances
- `infrastructure/radio/` — Icecast server config
- `infrastructure/audio-analyzer-worker/` — Load-balanced audio analyzer config for VPS
- `infrastructure/uptime-kuma/` — Monitoring

### Internal API authentication
- Radio endpoints: `VerifyRadioInternalToken` middleware
- Discord bot endpoints: `AuthenticateInternalBot` middleware (token `DISCORD_INTERNAL_API_TOKEN`)
- Audio analysis callbacks: `InternalAudioAnalysisController`

---

## Code Conventions

- `declare(strict_types=1)` at the top of every PHP file
- PHP enums for all statuses, roles, categories — see `app/Enums/`
- Form Requests for all incoming validation; Policies for all authorization
- `decimal(10,2)` for all monetary/ECHO amounts — never `float`
- `DB::transaction()` wrapping any ECHO transaction or upload operation
- Soft deletes on user-owned data
- Exact GPS coordinates (`exact_latitude`/`exact_longitude`) never returned in public API — use `approximate_latitude`/`approximate_longitude`
- `NatureSensitivityLevel::Fragile` or higher triggers automatic coordinate blurring

---

## Testing

Tests use **Pest** with in-memory SQLite (configured in `phpunit.xml`). Feature tests live in `tests/Feature/` grouped by domain (e.g., `tests/Feature/Gamification/`). Run a single file: `php artisan test tests/Feature/Gamification/ArborisisPointTest.php`.

---

## Commit Conventions (Conventional Commits)

```
feat(map): add region clustering
fix(echo): prevent race condition on transactions
refactor(sound): extract validation to Form Request
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

---

## Python Audio Module

Located at `<redacted>/python/`. Requires Python 3.10+ and `ffmpeg`.

```bash
cd <redacted>/python
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python cli.py <audio-file>
```
