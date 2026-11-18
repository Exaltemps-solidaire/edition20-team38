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

---

## Itération 2 : Où va mon argent ? (répartition des fonds, J+7)

- **Temps restant annoncé** : 10 à 20 minutes, demandé à 17:10. ✂️ Budget trop
  serré pour un graphique SVG : je réduis à une liste de barres CSS simples
  (une par poste), sans animation ni bibliothèque de graphique.
- **Dans le périmètre** :
  - Le bouton « Découvrir l'impact de mon don » du Passeport J0 devient actif
    et affiche l'écran « Où va mon argent ? ».
  - Cet écran liste les 4 postes de répartition (recherche, soutien aux
    familles, sensibilisation, fonctionnement) avec leur pourcentage, en
    barres CSS, données en dur.
  - Un bouton retour vers le Passeport J0.
- **Hors périmètre** : J+30, J+60, J+90 ; tout graphique SVG animé ; tout
  pourcentage dynamique/issu d'une API.
- **Critères d'acceptation** :
  - Étant donné le Passeport J0 affiché, quand on clique sur « Découvrir
    l'impact de mon don », alors l'écran de répartition s'affiche avec les
    4 postes et leurs pourcentages.
  - Étant donné l'écran de répartition affiché, quand on revient en arrière,
    alors le Passeport J0 réapparaît.
  - Les 4 pourcentages affichés totalisent 100 %.
- **Hypothèse de l'équipe couverte** : étape 2 du plan de livraison
  (« où va mon argent »).
- **Codage estimé** : 8 minutes.
- **Fichiers prévus** : `frontend/src/data/repartition.ts` (+ test de somme à
  100 %), `frontend/src/app/page.tsx`, `frontend/src/app/page.module.css`.
- **Plan validé** à 17:10.
- **Bilan** :
  - Durée de codage réelle : moins d'1 minute (chrono 17:11:5x → 17:12:0x),
    pas de dépassement.
  - Critères d'acceptation : les 3 sont satisfaits (bouton actif vers l'écran
    de répartition, retour vers le Passeport J0, 4 postes totalisant 100 %,
    vérifié par test unitaire).
  - Reporté : rien à cette itération.
  - Ce que le harnais a bloqué/refusé : rien (contrat et tests verts avant le
    rebuild/déploiement).
  - **Modifications** :
    - `frontend/src/data/repartition.ts` (+ `repartition.test.ts`) — 4 postes
      de répartition, testés pour sommer à 100 % (critère 3).
    - `frontend/src/app/page.tsx` — écran « Où va mon argent ? », bouton
      « Découvrir l'impact » rendu actif, navigation retour (critères 1, 2).
    - `frontend/src/app/page.module.css` — barres CSS de répartition.
    - Rebuild/redéploiement du seul service `frontend` (image `api`
      inchangée).

---

---

## Itération 3 : Les projets financés (J+30)

- **Temps restant annoncé** : 10 à 20 minutes, demandé à 17:16. ✂️ Je réduis à
  une liste de 3 cartes statiques (nom du projet + une phrase), sans image,
  sans détail de projet (hors périmètre explicite de la passation).
- **Dans le périmètre** :
  - L'écran de répartition (J+7) gagne un bouton vers l'écran « Les projets
    que vous financez » (J+30).
  - Cet écran liste 3 projets en dur (Cancer du cerveau, Leucémie
    pédiatrique, Immunothérapie pédiatrique), chacun avec son intitulé et une
    phrase d'exemple fictive (❓ la passation ne donne que les noms, pas de
    description ; phrases inventées dans le même esprit que les autres
    données d'exemple déjà fictives du prototype).
  - Un bouton retour vers l'écran de répartition.
- **Hors périmètre** : écran de détail dédié par projet (carte cliquable vers
  une fiche séparée) — exclu explicitement par les cadreurs
  (`passation/PASSATION.md:243`) ; J+60, J+90 ; images/photos.
- **Critères d'acceptation** :
  - Étant donné l'écran de répartition affiché, quand on clique sur le
    bouton des projets, alors les 3 projets s'affichent.
  - Étant donné l'écran des projets affiché, quand on revient en arrière,
    alors l'écran de répartition réapparaît.
  - Les 3 projets du plan de livraison sont bien ceux qui s'affichent (pas
    de nom inventé).
- **Hypothèse de l'équipe couverte** : étape 3 du plan de livraison
  (« les projets que mon don finance »).
