# AGENTS.md - Arborisis

> Source officielle des regles pour tous les agents IA et contributeurs automatises travaillant sur Arborisis.
> Le guide long reste disponible dans `docs/agents/full-agent-guide.md`, mais ce fichier fait autorite pour les decisions courantes.

## 1. Mission du projet

Arborisis est une plateforme sociale premium de field recording dediee aux sons de la nature. Le produit doit rester stable, maintenable, calme, privacy-first et securise.

Priorites absolues :

- Proteger les lieux naturels sensibles et ne jamais exposer de coordonnees GPS exactes publiquement.
- Preserver une experience premium, sobre, accessible et respectueuse des utilisateurs.
- Garder une architecture Laravel/Vue claire, testable et evolutive.
- Proteger les flux critiques : upload audio, stockage S3/R2, ECHO, Stripe, moderation, gamification, Discord et analyse audio.

Stack cible :

- Backend : Laravel 12.x, PHP 8.3+, PostgreSQL 16+, PostGIS, Redis, Cashier/Stripe, Filament.
- Frontend : Vue 3, Inertia.js, Tailwind CSS, shadcn-vue, Leaflet, Wavesurfer.js, Pinia.
- Infra : object storage compatible S3/R2, queues/workers, services audio, GitHub Actions et GitLab CI existante.

## 2. Regles generales non negociables

- Ne jamais commiter directement sur `main`.
- Ne jamais supprimer du code sans justification explicite dans la PR.
- Ne jamais modifier l'architecture sans documenter la decision dans `ARCHITECTURE.md`, `docs/` ou la PR.
- Ne jamais exposer `exact_latitude`, `exact_longitude` ou une position precise dans une API publique, un payload Inertia public ou un log.
- Ne jamais ajouter de dependance sans expliquer son besoin, son impact securite et son cout de maintenance.
- Ne jamais mettre de secret, token, cle API, dump `.env`, cle SSH ou credential dans le depot.
- Ne jamais desactiver, supprimer ou affaiblir un test pour faire passer la CI.
- Ne jamais generer de gros fichiers inutiles, artefacts buildes, caches, logs ou exports binaires non demandes.
- Ne jamais casser l'experience utilisateur existante sans migration UX claire.
- Ne jamais modifier des fichiers de production, de deploiement ou de securite sans comprendre l'impact.
- Ne jamais masquer une erreur CI avec `|| true` sauf justification documentee et comportement non critique.

## 3. Workflow obligatoire pour agents IA

Avant de coder, chaque agent doit :

1. Lire la demande et reformuler l'objectif.
2. Identifier les fichiers et domaines concernes.
3. Lire les fichiers existants avant modification.
4. Verifier les regles dans ce fichier.
5. Resumer le plan d'action et les risques principaux si le changement est significatif.

Pendant le travail :

1. Appliquer la plus petite modification utile.
2. Respecter les patterns existants du repo.
3. Ajouter ou adapter les tests proportionnellement au risque.
4. Eviter les refactors opportunistes non demandes.
5. Ne pas toucher aux changements utilisateur sans raison directe.

Avant de rendre :

1. Lancer les verifications locales pertinentes.
2. Lister ce qui a ete teste et ce qui ne l'a pas ete.
3. Fournir un resume clair des fichiers modifies.
4. Signaler les risques residuels et suites recommandees.

## 4. Branches

- `main` : production stable.
- `develop` : integration.
- `feature/nom-court` : nouvelle fonctionnalite.
- `fix/nom-court` : correction de bug.
- `refactor/nom-court` : refactor controle.
- `chore/nom-court` : maintenance.
- `docs/nom-court` : documentation.
- `security/nom-court` : correction securite.
- `hotfix/nom-court` : correction urgente production.

Les branches doivent rester courtes, comprehensibles et liees a une seule intention.

## 5. Commits

Utiliser Conventional Commits :

- `feat:` nouvelle fonctionnalite.
- `fix:` correction de bug.
- `refactor:` refactor sans changement fonctionnel.
- `docs:` documentation.
- `test:` tests.
- `chore:` maintenance.
- `ci:` CI/CD.
- `perf:` performance.
- `security:` securite.

