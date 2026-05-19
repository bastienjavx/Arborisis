# Wiki Arborisis — Contenu Source

Ce dossier contient la documentation source au format Markdown, prête à être importée dans Wiki.js.

## Structure

```
wiki-content/
  accueil/
    home.md                          # Page d'accueil du wiki
  utilisateur/
    guide-upload-audio.md            # Guide d'upload audio
    guide-echo.md                    # Guide ECHO / crédits
    guide-gamification.md            # Guide gamification
    guide-radio.md                   # Guide radio
    guide-chat-social.md             # Guide chat & social
  developpeur/
    guide-onboarding.md              # Onboarding nouveau dev
    sso-wiki-js.md                   # Documentation SSO OAuth2
  admin/
    guide-admin-filament.md          # Guide admin Filament
  reference/
    (importé depuis les fichiers existants)
```

## Import dans Wiki.js

### Prérequis
- Wiki.js doit être en cours d'exécution
- Un compte admin avec un token API doit être créé

### Commande

```bash
# Mode preview (sans import)
WIKI_API_URL=http://localhost:3000/graphql node scripts/import-docs-to-wiki.js --dry-run

# Import réel
WIKI_API_URL=http://localhost:3000/graphql \
WIKI_API_TOKEN=votre-token-api \
node scripts/import-docs-to-wiki.js
```

Le token API se génère dans l'admin Wiki.js : **Administration → API → Générer un token**.

## Mise à jour du contenu

1. Modifier les fichiers `.md` dans ce dossier
2. Commit & push sur Git
3. Relancer le script d'import (ou attendre la CI/CD si automatisé)

## Édition directe

Une fois importé, le contenu peut aussi être édité directement dans Wiki.js. L'import n'écrase pas les pages modifiées manuellement (sauf si explicitement demandé).
