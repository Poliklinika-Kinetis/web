import Section from "@/components/Section";
import styles from "./ServicesAreas.module.css";

export default function ServicesAreas() {
  const services = [
    {
      title: "Ortopedija",
      description: "Pre i postoperativna rehabilitacija, degenerativna stanja i bolni zglobovi."
    },
    {
      title: "Vertebrologija",
      description: "Akutna i kronična stanja kralježnice, bolovi i ograničenja pokreta."
    },
    {
      title: "Traumatologija",
      description: "Frakture, rupture ligamenata, tetiva i mišića."
    },
    {
      title: "Mišićno-koštani sustav",
      description: "Funkcionalni problemi, preopterećenja i kronične tegobe."
    }
  ];

  return (
    <Section>
      <div className={styles.servicesContainer}>
        <h2 className={styles.servicesHeading}>Područja rada</h2>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div key={index} className={styles.serviceCard}>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
