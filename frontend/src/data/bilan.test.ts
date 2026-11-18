import { describe, expect, it } from "vitest";
import { BILAN } from "./bilan";

describe("BILAN", () => {
  it("reprend les chiffres exacts de la maquette 5 de la passation", () => {
    expect(BILAN).toEqual({ projets: 5, enfants: 120, pistes: 2 });
  });
});
