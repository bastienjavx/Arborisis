# Guide ECHO — Crédits Internes

> **ECHO n'est PAS une cryptomonnaie.** ECHO n'est PAS un investissement. C'est un système de crédits internes permettant de soutenir financièrement les créateurs de contenu sonore.

## Qu'est-ce que ECHO ?

ECHO est la monnaie virtuelle interne d'Arborisis. Elle permet :
- D'**acheter des crédits** via Stripe Checkout (1 € = 10 ECHO)
- De **faire des dons** aux créateurs dont vous appréciez les enregistrements
- De **soutenir la plateforme** via le fonds communautaire

## Acheter des ECHO

1. Allez sur `/wallet`
2. Choisissez un pack de crédits
3. Passez au paiement via Stripe Checkout (carte, Apple Pay, Google Pay)
4. Les ECHO sont crédités instantanément sur votre wallet après confirmation du webhook Stripe

## Faire un don

1. Sur la page d'un son ou d'un profil créateur, cliquez sur **Soutenir**
2. Choisissez le montant en ECHO
3. Confirmez — le don est débité immédiatement

## Répartition des dons

| Bénéficiaire | Part | Usage |
|-------------|------|-------|
| Créateur | 70% | Revenu direct pour l'auteur du son |
| Infrastructure | 20% | Hébergement, stockage audio, analyse |
| Fonds communautaire | 10% | Projets collectifs, événements, bourses |

## Transparence

- Le **ledger ECHO est immuable** : aucune transaction ne peut être modifiée ou supprimée
- Toutes les transactions sont visibles sur `/transparency`
- L'historique personnel est accessible sur `/wallet` et `/donations/history`

## Types de transactions

| Type | Description |
|------|-------------|
| `purchase` | Achat de crédits via Stripe |
| `donation` | Don à un créateur |
| `tip` | Pourboire sur un son |
| `commission` | Part retenue par la plateforme (20%) |
| `community_fund` | Contribution au fonds communautaire (10%) |
| `refund` | Remboursement (cas exceptionnels) |

## Sécurité

- Les transactions sont **atomiques** (tout ou rien)
- Votre solde est stocké en `decimal(10,2)` — jamais de float
- En cas de problème de paiement Stripe, la transaction reste en statut `pending` et est résolue automatiquement

## Questions fréquentes

**Puis-je retirer mes ECHO en euros ?**
> Non. ECHO est une monnaie de plateforme, non convertible en fiat.

**Que se passe-t-il si je supprime mon compte ?**
> Votre wallet et l'historique des transactions sont anonymisés. Les dons reçus par les créateurs restent crédités.

**Y a-t-il des frais cachés ?**
> Non. La répartition 70/20/10 est transparente et affichée avant chaque don.
