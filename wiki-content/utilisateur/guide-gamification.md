# Guide Gamification — Explorer la Nature

## Philosophie

La gamification d'Arborisis n'est pas une compétition. C'est une invitation à explorer, observer et respecter la nature. Pas de dark patterns, pas de notifications agressives, pas de FOMO.

## Arborisis Points

Les **Arborisis Points** sont des points d'intérêt naturels créés par la communauté :
- Cascades, clairières, points d'écoute remarquables
- Toute soumission passe en statut `pending` avant modération
- Seuls les points `approved` sont visibles publiquement

### Créer un point

1. Sur `/<redacted>-map`, cliquez sur **Créer un point**
2. Positionnez sur la carte (coordonnées approximatives obligatoires)
3. Renseignez : nom, description, catégorie, sensibilité écologique
4. Soumettez — le point est en attente de validation

### Visiter un point (Check-in)

1. Rendez-vous physiquement à proximité du point (rayon de 100m par défaut)
2. Sur `/<redacted>-map`, sélectionnez le point et cliquez sur **Visiter**
3. Votre position GPS est vérifiée côté serveur
4. Si validé : +10 XP, +1 streak

### Anti-triche

- **Cooldown** : impossible de visiter le même point avant 24h
- **Limite journalière** : 20 visites max par jour
- **Détection de vitesse** : si vous semblez vous déplacer à plus de 200 km/h entre deux visites, un score de confiance bas est attribué
- **Score anti-triche** : chaque visite reçoit un score de 0 à 1. Les scores suspects sont marqués pour revue

## XP et Niveaux

**Formule** : `niveau = floor(sqrt(xp / 100)) + 1`

| Action | XP |
|--------|-----|
| Visiter un point | +10 |
| Créer un point (validé) | +50 |
| Publier un son | +30 |
| Signalement valide | +15 |

- **Plafond quotidien** : 500 XP max par jour
- Les XP sont audités dans la table `xp_events`

## Quêtes

Quêtes quotidiennes et hebdomadaires générées automatiquement :
- *"Visite 3 points de la catégorie Forêt"*
- *"Publie un enregistrement d'au moins 5 minutes"*
- *"Découvre un point créé par un autre utilisateur"*

Les récompenses incluent XP, médailles et achievements.

## Achievements et Médailles

| Catégorie | Exemples |
|-----------|----------|
| Exploration | *Première Visite*, *Explorateur de l'Aube*, *Marcheur Nocturne* |
| Création | *Premier Son*, *Maître du Field Recording*, *Naturaliste* |
| Social | *Bienfaiteur* (don ECHO), *Rapporteur vigilant* |
| Consistance | *Streak de 7 jours*, *Streak de 30 jours* |

Les médailles ont des niveaux de rareté : `common`, `rare`, `epic`, `legendary`.

## Présence Temps Réel

- Optionnelle, **invisible par défaut**
- Votre position est **approximée à ~100m** (grille)
- Expire automatiquement après 15 minutes d'inactivité
- Modes de visibilité :
  - `invisible` — personne ne vous voit
  - `friends_only` — visible par vos amis uniquement
  - `public_zone` — visible par tous dans la zone

## Interactions à Proximité

Quand un autre enregistreur est à moins de 200m :
- **Saluer** — notification amicale
- **Partager un conseil** — envoyer un message contextuel
- **Inviter à un événement** — proposer un enregistrement de groupe

## Événements de Groupe

- **Dawn Chorus** — lever du jour collectif
- **Soundwalk** — balade sonore guidée
- **Night Ambience** — session nocturne
- **Freestyle** — session libre

Rejoignez, check-in sur place, et gagnez des bonus XP.

## Streaks

- Un **streak** = nombre de jours consécutifs avec au moins une activité (visite ou publication)
- Le streak actuel et le record sont affichés sur le dashboard
- Perdu si aucune activité pendant 48h

## Confidentialité Géographique

- Vos coordonnées **exactes** ne sont jamais exposées publiquement
- Les positions affichées sont toujours approximatives
- Vous pouvez révoquer votre consentement géolocalisation à tout moment dans `/profile`
- Les positions historiques exactes ne sont conservées que pour la session de check-in en cours
