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
            <p>Moje ime je Stjepan Marinčević i magistar sam fizioterapije s više od 10 godina iskustva u radu s mišićno-koštanim sustavom.</p>

            <p>Najčešće radim s ortopedskim, vertebrološkim i traumatološkim pacijentima - uključujući pre i postooperativna stanja te akutne i kronične bolove i probleme kralježnice.</p>

            <p>Dodatno sam educiran u manualnoj terapiji (Maitland koncept), DNS metodama, neurodinamičkim pristupima i individualnoj kineziterapiji.</p>

            <p>Aktivno surađujem s ortopedima, traumatolozima, neurokirurzima i fizijatarima i javnih i privatnih ustanova u Zagrebu, poput primjerice Internacionalnim Medicinskim Centrom (IMC) Priora.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
