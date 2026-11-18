import { describe, expect, it } from "vitest";
import { REPARTITION } from "./repartition";

describe("REPARTITION", () => {
  it("totalise 100 %", () => {
    const total = REPARTITION.reduce((somme, poste) => somme + poste.pourcentage, 0);
    expect(total).toBe(100);
  });
});