- **Codage estimé** : 8 minutes.
- **Fichiers prévus** : `frontend/src/data/projets.ts` (+ test : 3 projets,
  aucun intitulé vide), `frontend/src/app/page.tsx`,
  `frontend/src/app/page.module.css`.
- **Plan validé** à 17:16 (ajusté à 17:17 : description en une phrase par
  carte ajoutée au périmètre, à la demande du développeur).
- **Bilan** :
  - Durée de codage réelle : moins d'1 minute, pas de dépassement.
  - Critères d'acceptation : les 3 sont satisfaits (bouton vers les projets
    depuis la répartition, retour vers la répartition, les 3 noms exacts de
    la passation affichés — vérifié par test unitaire).
  - ⚠️ Changement de périmètre signalé en cours d'itération : le développeur a
    demandé le détail des projets, alors que la passation exclut
    explicitement une fiche dédiée par projet
    (`passation/PASSATION.md:243`). Clarifié avec lui : la demande portait sur
    une phrase descriptive par carte (pas un écran dédié), ce qui reste
    compatible avec l'arbitrage des cadreurs — pas de fiche de détail créée.
    ❓ Les 3 phrases descriptives sont inventées (la passation ne fournit que
    les noms des projets) ; à faire valider par les cadreurs au prochain tour
    de test.
  - Reporté : rien à cette itération.
  - Ce que le harnais a bloqué/refusé : rien.
  - **Modifications** :
    - `frontend/src/data/projets.ts` (+ `projets.test.ts`) — 3 projets de la
      passation (noms exacts) avec une phrase d'exemple fictive chacun,
      testés (critères 1, 3).
    - `frontend/src/app/page.tsx` — écran « Les projets que vous financez »,
      navigation depuis/vers l'écran de répartition (critères 1, 2).
    - `frontend/src/app/page.module.css` — cartes de projets, bouton
      secondaire.
    - Rebuild/redéploiement du seul service `frontend`.

---

---

## Itération 4 : Les avancées scientifiques (J+60)

