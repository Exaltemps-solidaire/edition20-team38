# Déploiement — Passeport Solidaire

Passeport Solidaire montre à un nouveau donateur, dans l'application mobile
d'Imagine for Margo, ce que son don permet de réaliser (projets, avancées,
bilan), sans jamais lui redemander de l'argent sur ce parcours.

## Services

- `frontend/` — export statique Next.js servi par nginx, port 80 (8080 publié
  sur la VM). **Exposé au public.** Routes `/health` et `/sante`.
- `api/` — serveur Node sans dépendance, port 8081 (8081 publié sur la VM).
  Routes `/health` et `/sante` à la racine.

## Services externes

Aucun à ce stade (itération 1) : les données affichées sont en dur dans le
frontend. Pas de base de données, pas d'appel IA, pas d'envoi d'e-mail.

## Fragile / inachevé

- Les données du donateur (montant, date de don) sont codées en dur, pas
  lues d'une base ou d'une API : une seule personne (Claire) est disponible
  sur l'écran « Qui êtes-vous ? ».
- Le bouton « Découvrir l'impact de mon don » n'a pas encore d'action
  (prévu en itération 2).
- L'API ne sert pour l'instant que `/health` et `/sante` : aucune route
  métier.

## Contact

Équipe team38 (hackathon eXaltemps Solidaire) côté build ; côté association,
voir `passation/contexte/association.md`.
