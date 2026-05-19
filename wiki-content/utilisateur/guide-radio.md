# Guide Radio Arborisis

## Présentation

La Radio Arborisis est un stream musical continu dédié aux paysages sonores naturels. Il s'agit d'une expérience d'écoute immersive combinant :
- Une playlist aléatoire quotidienne déterministe (même séquence pour tous)
- Des **DJ IA** générant des annonces contextuelles
- Des **jingles** programmés (horaires, inter-titres, transitions)
- Des **podcasts** et émissions générées automatiquement

## Comment écouter

### Web
Rendez-vous sur `/radio`. Le lecteur se lance automatiquement avec :
- Visualiseur audio Web Audio API (spectrum / waveform / bloom)
- Métadonnées temps réel (titre, artiste, artwork)
- Compteur d'auditeurs en direct
- Réactions emoji

### Flux direct
Téléchargez le fichier `.m3u` sur `/radio/stream.m3u` pour l'écouter dans VLC, iTunes, ou tout lecteur compatible Icecast.

URL du stream : `https://radio.arborisis.com/stream` (exemple)

## Canaux

Plusieurs canaux thématiques peuvent être disponibles :
- **Canal principal** — mix généraliste
- **Canal Forêt** — ambiances forestières
- **Canal Eau** — rivières, cascades, pluie
- **Canal Nuit** — ambiances nocturnes

Accédez via `/radio/c/{slug}`.

## Programmes

La grille des programmes est accessible sur `/radio/shows` :
- **Émissions** — podcasts longs (15-30 min) sur un thème nature
- **Flashes** — actualités courtes (2-3 min)
- **Sessions live** — enregistrements en direct programmés

## DJ IA

Les animateurs sont générés par IA :
- **Scripts** : OpenRouter (LLM) écrit des transitions contextuelles entre les morceaux
- **Voix** : ElevenLabs transforme les scripts en audio TTS
- **Personnalités** : Plusieurs voix/personnalités disponibles (calme, poétique, scientifique)

Les annonces incluent :
- Présentation du morceau suivant
- Faits自然 sur l'espèce ou l'environnement
- Invitations à explorer des points Arborisis proches

## Jingles

| Type | Fréquence | Description |
|------|-----------|-------------|
| Idents | Toutes les 30 min | "Vous écoutez Arborisis Radio" |
| Transitions | Entre morceaux | Pont musical court |
| Horloge | À l'heure juste | Annonce de l'heure |
| Spéciaux | Événements | Messages pour Dawn Chorus, sessions live... |

## Réactions

Pendant l'écoute, envoyez des réactions emoji qui apparaissent en temps réel pour tous les auditeurs.

## Statistiques

- **Sessions d'écoute** : durée, canal, heure
- **Top morceaux** : les plus écoutés sur la radio
- **Pic d'audience** : heures les plus actives

## Radio Manager

Les créateurs autorisés accèdent à `/admin/radio-manager` pour :
- Programmer des playlists
- Uploader des jingles
- Configurer les personnalités DJ
- Consulter les statistiques d'audience
