export type Projet = {
  id: string;
  nom: string;
  description: string;
};

// Noms issus de la passation (maquette 3). Descriptions : exemples fictifs,
// la passation ne fournit pas de texte par projet.
export const PROJETS: Projet[] = [
  {
    id: "cancer-du-cerveau",
    nom: "Cancer du cerveau",
    description: "Une équipe de recherche teste un nouveau protocole pour mieux cibler les tumeurs pédiatriques.",
  },
  {
    id: "leucemie-pediatrique",
    nom: "Leucémie pédiatrique",
    description: "Un essai clinique explore une thérapie cellulaire pour les enfants en rechute.",
  },
  {
    id: "immunotherapie-pediatrique",
    nom: "Immunothérapie pédiatrique",
    description: "Des chercheurs développent un traitement qui mobilise le système immunitaire de l'enfant.",
  },
];
