# Guide Chat & Social

## Interactions Sociales

### Likes
- Likez n'importe quel son en cliquant sur le cœur
- Le compteur se met à jour en temps réel (optimistic UI)
- Vos likes sont visibles sur votre profil

### Commentaires
- Commentaires imbriqués (réponses possibles)
- Format Markdown supporté
- Les commentaires supprimés sont soft-deleted ("Ce commentaire a été supprimé")
- Signalez les commentaires inappropriés via le bouton 🚩

### Follow / Amis
- **Follow** : relation asymétrique. Suivez un créateur pour voir ses nouveaux sons dans votre feed.
- **Amis** : relation mutuelle (vous vous suivez mutuellement). Les amis peuvent :
  - Voir votre présence sur la carte (si mode `friends_only`)
  - Vous envoyer des messages privés

### Signalement
Signalez du contenu inapproprié (sons, commentaires, profils, points) avec une raison :
- Spam / contenu promotionnel
- Contenu offensant
- Droits d'auteur violés
- Informations personnelles
- Contenu trompeur

## Chat Public — Salles

### Rejoindre une salle
1. Allez sur `/chat`
2. La liste des salles publiques apparaît dans la sidebar
3. Cliquez sur une salle pour rejoindre

### Créer une salle
1. Cliquez sur **Nouvelle salle**
2. Nommez-la et ajoutez une description
3. Choisissez les paramètres :
   - Publique (tout le monde peut rejoindre)
   - Modérée (le créateur peut bannir)

### Modération de salle
En tant que créateur d'une salle, vous pouvez :
- Bannir un utilisateur (il ne peut plus rejoindre)
- Débannir un utilisateur
- Les modérateurs globaux peuvent aussi intervenir

### Messages temps réel
- Les messages sont diffusés via Laravel Reverb (WebSocket)
- Indicateur "en ligne" pour les participants actifs
- Les messages sont persistés en base

## Messages Privés

1. Sur `/chat`, cliquez sur **Nouvelle conversation**
2. Recherchez un utilisateur par nom ou email
3. Envoyez un message — la conversation est privée et chiffrée en transit (HTTPS/TLS)

**Note** : Les messages privés ne sont pas chiffrés de bout en bout côté serveur. L'équipe technique peut y accéder en cas de signalement légal.

## Notifications

Vous recevez des notifications pour :
- Nouveau like sur votre son
- Nouveau commentaire (ou réponse)
- Nouveau follower
- Don ECHO reçu
- Mention dans un chat
- Quête complétée / Achievement débloqué
- Analyse audio terminée

Gérez vos préférences dans `/profile/notifications`.

## Règles de la communauté

1. **Respect** — Traitez tous les membres avec bienveillance
2. **Contenu** — Partagez uniquement des enregistrements dont vous détenez les droits
3. **Confidentialité** — Ne partagez jamais de coordonnées GPS exactes dans le chat
4. **Nature** — Ne publiez pas de contenu nuisible à la faune ou la flore
5. **Pas de spam** — Pas de promotion commerciale non sollicitée

Les infractions peuvent entraîner un avertissement, une suspension temporaire, ou un bannissement définitif.