Exemples :

```text
feat(audio): add waveform generation job
fix(map): hide exact GPS coordinates from public payload
ci(github): add laravel test workflow
security(upload): validate audio MIME type strictly
```

## 6. Pull Requests

Chaque PR doit contenir :

- Objectif.
- Changements.
- Fichiers principaux modifies.
- Tests effectues.
- Risques.
- Captures ou video si UI.
- Checklist securite.
- Checklist privacy.
- Checklist performance.

Une PR ne doit pas melanger fonctionnalite, refactor massif et changement infra sauf decision explicite.

## 7. Regles Laravel

- Utiliser des Form Requests pour toute validation entrante.
- Utiliser des Policies/Gates pour les autorisations.
- Garder les controllers fins : orchestration HTTP uniquement.
- Mettre la logique metier dans `app/Services/`.
- Utiliser des Jobs/Queues pour les traitements longs : audio, analyse, notifications, radio, Discord.
- Utiliser des transactions DB pour les operations critiques : ECHO, upload, moderation, paiements, webhooks.
- Ne jamais faire confiance aux donnees client.
- Utiliser des Enums pour les statuts, roles, categories metier et raisons.
- Ajouter des tests Feature pour les endpoints importants.
- Ajouter des tests Unit pour les services critiques.
- Respecter `declare(strict_types=1)` quand un fichier PHP applicatif est cree ou fortement modifie.
- Nommer les contraintes DB et indexer les colonnes filtrees frequemment.
- Utiliser `decimal(10,2)` pour les montants ; jamais de float pour l'argent ou ECHO.
- Utiliser JSONB pour les donnees flexibles quand PostgreSQL est cible.

## 8. Regles Vue/Inertia

- Utiliser Vue 3 Composition API.
- Preferer TypeScript pour les types critiques et contrats complexes.
- Creer des composants reutilisables dans `resources/js/Components/`.
- Mettre la logique reutilisable dans `resources/js/Composables/`.
- Utiliser Pinia pour l'etat global durable, notamment le mini-player audio.
- Ne pas melanger logique metier lourde et UI.
- Respecter le design system Arborisis : premium, calme, lisible, accessible.
- Verifier mobile, clavier, focus, contrastes et etats de chargement/erreur.
- Ne pas laisser `console.log`, `debugger` ou traces temporaires dans le code final.

## 9. Securite applicative

- Aucun secret dans Git.
- `.env.example` doit contenir uniquement des placeholders.
- Valider strictement MIME, extension, taille et duree des uploads audio/image.
- Proteger les endpoints sensibles par auth, policies, middleware et rate limiting.
- Verifier la signature des webhooks Stripe.
- Verifier les permissions S3/R2 et ne jamais exposer de cle cote client.
- Ne pas logger de secrets, tokens OAuth, coordonnees exactes ou donnees sensibles.
- Ajouter des logs d'audit pour les actions admin et operations sensibles.
- Executer `composer audit` et `npm audit` dans la CI.
- Utiliser des URLs temporaires pour les fichiers prives.
- Nettoyer les fichiers orphelins lors des echecs transactionnels.

## 10. Privacy Arborisis

- Les coordonnees GPS exactes sont reservees au strict besoin serveur/admin.
- Toute carte publique doit utiliser des coordonnees approximees.
- Les lieux sensibles doivent etre automatiquement approximates selon `NatureSensitivityLevel::Fragile` ou superieur.
- Toute fonctionnalite carte, presence ou check-in doit passer par une verification privacy.
- Les metadonnees sensibles doivent etre filtrees avant exposition publique.
- Les donnees utilisateur doivent etre minimisees, exportables et supprimables conformement au RGPD.
- La presence temps reel est optionnelle, approximative, invisible par defaut et expire automatiquement.
- Les positions historiques exactes ne doivent pas etre conservees au-dela du besoin de session/check-in.

## 11. Tests obligatoires

Pour chaque changement, adapter le niveau de tests au risque :

