"use client";

import { useState } from "react";
import { DONATEURS, type Donateur } from "@/data/donateurs";
import { REPARTITION } from "@/data/repartition";
import { formatDateDon, formatMontant } from "@/lib/formatage";
import styles from "./page.module.css";

type Ecran = "selecteur" | "passeport" | "repartition";

export default function Home() {
  const [donateur, setDonateur] = useState<Donateur | null>(null);
  const [ecran, setEcran] = useState<Ecran>("selecteur");

  if (donateur === null) {
    return (
      <div className={styles.page}>
        <div className={styles.shell}>
          <SelecteurDonateur
            onSelection={(d) => {
              setDonateur(d);
              setEcran("passeport");
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        {ecran === "passeport" ? (
          <PasseportJ0
            donateur={donateur}
            onDecouvrir={() => setEcran("repartition")}
          />
        ) : (
          <Repartition onRetour={() => setEcran("passeport")} />
        )}
      </div>
    </div>
  );
}

function SelecteurDonateur({
  onSelection,
}: {
  onSelection: (donateur: Donateur) => void;
}) {
  return (
    <section>
      <h1 className={styles.selecteurTitre}>Qui êtes-vous ?</h1>
      <p className={styles.selecteurIntro}>
        Choisissez un profil pour découvrir le Passeport Solidaire.
      </p>
      <ul className={styles.listeDonateurs}>
        {DONATEURS.map((d) => (
          <li key={d.id}>
            <button
              type="button"
              className={styles.boutonDonateur}
              onClick={() => onSelection(d)}
            >
              {d.prenom}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PasseportJ0({
  donateur,
  onDecouvrir,
}: {
  donateur: Donateur;
  onDecouvrir: () => void;
}) {
  return (
    <section>
      <div className={styles.heroBanner}>
        <div className={styles.passportTitre}>
          Passeport
          <br />
          Solidaire
        </div>
      </div>

      <div className={styles.bienvenue}>
        <h2>Bienvenue {donateur.prenom} !</h2>
        <p>
          Merci pour votre premier don. Découvrez ici ce que votre générosité
          permet de réaliser et suivez l&apos;impact de votre engagement à nos
          côtés.
        </p>
      </div>

      <div className={styles.donCarte}>
        <div className={styles.donLabel}>Mon premier don</div>
        <div className={styles.donMontant}>
          {formatMontant(donateur.donMontantCentimes)}
        </div>
        <div className={styles.donDate}>
          {formatDateDon(donateur.donDateIso)}
        </div>
      </div>

      <button
        type="button"
        className={styles.boutonPrimaire}
        onClick={onDecouvrir}
      >
        Découvrir l&apos;impact de mon don →
      </button>
    </section>
  );
}

function Repartition({ onRetour }: { onRetour: () => void }) {
  return (
    <section>
      <div className={styles.heroBanner}>
        <div className={styles.passportTitre}>Où va mon argent ?</div>
      </div>

      <ul className={styles.listeRepartition}>
        {REPARTITION.map((poste) => (
          <li key={poste.id} className={styles.posteRepartition}>
            <div className={styles.posteEnTete}>
              <span>{poste.libelle}</span>
              <span>{poste.pourcentage} %</span>
            </div>
            <div className={styles.barreFond}>
              <div
                className={styles.barreRemplissage}
                style={{ width: `${poste.pourcentage}%` }}
              />
            </div>
          </li>
        ))}
      </ul>

      <button type="button" className={styles.boutonPrimaire} onClick={onRetour}>
        ← Retour à mon Passeport
      </button>
    </section>
  );
}
