# Itérations — Passeport Solidaire (Imagine for Margo)

- **Source du plan** : proposé par l'agent, en reprenant l'ordre de priorité du
  « plan de livraison » de la passation (`cadrage/6-plan-de-livraison.md`) —
  aucun plan d'itérations fait par l'équipe dans PM Lab n'a été trouvé
  (ni fichier `cadrage/*iteration*`, ni clé `iterations` dans `passation.json`).
- **Temps restant annoncé** : 23 minutes, demandé à 16:41 (40 min annoncées à
  16:24, détour de 17 min pour corriger le dépôt de travail).
- **Durée d'un tour de test de l'équipe** : 5 minutes.
- **Hors périmètre de cette planification** : CRM, entreprises (HubSpot),
  refonte du site, détail d'un projet, prélèvement automatique, connexion/compte
  (cf. `passation/matiere/arbitrages.md` et le « Hors périmètre » du PRD).

⚠️ **Budget extrêmement serré.** Avec 10 min de codage + ~5 min de publication
+ 5 min de tour de test, une itération coûte au moins 20 minutes. 23 minutes
ne permettent qu'**une seule itération**, sans marge. Les écrans J+7, J+30,
J+60 et J+90 du plan de l'équipe sortent du périmètre de cette session, sauf
si le temps restant est revu à la hausse en cours de route.

---

## Itération 1 : Le parcours démarre et affiche le Passeport J0

- **Plan validé** à 16:41.
- **Dans le périmètre** :
  - Écran « Qui êtes-vous ? » : une liste d'une personne par rôle du scénario
    (au minimum le nouveau donateur fictif, Claire), données d'exemple en dur.
  - Écran « Mon Passeport / Mon don » (J0) : montant et date du don du
    donateur sélectionné, bouton « Découvrir l'impact de mon don » (sans
    action fonctionnelle requise à ce stade — juste présent).
  - Squelette de déployabilité posé : `api/` (port 8081) et `frontend/`
    (port 80 via nginx) avec routes `/health` et `/sante`, `.env.example`,
    `DEPLOIEMENT.md`.
- **Hors périmètre** : navigation vers J+7, graphique de répartition, tout
  appel à don.
- **Critères d'acceptation** :
  - Étant donné l'application démarrée, quand on arrive sur `/`, alors
    l'écran « Qui êtes-vous ? » affiche au moins le donateur fictif.
  - Étant donné un utilisateur sélectionné, quand on valide, alors le
    Passeport J0 affiche son montant et sa date de don, sans appel à don visible.
  - Étant donné l'application déployée, quand on appelle `/health` et
    `/sante`, alors elles répondent 200.
- **Hypothèse de l'équipe couverte** : « le passeport s'affiche sans appel à
  don visible » (étape 1 du plan de livraison de la passation).
- **Codage estimé** : 10 minutes
- **Fichiers prévus** : `frontend/src/data/donateurs.ts`,
  `frontend/src/lib/formatage.ts` (+ test), `frontend/src/app/page.tsx`,
  `frontend/src/app/page.module.css`, `.env.example`, `DEPLOIEMENT.md`.
- **Tests unitaires prévus** : 1 à 3, sur le formatage du montant/date du don
  (pas sur le balisage).
- **Étapes ajoutées à la démo** (`e2e/demo.spec.ts`) : ouvrir l'app, choisir le
  donateur fictif, vérifier l'affichage du montant et de la date du don.
- **Bilan** : _à remplir en fin d'itération._

---

## À venir (hors budget des 23 minutes actuelles, à retailler si le temps change)

1. La répartition des fonds (J+7) : écran « Où va mon argent ? », accessible
   depuis le bouton du Passeport J0, graphique SVG/CSS (78/12/7/3 %).
2. Les projets de recherche financés (J+30) : cartes de projets (Cancer du
   cerveau, Leucémie pédiatrique, Immunothérapie pédiatrique).
3. Les avancées scientifiques (J+60) : vidéo placeholder d'une chercheuse,
   témoignage/citation.
4. Le bilan et l'engagement (J+90) : bilan chiffré collectif, boutons
   « Poursuivre mon engagement » et « Partager la cause » — seul écran avec
   un appel à renouveler l'engagement.
5. Stabilisation finale pour le pitch, si le temps restant ne permet plus
   qu'une dernière itération.
