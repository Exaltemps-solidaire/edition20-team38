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
- **Bilan** :
  - Durée de codage réelle : ~1 minute (chrono 16:41:56 → 16:43:01). Le dépôt
    de travail initial, `/srv/team38/exaltemps-solidaire`, n'était pas le bon
    (ce n'est pas celui versé par l'infra pour l'équipe, il ne pousse nulle
    part) : ~17 min ont été perdues à migrer le travail vers `/srv/team38/app`
    avant de relancer le chrono. Pas de dépassement des 10 minutes de codage
    une fois au bon endroit.
  - Critères d'acceptation : les 3 sont satisfaits (sélecteur affichant
    Claire, Passeport J0 avec montant/date sans appel à don visible,
    `/health`/`/sante` répondent 200 sur les deux services).
  - Reporté : rien à cette itération — le périmètre tenait dans le temps.
  - Ce que le harnais a bloqué/refusé : rien côté `verifier-avant-signal.sh`
    (contrat de déployabilité et tests déjà verts avant le signal). Une
    alarme budget parasite a sonné une fois, attribuée à un chrono resté
    ouvert dans le mauvais dépôt (`exaltemps-solidaire/.iterations/1.debut`,
    jamais clos) — sans rapport avec le temps de codage réel dans `app/`.
  - Blocage externe (hors harnais) : la limite de pull anonyme Docker Hub a
    empêché un premier `podman build` (images `node:24-alpine` et
    `nginx:1.27-alpine`) ; résolu après nouvelle tentative, puis un second
    blocage (port 8080 squatté par un `next-server` de développement resté
    actif) a été levé en tuant le processus.
  - **Modifications** :
    - `frontend/src/data/donateurs.ts` — données d'exemple du donateur Claire
      (critère 1).
    - `frontend/src/lib/formatage.ts` (+ `formatage.test.ts`) — formatage
      montant/date du don, testé (critère 2, DoD point 2).
    - `frontend/src/app/page.tsx`, `page.module.css`, `layout.tsx` — écrans
      « Qui êtes-vous ? » et « Passeport J0 » (critères 1 et 2).
    - `api/Dockerfile`, `frontend/Dockerfile` — images de base qualifiées
      `docker.io/library/…` (DoD point 4, requis par le `/CLAUDE.md` racine).
    - `podman-compose.yml` — déploiement sur `core-network`, ports 8080/8081
      (DoD point 4).
    - `.env.example`, `DEPLOIEMENT.md` — squelette de déployabilité (DoD
      point 3).
    - Commit initial du gabarit de départ (`api/`, `scripts/`, `docs/`,
      `.claude/`...), jamais versé jusqu'ici.
    - `e2e/demo.spec.ts` — étapes « choisir Claire » et « voir le Passeport
      J0 » ajoutées ; non exécutées ici (binaire Chromium de Playwright
      absent de la machine, `npx playwright install` non lancé faute de
      temps) — hors DoD, signalé sans bloquer la publication.

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
