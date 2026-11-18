"use client";

import { useState } from "react";
import { BILAN } from "@/data/bilan";
import { DONATEURS, type Donateur } from "@/data/donateurs";
import { PROJETS } from "@/data/projets";
import { REPARTITION } from "@/data/repartition";
import { formatDateDon, formatMontant } from "@/lib/formatage";
import styles from "./page.module.css";

type Ecran =
  | "selecteur"
  | "passeport"
  | "repartition"
  | "projets"
  | "avancees"
  | "bilan";

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
        {ecran === "passeport" && (
          <PasseportJ0
            donateur={donateur}
            onDecouvrir={() => setEcran("repartition")}
          />
        )}
        {ecran === "repartition" && (
          <Repartition
            onRetour={() => setEcran("passeport")}
            onProjets={() => setEcran("projets")}
          />
        )}
        {ecran === "projets" && (
          <Projets
            onRetour={() => setEcran("repartition")}
            onAvancees={() => setEcran("avancees")}
          />
        )}
        {ecran === "avancees" && (
          <Avancees
            onRetour={() => setEcran("projets")}
            onBilan={() => setEcran("bilan")}
          />
        )}
        {ecran === "bilan" && (
          <Bilan onRetour={() => setEcran("avancees")} />
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

function Repartition({
  onRetour,
  onProjets,
}: {
  onRetour: () => void;
  onProjets: () => void;
}) {
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

      <button
        type="button"
        className={styles.boutonPrimaire}
        onClick={onProjets}
      >
        Voir les projets que je finance →
      </button>

      <button type="button" className={styles.boutonSecondaire} onClick={onRetour}>
        ← Retour à mon Passeport
      </button>
    </section>
  );
}

function Projets({
  onRetour,
  onAvancees,
}: {
  onRetour: () => void;
  onAvancees: () => void;
}) {
  return (
    <section>
      <div className={styles.heroBanner}>
        <div className={styles.passportTitre}>
          Les projets
          <br />
          que vous financez
        </div>
      </div>

      <ul className={styles.listeProjets}>
        {PROJETS.map((projet) => (
          <li key={projet.id} className={styles.carteProjet}>
            <div className={styles.projetNom}>{projet.nom}</div>
            <p className={styles.projetDescription}>{projet.description}</p>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={styles.boutonPrimaire}
        onClick={onAvancees}
      >
        Voir les avancées scientifiques →
      </button>

      <button type="button" className={styles.boutonSecondaire} onClick={onRetour}>
        ← Retour à la répartition
      </button>
    </section>
  );
}

function Avancees({
  onRetour,
  onBilan,
}: {
  onRetour: () => void;
  onBilan: () => void;
}) {
  return (
    <section>
      <div className={styles.heroBanner}>
        <div className={styles.passportTitre}>
          Les avancées
          <br />
          scientifiques
        </div>
      </div>

      <div className={styles.carteChercheuse}>
        <blockquote className={styles.citation}>
          « Chaque don nous rapproche d&apos;un traitement qui n&apos;existait
          pas il y a cinq ans. »
        </blockquote>
        <div className={styles.chercheuseNom}>Dr. Léa Martin</div>
      </div>

      <button type="button" className={styles.boutonPrimaire} onClick={onBilan}>
        Voir mon impact solidaire →
      </button>

      <button type="button" className={styles.boutonSecondaire} onClick={onRetour}>
        ← Retour aux projets
      </button>
    </section>
  );
}

function Bilan({ onRetour }: { onRetour: () => void }) {
  return (
    <section>
      <div className={styles.heroBanner}>
        <div className={styles.passportTitre}>Mon impact solidaire</div>
      </div>

      <ul className={styles.listeBilan}>
        <li className={styles.carteBilan}>
          <div className={styles.bilanChiffre}>{BILAN.projets}</div>
          <div className={styles.bilanLabel}>projets soutenus</div>
        </li>
        <li className={styles.carteBilan}>
          <div className={styles.bilanChiffre}>{BILAN.enfants}</div>
          <div className={styles.bilanLabel}>enfants accompagnés</div>
        </li>
        <li className={styles.carteBilan}>
          <div className={styles.bilanChiffre}>{BILAN.pistes}</div>
          <div className={styles.bilanLabel}>pistes de recherche</div>
        </li>
      </ul>

      <button type="button" className={styles.boutonPrimaire}>
        Poursuivre mon engagement
      </button>

      <button type="button" className={styles.boutonSecondaire}>
        Partager la cause
      </button>

      <button type="button" className={styles.boutonSecondaire} onClick={onRetour}>
        ← Retour aux avancées
      </button>
    </section>
  );
}
