const FORMATEUR_DATE = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatMontant(centimes: number): string {
  return `${Math.round(centimes / 100)} €`;
}

export function formatDateDon(dateIso: string): string {
  return `le ${FORMATEUR_DATE.format(new Date(`${dateIso}T00:00:00Z`))}`;
}
