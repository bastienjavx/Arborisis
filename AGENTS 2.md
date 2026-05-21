# AGENTS.md — Arborisis

## Contexte
Arborisis est une plateforme sociale premium de field recording dédiée aux sons de la nature. Stack : Laravel 12 + Inertia.js + Vue 3 + Tailwind CSS + PostgreSQL + Redis + Contabo S3 + Stripe.

## Conventions de code
- PHP 8.3+ avec typage strict (declare(strict_types=1))
- Enums PHP pour tous les statuts et rôles
- Form Requests pour toute validation entrante
- Policies Laravel pour les autorisations
- Services pour la logique métier (pas dans les controllers)
- Eloquent avec relations typées
- Soft deletes sur les données utilisateur
- Transactions DB pour toute opération sensible (ECHO, upload)

## Frontend
- Vue 3 Composition API
- TypeScript recommandé pour les types critiques
- Tailwind CSS avec palette personnalisée Arborisis
- Composants réutilisables dans resources/js/Components/
- Composables dans resources/js/Composables/
- Pinia pour l'état global (mini-player audio)

## Sécurité
- Jamais exposer de clés S3 côté client
- Coordonnées GPS exactes jamais en API publique
- Validation MIME stricte pour les uploads
- Rate limiting sur les routes sensibles
- Vérification signature webhook Stripe
- Logs d'audit pour toute action admin

## Base de données
- PostgreSQL avec PostGIS recommandé
- Clés étrangères nommées et contraintes
- Index sur les colonnes filtrées fréquemment
- Decimal(10,2) pour tous les montants (pas de float)
- JSONB pour les données flexibles (métadonnées, social links)

## Stockage
- Driver S3 Laravel pour Contabo
- URLs temporaires pour fichiers privés
- Disque local pour le développement
- Nettoyage des fichiers orphelins

## Discord Bot
- Bot Node.js séparé dans `discord-bot/`, communiquant avec Laravel via API interne sécurisée (token `DISCORD_INTERNAL_API_TOKEN`)
- Queue dédiée `discord` pour toutes les notifications asynchrones
- OAuth Discord via `laravel/socialite` + fallback `/link` avec code temporaire
- Tokens OAuth chiffrés en base (`encrypted:` cast)
- Intents minimaux : `Guilds`, `GuildMembers`, `GuildMessages`, `DirectMessages`
- Dashboard admin Filament : groupe de navigation `Discord` (Paramètres, Liens utilisateurs, Logs)

## Gamification

### Géolocalisation & confidentialité
- `exact_latitude` / `exact_longitude` : jamais exposés en API publique, réservés admin.
- `approximate_latitude` / `approximate_longitude` : obligatoires pour tout affichage carte/API.
- Floutage automatique selon `NatureSensitivityLevel::Fragile` ou supérieur.
- Consentement géolocalisation stocké en base (`geo_consent_given_at`) et révocable immédiatement.
- Positions historiques exactes utilisateur jamais conservées au-delà de la session de check-in.

### Anti-cheat & modération
- Cooldown par point via Redis (durée configurable).
- Limite de check-ins par jour et par utilisateur.
- Détection de vitesse impossible entre deux visites.
- Score de confiance (`anti_cheat_score`) sur chaque visite.
- Points créés par utilisateur passent systématiquement en `pending` avant publication.
- Modération obligatoire : seuls les points `approved` sont visibles publiquement.

### Architecture gamification
- Pattern strict : Controller → FormRequest → Service → Model → Event → Listener.
- Enums pour tous les statuts, catégories, niveaux, raisons.
- Services métier : `GeoValidationService`, `AntiCheatService`, `QuestService`, `AchievementService`, `XpService`, `MedalService`.
- Events : `ArborisisPointVisited`, `QuestCompleted`, `AchievementUnlocked`, `MedalUnlocked`, `XpGained`.
- Jobs asynchrones : génération quêtes, nettoyage présence, recalcule niveaux.

### UX & éthique
- Pas de dark patterns, pas de notifications agressives, pas de FOMO.
- Progression douce, récompenses poétiques, badges élégants.
- Textes orientés exploration et respect de la nature.
- Présence temps réel optionnelle, invisible par défaut, toujours approximée.

### RGPD
- Suppression compte = suppression données gamification (anonymisation si données liées à contenu public).
- Export JSON des données utilisateur disponible.
- Présence temps réel expirante automatiquement (pas de stockage long terme).

## ECHO (crédits internes)
- ECHO n'est PAS une cryptomonnaie
- ECHO n'est PAS un investissement
- Transactions atomiques uniquement
- Journal immuable (pas de modification/suppression)
- Répartition : 70% créateur, 20% infra, 10% fonds communautaire
- **Gamification** : XP et récompenses gamification ne sont PAS de la monnaie. Les dons ECHO restent indépendants de la progression utilisateur.
