import Section from "@/components/Section";
import styles from "./CommonMyths.module.css";

export default function CommonMyths() {
  const myths = [
    {
      title: "Terapija mora boljeti.",
      description: "Ne mora. Učinkovita terapija ne temelji se na boli."
    },
    {
      title: "Potrebno je odraditi minimalno 10-20 terapija.",
      description: "Broj dolazaka ovisi isključivo o problemu i stanju, ne o pravilu."
    },
    {
      title: "Bitne su minute, ne sadržaj.",
      description: "Vrijeme bez kvalitetnog sadržaja ne donosi rezultat."
    }
  ];

  return (
    <Section>
      <div className={styles.mythsContainer}>
        <h2 className={styles.mythsHeading}>Česte zablude</h2>

        <div className={styles.mythsGrid}>
          {myths.map((myth, index) => (
            <div key={index} className={styles.mythCard}>
              <h4 className={styles.mythTitle}>{myth.title}</h4>
              <p className={styles.mythDescription}>{myth.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
