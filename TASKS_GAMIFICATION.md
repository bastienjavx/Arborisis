# Suivi des tâches — Gamification Arborisis

## Phase 1 — Points Arborisis (ArborisisPoints)
- [ ] Migrations : `<redacted>_points`, `point_reports`, `point_suggestions`
- [ ] Enums : `ArborisisCategory`, `ModerationStatus`, `NatureSensitivityLevel`, `PointReportReason`
- [ ] Models : `ArborisisPoint`, `PointReport`, `PointSuggestion` + relations
- [ ] Form Requests : `StoreArborisisPointRequest`, `UpdateArborisisPointRequest`, `ReportPointRequest`
- [ ] Services : `ArborisisPointService`, `ArborisisPointModerationService`
- [ ] Policies : `ArborisisPointPolicy`
- [ ] Controllers API : `ArborisisPointController`, `AdminArborisisPointController`
- [ ] Events : `ArborisisPointSubmitted`, `ArborisisPointApproved`, `ArborisisPointRejected`
- [ ] Routes API : CRUD points, report, suggest-edit, admin modération
- [ ] Filament Resource : `ArborisisPointResource` (index, edit, modération actions)
- [ ] Vue : `ArborisisMap.vue`, `PointDetailDrawer.vue`, `CreateArborisisPointForm.vue`, `SensitivityWarning.vue`, `ModerationInfoBox.vue`
- [ ] Tests Pest : feature store/update/report, policy, service

## Phase 2 — Check-in géolocalisé (ArborisisVisits)
- [ ] Migration : `<redacted>_visits`
- [ ] Enum : `VisitValidationReason`, `VisitStatus`
- [ ] Model : `ArborisisVisit`
- [ ] Service : `GeoValidationService` (Haversine, précision, rayon)
- [ ] Service : `AntiCheatService` (cooldown, vitesse, limite/jour, score)
- [ ] Controller : `ArborisisVisitController` (`visit` endpoint)
- [ ] Events : `ArborisisPointVisited`, `SuspiciousVisitDetected`
- [ ] Listeners : `UpdateQuestProgress`, `CheckAchievements`, `AwardXp`
- [ ] Jobs : `ValidateSuspiciousVisits`
- [ ] Vue : `VisitButton.vue`, `VisitSuccessModal.vue`
- [ ] Tests : distance, cooldown, anti-cheat, vitesse impossible

## Phase 3 — Quêtes, Achievements & XP
- [ ] Migrations : `quests`, `quest_progress`, `achievements`, `user_achievements`, `xp_events`
- [ ] Enums : `QuestType`, `QuestStatus`, `ObjectiveType`, `AchievementCategory`
- [ ] Models : `Quest`, `QuestProgress`, `Achievement`, `UserAchievement`, `XpEvent`
- [ ] Services : `QuestService`, `AchievementService`, `XpService`
- [ ] Controllers : `QuestController`, `AchievementController`, `UserProgressController`
- [ ] Jobs : `GenerateDailyQuests`, `GenerateWeeklyQuests`, `RecalculateUserLevel`
- [ ] Vue : `QuestList.vue`, `QuestCard.vue`, `QuestProgressBar.vue`, `AchievementList.vue`, `LevelProgressBar.vue`
- [ ] Tests : progression quête, déblocage achievement, calcul XP/niveau

## Phase 4 — Médailles & Profil gamifié
- [ ] Migrations : `medals`, `user_medals`
- [ ] Enums : `MedalRarity`, `MedalCategory`
- [ ] Models : `Medal`, `UserMedal`
- [ ] Service : `MedalService`
- [ ] Event : `MedalUnlocked`
- [ ] Vue : `MedalGrid.vue`, `MedalCard.vue`, `MedalUnlockAnimation.vue`, `UserProgressHeader.vue`, `UserBadgesShowcase.vue`
- [ ] Tests : déblocage médaille, conditions

## Phase 5 — Présence temps réel approximative
- [ ] Migration : `user_presences`
- [ ] Enum : `PresenceVisibilityMode`
- [ ] Model : `UserPresence`
- [ ] Service : `PresenceService`
- [ ] Event : `UserPresenceUpdated` + broadcast Reverb
- [ ] Job : `CleanExpiredPresence`
- [ ] Vue : `PresenceToggle.vue`, `PrivacyModeSelector.vue`, `LiveExplorersLayer.vue`
- [ ] Tests : floutage, expiration, privacy modes

## Phase 6 — Back-office avancé, Sécurité & Tests
- [ ] Filament : `AdminQuestBuilder`, `AdminAchievementBuilder`, `AdminMedalManager`
- [ ] Stats admin : dashboard gamification (visites, points créés, quêtes actives)
- [ ] Rate limiting : check-in, création points, présence
- [ ] Audit logs : actions admin modération
- [ ] Export RGPD : données gamification utilisateur
- [ ] Tests complets Pest : feature + unit + anti-cheat

---

## Checklist sécurité
- [ ] Coordonnées exactes jamais en API publique
- [ ] Consentement géolocalisation stocké et révocable
- [ ] Rate limiting sur toutes les routes sensibles
- [ ] Validation backend stricte des coordonnées
- [ ] Cooldown et limites anti-farm
- [ ] Détection anti-cheat active
- [ ] Modération obligatoire avant publication publique
- [ ] Suppression/anonymisation possible des données

## Checklist RGPD
- [ ] Consentement explicite et traçable
- [ ] Droit à l'oubli (suppression compte = suppression données gamification)
- [ ] Droit à la portabilité (export JSON données utilisateur)
- [ ] Minimisation des données (pas de stockage position précise historique)
- [ ] Transparence (charte nature + politique géoloc)
