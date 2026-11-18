export type Poste = {
  id: string;
  libelle: string;
  pourcentage: number;
};

export const REPARTITION: Poste[] = [
  { id: "recherche", libelle: "Recherche médicale", pourcentage: 78 },
  { id: "familles", libelle: "Soutien aux familles", pourcentage: 12 },
  { id: "sensibilisation", libelle: "Sensibilisation", pourcentage: 7 },
  { id: "fonctionnement", libelle: "Fonctionnement", pourcentage: 3 },
];
