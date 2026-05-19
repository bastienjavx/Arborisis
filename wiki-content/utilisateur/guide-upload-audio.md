# Guide d'Upload Audio

## Formats supportés

| Format | Extension | Max | Remarque |
|--------|-----------|-----|----------|
| MP3 | `.mp3` | 500 Mo | Recommandé pour le partage |
| WAV | `.wav` | 500 Mo | Qualité lossless |
| FLAC | `.flac` | 500 Mo | Compression lossless |
| M4A | `.m4a` | 500 Mo | AAC / ALAC |

## Avant l'upload

1. **Préparez vos métadonnées** :
   - Titre descriptif (ex: *"Aube dans la forêt de Fontainebleau — avril 2026"*)
   - Description détaillée (contexte, matériel, conditions)
   - Équipement utilisé (micro, recorder, windscreen)
   - Licence choisie (CC BY, CC BY-SA, CC BY-NC, etc.)

2. **Géolocalisation** :
   - Les coordonnées GPS exactes sont **floutées automatiquement** pour la protection des sites sensibles
   - Vous pouvez marquer un enregistrement comme sensible (`NatureSensitivityLevel::Fragile`) pour un floutage renforcé
   - Les coordonnées approximatives sont obligatoires pour l'affichage carte

3. **Cover image** (optionnelle) :
   - Format JPG/PNG, max 5 Mo
   - Recommandée : photo du lieu de recording

## Pendant l'upload

1. Rendez-vous sur `/sounds/create` ou cliquez sur **Publier** dans le menu
2. Glissez-déposez votre fichier audio ou cliquez pour sélectionner
3. Remplissez le formulaire (titre, description, catégories, tags, environnement)
4. Ajoutez une cover image si disponible
5. Vérifiez la position sur la carte (ajustez si nécessaire)
6. Soumettez

## Après l'upload

- Le son passe en statut `pending` puis `published` après validation automatique
- L'analyse audio asynchrone se lance automatiquement :
  - Extraction des features acoustiques (durée, LUFS, centroid spectral...)
  - Génération du waveform et des spectrogrammes
  - Détection d'espèces via BirdNET
- Vous recevrez une notification quand l'analyse est terminée
- Vous pouvez soumettre l'enregistrement à Xeno-Canto depuis la page du son

## Conseils de recording

- Enregistrez au moins en **48 kHz / 24 bit** pour la qualité scientifique
- Laissez un **marge de silence** de 2-3 secondes au début et à la fin
- Notez les conditions météo, la saison et l'heure dans la description
- Utilisez des tags précis (ex: `dawn-chorus`, `river`, `insects`, `rain`)

## Limites

- Maximum **500 Mo** par fichier
- Maximum **20 uploads par jour** pour les nouveaux utilisateurs
- Les sons avec un score anti-spam élevé peuvent être modérés manuellement
