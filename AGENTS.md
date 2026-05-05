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

## ECHO (crédits internes)
- ECHO n'est PAS une cryptomonnaie
- ECHO n'est PAS un investissement
- Transactions atomiques uniquement
- Journal immuable (pas de modification/suppression)
- Répartition : 70% créateur, 20% infra, 10% fonds communautaire
