import { describe, expect, it } from "vitest";
import { PROJETS } from "./projets";

describe("PROJETS", () => {
  it("contient les 3 projets de la passation, avec un intitulé", () => {
    expect(PROJETS).toHaveLength(3);
    for (const projet of PROJETS) {
      expect(projet.nom.length).toBeGreaterThan(0);
      expect(projet.description.length).toBeGreaterThan(0);
    }
  });

  it("reprend les noms exacts de la maquette 3 de la passation", () => {
    const noms = PROJETS.map((p) => p.nom);
    expect(noms).toEqual([
      "Cancer du cerveau",
      "Leucémie pédiatrique",
      "Immunothérapie pédiatrique",
    ]);
  });
});
