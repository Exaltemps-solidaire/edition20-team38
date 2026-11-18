// Données d'exemple en dur pour l'itération 1 : un donateur fictif par rôle du scénario.
export type Donateur = {
  id: string;
  prenom: string;
  donMontantCentimes: number;
  donDateIso: string;
};

export const DONATEURS: Donateur[] = [
  {
    id: "claire",
    prenom: "Claire",
    donMontantCentimes: 5000,
    donDateIso: "2024-11-18",
  },
];
