import Section from "@/components/Section";
import styles from "./Services.module.css";

export default function Services() {
  const services = [
    {
      title: "Klinički fizikalni pregled",
      description: "Procjena stanja, testiranja i plan terapije kao temelj svakog daljnijeg rada."
    },
    {
      title: "Manualna terapija",
      description: "Ciljane mobilizacije i manipulacije zglobova i mekih tkiva."
    },
    {
      title: "Individualna kineziterapija",
      description: "Vježbe prilagođene vašem stanju i ciljevima oporavka."
    },
    {
      title: "Fizikalna terapija aparatima",
      description: "TECAR, elektroterapija, laser, ultrazvuk, magnet, Game Ready, Kinetec."
    },
    {
      title: "Postoperativni protokoli",
      description: "Rehabilitacija nakon artroskopija, ACL rekonstrukcija te ugradnje TEP-a kuka i koljena."
    },
    {
      title: "Funkcionalni trening",
      description: "Individualni program vježbanja uz fizioterapeuta, usmjeren na jačanje i mobilnost tijela."
    }
  ];

  return (
    <Section>
      <div className={styles.servicesContainer}>
        <h2 className={styles.servicesHeading}>Usluge</h2>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div key={index} className={styles.serviceCard}>
              <h4 className={styles.serviceTitle}>{service.title}</h4>
              <p className={styles.serviceDescription}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
