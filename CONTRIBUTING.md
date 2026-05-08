# 🤝 Contribuer à Arborisis

Merci de votre intérêt pour Arborisis ! Voici comment contribuer efficacement.

## 🚀 Processus de contribution

1. **Fork** le projet
2. **Créez une branche** : `git checkout -b feature/ma-super-fonctionnalite`
3. **Committez** avec des messages clairs : `git commit -m "feat: ajoute le filtre par durée sur la carte"`
4. **Push** : `git push origin feature/ma-super-fonctionnalite`
5. **Ouvrez une Merge Request** sur GitLab

## 📝 Conventions de commit (Conventional Commits)

```
<type>(<scope>): <sujet>

[corps optionnel]

[footer optionnel]
```

**Types :**
- `feat:` — Nouvelle fonctionnalité
- `fix:` — Correction de bug
- `docs:` — Documentation
- `style:` — Formatage (pas de changement de code)
- `refactor:` — Refactoring
- `perf:` — Performance
- `test:` — Tests
- `chore:` — Tâches diverses

**Exemples :**
```
feat(map): ajoute le clustering par région
fix(echo): corrige la race condition sur les transactions
refactor(sound): extrait la validation dans un Form Request
```

## 🧪 Avant de soumettre

- [ ] Les tests passent : `php artisan test`
- [ ] Le linter PHP est propre : `./vendor/bin/pint`
- [ ] Pas de régression TypeScript : `npm run build`
- [ ] La MR a une description claire
- [ ] Les breaking changes sont documentés

## 🐛 Signaler un bug

Utilisez le template **Bug** dans les issues GitLab avec :
- Description du comportement attendu vs actuel
- Étapes de reproduction
- Environnement (PHP, DB, navigateur)
- Screenshots si pertinent

## 💡 Proposer une fonctionnalité

Utilisez le template **Feature** dans les issues GitLab avec :
- Problème résolu ou besoin identifié
- Description de la solution proposée
- Alternatives envisagées
- Impact sur l'architecture existante

## 🎨 Design & UI

- Respectez la palette Arborisis (voir `ARCHITECTURE.md`)
- Pensez mobile-first (Tailwind responsive)
- Testez le dark mode
- Privilégiez l'accessibilité (ARIA, contrastes)

---

Merci de contribuer à faire rayonner les sons de la nature ! 🌿