- Backend critique : tests Feature ou Unit Pest/PHPUnit.
- Service metier : tests Unit.
- Endpoint public : test Feature avec auth/authorization si necessaire.
- Privacy GPS : test verifiant l'absence de coordonnees exactes dans le payload public.
- UI critique : build frontend et verification responsive manuelle si possible.
- CI/CD : validation syntaxe YAML et execution locale des commandes equivalentes.

Commandes de base depuis `arborisis/` :

```bash
composer validate --strict
./vendor/bin/pint --test
php artisan test
npm run build
```

Si disponibles dans le projet :

```bash
npm run lint
npm run typecheck
./vendor/bin/phpstan analyse
```

Ne jamais merger si les tests critiques echouent.

## 12. CI/CD

GitHub Actions est prioritaire pour les nouvelles PR GitHub. La CI GitLab existante reste conservee tant qu'elle est utile au deploiement ou a l'historique.

Les workflows GitHub doivent :

- Se declencher sur PR vers `main` et `develop`.
- Tester backend, frontend, audits securite et garde-fous d'architecture.
- Utiliser des dependances verrouillees : `composer.lock`, `package-lock.json`, `npm ci`.
- Ne jamais afficher `.env` ou secrets.
- Echouer clairement sur erreurs critiques.
- Ne pas masquer les erreurs avec `|| true` sans justification.

Le deploiement production doit :

- Etre manuel via `workflow_dispatch`.
- Etre limite a `main`.
- Utiliser l'environnement GitHub `production` avec protection.
- Utiliser uniquement des secrets GitHub.
- Deployer par release atomique ou mecanisme equivalent.
- Redemarrer les queues apres migration/cache.
- Prevoir une procedure de rollback documentee.

## 13. Documentation

Mettre a jour lorsque necessaire :

- `README.md`
- `ARCHITECTURE.md`
- `CONTRIBUTING.md`
- `TASKS.md`
- `docs/`
- changelog ou notes de release si changement important.

Les decisions d'architecture significatives doivent etre documentees avant merge.

## 14. Discord Bot

- Le bot Node.js reste separe dans `arborisis/discord-bot/`.
- Il communique avec Laravel via API interne securisee par `DISCORD_INTERNAL_API_TOKEN`.
- Utiliser une queue dediee `discord` pour les notifications asynchrones.
- OAuth Discord via `laravel/socialite` avec fallback `/link` par code temporaire.
- Tokens OAuth chiffres en base avec cast `encrypted:`.
- Intents minimaux : `Guilds`, `GuildMembers`, `GuildMessages`, `DirectMessages`.
- Dashboard admin Filament : groupe `Discord` pour parametres, liens utilisateurs et logs.

## 15. Gamification

### Geolocalisation et confidentialite

- `exact_latitude` / `exact_longitude` : jamais exposes publiquement, reserves admin/serveur.
- `approximate_latitude` / `approximate_longitude` : obligatoires pour carte/API publique.
- Floutage automatique selon sensibilite nature.
- Consentement geolocalisation stocke en base et revocable immediatement.

### Anti-cheat et moderation

- Cooldown par point via Redis.
- Limite de check-ins par jour et par utilisateur.
- Detection de vitesse impossible entre deux visites.
- Score de confiance `anti_cheat_score` sur chaque visite.
- Points crees par utilisateur en `pending` avant publication.
- Seuls les points `approved` sont visibles publiquement.

### Architecture

- Pattern strict : Controller -> FormRequest -> Service -> Model -> Event -> Listener.
- Services metier : `GeoValidationService`, `AntiCheatService`, `QuestService`, `AchievementService`, `XpService`, `MedalService`.
- Events : `ArborisisPointVisited`, `QuestCompleted`, `AchievementUnlocked`, `MedalUnlocked`, `XpGained`.
- Jobs asynchrones : generation de quetes, nettoyage presence, recalcul niveaux.

## 16. ECHO

- ECHO n'est pas une cryptomonnaie.
- ECHO n'est pas un investissement.
- Transactions atomiques uniquement.
- Journal immuable : pas de modification/suppression.
- Repartition : 70% createur, 20% infra, 10% fonds communautaire.
- XP et recompenses gamification ne sont pas de la monnaie.
- Les dons ECHO restent independants de la progression utilisateur.
