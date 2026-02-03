import Section from "@/components/Section";
import styles from "./AboutTherapist.module.css";

export default function AboutTherapist() {
  return (
    <Section>
      <div className={styles.aboutContainer}>
        <div className={styles.aboutImage}>
          {/* Therapist image */}
        </div>

        <div className={styles.aboutContent}>
          <h2 className={styles.aboutHeading}>O terapeutu</h2>

          <div className={styles.aboutText}>
            <p>Stjepan Marinčević magistar je fizioterapije s više od 10 godina iskustva u radu s mišićno-koštanim sustavom. </p>

            <p>U svakodnevnoj praksi najčešće se susreće s ortopedskim, vertebrološkim i traumatološkim pacijentima, uključujući preoperativna i postooperativna stanja te akutne i kronične bolove i probleme kralježnice. </p>

            <p>Dodatno se educirao u području manualne terapije prema Maitland konceptu, DNS metodama, neurodinamici, neurologiji i individualnoj kineziterapiji, što mu omogućuje cjelovit i precizno prilagođen pristup svakom pacijentu. </p>

            <p>U svom radu njeguje timsku suradnju te aktivno surađuje s ortopedima, traumatolozima, neurokirurzima i fizijatrima iz javnih i privatnih ustanova u Zagrebu, uključujući i Internacionalni Medicinski Centar (IMC) Priora - s ciljem postizanja najboljih mogućih terapijskih rezultata. </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
