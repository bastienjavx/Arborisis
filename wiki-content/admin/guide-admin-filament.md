# Guide Admin — Filament Dashboard

## Accès

Le panel d'administration est accessible sur `/admin`.

**Rôles avec accès** :
- `admin` — accès complet
- `moderator` — modération contenu, utilisateurs, tickets
- `creator` — accès limité (radio manager, ses propres contenus)

## Ressources CRUD

### Utilisateurs (`UserResource`)
- Liste, édition, suppression soft des comptes
- Voir le wallet ECHO, les donations, les points gamification
- Bannir / débannir
- Exporter les données RGPD (JSON)

### Sons (`SoundResource`)
- Modérer les uploads (approuver / rejeter)
- Voir les métadonnées complètes (coordonnées exactes incluses)
- Lancer une ré-analyse audio
- Supprimer un son (avec suppression des fichiers S3/R2)

### Catégories & Environnements
- Gérer la taxonomie des sons
- Ajouter de nouvelles catégories (ex: *Cavernnes*, *Urbain naturel*)
- Associer des icônes et descriptions

### Points Arborisis (`ArborisisPointResource`)
- Valider ou rejeter les points soumis par les utilisateurs
- Voir le score anti-triche des visites associées
- Marquer un point comme sensible (`NatureSensitivityLevel`)

### BirdNET Detections (`BirdnetDetectionResource`)
- Review les détections d'espèces par l'IA
- Valider / invalider manuellement
- Voir la confiance et les métadonnées audio

## Gamification

### Achievements (`AchievementResource`)
- CRUD des achievements
- Conditions d'unlock (JSON)
- Icônes et descriptions

### Médailles (`MedalResource`)
- CRUD des médailles avec niveaux de rareté
- Associer des conditions et récompenses

### Quêtes (`QuestResource`)
- Créer des quêtes quotidiennes/hebdomadaires
- Objectifs (visite X points, publier Y sons...)
- Récompenses (XP, médailles)

## Économie ECHO

### Wallets (`WalletResource`)
- Vue d'ensemble des soldes
- Créditer / débiter manuellement (avec raison obligatoire)

### Transactions (`EchoTransactionResource`)
- Ledger immuable — lecture seule
- Filtrer par type, date, utilisateur
- Export CSV pour comptabilité

## Signalements & Support

### Signalements (`ReportResource`)
- Traiter les signalements utilisateur
- Actions : ignorer, masquer contenu, avertir utilisateur, bannir
- Historique des décisions

### Tickets de Contact (`ContactTicketResource`)
- Répondre aux tickets support
- Assigner à un membre de l'équipe
- Marquer comme résolu

## Newsletter & Push

### Campagnes (`NewsletterCampaignResource`)
- Créer des campagnes email
- Preview avant envoi
- Statistiques d'ouverture/clic

### Envoi Newsletter (Page Custom)
- `/admin/send-newsletter` — composition riche (WYSIWYG)
- Sélection des segments (tous, actifs, créateurs...)

### Push Notifications (Page Custom)
- `/admin/send-push` — envoi de notifications Web Push
- Ciblage par rôle ou segment

## Discord

### Paramètres (`DiscordSettingResource`)
- Configurer le token du bot
- Activer/désactiver les notifications
- Canal de diffusion par défaut

### Liens Utilisateurs (`DiscordUserLinks` — Page Custom)
- Voir les comptes Discord liés
- Forcer un unlink si nécessaire

### Logs (`DiscordLogs` — Page Custom)
- Historique des commandes et événements du bot

## Radio Manager

Accessible sur `/admin/radio-manager` pour les rôles `admin` et `creator` autorisés :

### Programmation
- Créer des plannings horaires
- Associer des playlists à des créneaux

### Jingles
- Uploader des jingles (MP3, max 10 Mo)
- Définir les règles de placement

### Podcasts
- Lancer la génération d'une émission IA
- Review le script avant génération audio
- Programmer la diffusion

## Audit

Toutes les actions admin sont loguées dans `audit_logs` :
- Qui, quoi, quand, sur quelle ressource
- Non modifiable, conservé 2 ans
- Exportable pour audit externe

## Bonnes pratiques

1. **Jamais de modification directe en base** — toujours passer par Filament
2. **Transactions ECHO** — lecture seule, jamais de modification manuelle
3. **Coordonnées GPS** — ne les exposez que si nécessaire (signalements, modération)
4. **Soft deletes** — préférez le masquage à la suppression définitive
5. **Double validation** — pour les suppressions de compte ou de contenu massif
