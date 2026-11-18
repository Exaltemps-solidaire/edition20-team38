import { describe, expect, it } from "vitest";
import { formatDateDon, formatMontant } from "./formatage";

describe("formatMontant", () => {
  it("affiche un montant en euros sans décimales", () => {
    expect(formatMontant(5000)).toBe("50 €");
  });
});

describe("formatDateDon", () => {
  it("affiche une date longue en français, précédée de « le »", () => {
    expect(formatDateDon("2024-11-18")).toBe("le 18 novembre 2024");
  });
});