- **Temps restant annoncé** : 10 à 20 minutes, demandé à 17:23. ✂️ Je réduis à
  un texte + une citation, sans placeholder vidéo (pas de lecteur, pas
  d'asset à préparer dans le temps restant).
- **Dans le périmètre** :
  - L'écran des projets (J+30) gagne un bouton vers l'écran « Les avancées
    scientifiques » (J+60).
  - Cet écran affiche le nom de la chercheuse (« Dr. Léa Martin », donné par
    la passation) et une citation en dur. ❓ La passation ne donne que le
    principe (« une citation directe constitue la preuve concrète des
    résultats »), pas son texte : citation inventée, même précédent que les
    descriptions de projets de l'itération 3, à faire valider par les
    cadreurs.
  - Un bouton retour vers l'écran des projets.
- **Hors périmètre** : lecteur vidéo, J+90.
- **Critères d'acceptation** :
  - Étant donné l'écran des projets affiché, quand on clique sur le bouton
    des avancées, alors le nom de la chercheuse et sa citation s'affichent.
  - Étant donné l'écran des avancées affiché, quand on revient en arrière,
    alors l'écran des projets réapparaît.
  - Le nom affiché est exactement celui de la passation (« Dr. Léa Martin »).
- **Hypothèse de l'équipe couverte** : étape 4 du plan de livraison
  (« les avancées scientifiques »).
- **Codage estimé** : 6 minutes.
- **Fichiers prévus** : `frontend/src/app/page.tsx`,
  `frontend/src/app/page.module.css`.
- **Plan validé** à 17:24.
- **Bilan** :
  - Durée de codage réelle : moins d'1 minute, pas de dépassement.
  - Critères d'acceptation : les 3 sont satisfaits (bouton depuis les
    projets, nom et citation affichés, retour vers les projets).
  - Pas de nouveau test unitaire : aucune logique métier ajoutée (texte et
    navigation seulement), conformément à la règle « pas de test sur du
    balisage pur ».
  - ❓ Citation inventée (même point que les descriptions de projets de
    l'itération 3) : la passation ne fournit que le principe d'une citation,
    pas son texte — à faire valider par les cadreurs au tour de test.
  - Reporté : rien à cette itération. J+90 reste la seule étape du plan de
    livraison hors périmètre.
  - Ce que le harnais a bloqué/refusé : rien.
  - **Modifications** :
    - `frontend/src/app/page.tsx` — écran « Les avancées scientifiques »,
      navigation depuis/vers l'écran des projets (critères 1, 2, 3).
    - `frontend/src/app/page.module.css` — carte citation.
    - Rebuild/redéploiement du seul service `frontend`.

---

## Itération 5 : Le bilan et l'engagement (J+90)

- **Temps restant annoncé** : 10 à 20 minutes, demandé à 17:31. ✂️ Je réduis
  aux chiffres exacts de la passation (pas de graphique), et aux deux boutons
  sans action réelle (pas d'appel à don, pas de partage fonctionnel — hors
  périmètre de cette planification).
- **Dans le périmètre** :
  - L'écran des avancées (J+60) gagne un bouton vers l'écran « Mon impact
    solidaire » (J+90).
  - Cet écran affiche le bilan chiffré collectif donné par la passation
    (maquette 5) : 5 projets, 120 enfants, 2 pistes de recherche.
  - Deux boutons présents, sans action fonctionnelle : « Poursuivre mon
    engagement » et « Partager la cause » (seul écran du parcours où un appel
    à renouveler l'engagement est visible, conformément à la passation ; aucun
    flux de don/partage réel n'est dans le périmètre de cette session).
  - Un bouton retour vers l'écran des avancées.
- **Hors périmètre** : tout appel à don fonctionnel, tout partage réel
  (réseaux sociaux, lien), emails automatiques, mesure du compteur
  d'appels à don.
- **Critères d'acceptation** :
  - Étant donné l'écran des avancées affiché, quand on clique sur le bouton
    du bilan, alors les 3 chiffres (5 projets, 120 enfants, 2 pistes) et les
    2 boutons d'action s'affichent.
  - Étant donné l'écran du bilan affiché, quand on revient en arrière, alors
    l'écran des avancées réapparaît.
  - Les 3 chiffres affichés sont exactement ceux de la passation (maquette 5).
- **Hypothèse de l'équipe couverte** : étape 5 du plan de livraison
  (« bilan et engagement »).
- **Codage estimé** : 7 minutes.
- **Fichiers prévus** : `frontend/src/data/bilan.ts` (+ test : 3 chiffres),
  `frontend/src/app/page.tsx`, `frontend/src/app/page.module.css`.
- **Plan validé** à 17:31.
- **Bilan** :
  - Durée de codage réelle : moins d'1 minute, pas de dépassement.
  - Critères d'acceptation : les 3 sont satisfaits (bouton depuis les
    avancées, les 3 chiffres exacts de la passation (5, 120, 2) et les 2
    boutons d'action affichés, retour vers les avancées — vérifié par test
    unitaire pour les chiffres).
  - Les boutons « Poursuivre mon engagement » et « Partager la cause » sont
    affichés sans action (pas de `onClick`) : conforme au plan, aucun appel à
    don ni partage réel n'était dans le périmètre.
  - Reporté : rien. C'était la dernière étape du plan de livraison de la
    passation (J0 à J+90) ; il ne reste que la stabilisation finale (item 5 de
    « À venir »).
  - Ce que le harnais a bloqué/refusé : rien (contrat de déployabilité et
    tests verts avant rebuild/déploiement).
  - **Modifications** :
    - `frontend/src/data/bilan.ts` (+ `bilan.test.ts`) — chiffres exacts de la
      maquette 5 de la passation (5 projets, 120 enfants, 2 pistes), testés
      (critère 3).
    - `frontend/src/app/page.tsx` — écran « Mon impact solidaire », navigation
      depuis/vers l'écran des avancées, boutons d'action inertes (critères 1,
      2).
    - `frontend/src/app/page.module.css` — cartes de chiffres du bilan.
    - `e2e/demo.spec.ts` — étape « Je vois mon impact solidaire » ajoutée
      (non exécutée, Chromium absent — hors DoD, signalé).
    - Rebuild/redéploiement du seul service `frontend`.

---

## À venir (hors budget actuel, à retailler si le temps change)

1. ~~La répartition des fonds (J+7)~~ → traitée en itération 2.
2. ~~Les projets de recherche financés (J+30)~~ → traitée en itération 3.
3. ~~Les avancées scientifiques (J+60)~~ → traitée en itération 4 ci-dessus.
4. ~~Le bilan et l'engagement (J+90)~~ → traitée en itération 5 ci-dessus.
5. Stabilisation finale pour le pitch, si le temps restant ne permet plus
   qu'une dernière itération.
