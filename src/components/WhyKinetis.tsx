import Section from "@/components/Section";
import styles from "./WhyKinetis.module.css";

export default function WhyKinetis() {
  const features = [
    {
      title: "Individualan pristup",
      description: "Svaki pacijent dobiva terapiju prilagođenu svom stanju, a ne unaprijed složen program."
    },
    {
      title: "Definiranje uzroka problema",
      description: "Fokus nije na liječenju samo simptoma, nego na pronalasku uzroka boli, stanja i poteškoća. Iako se ponekad prvo radi na smirivanju simptoma, cilj je dugoročno rješenje, a ne samo privremeno olakšanje."
    },
    {
      title: "Stručnost ispred rutine",
      description: "Manualna terapija i kineziterapija u prvom su planu, a aparati se koriste samo kad imaju svrhu u određenom problemu."
    },
    {
      title: "Iskreno i realno",
      description: "Jasna komunikacija o očekivanom oporavku, njegovom trajanju i (ne)potrebnim koracima i terapijama."
    },
    {
      title: "Objektivni napredak",
      description: "\"Ništa me više ne boli. Mogu normalno funkcionirati\" - najčešća je povratna informacija pacijenata koja pruža veliku sreću i zadovoljstvo."
    },
    {
      title: "Suradnja s liječnicima",
      description: "Aktivna komunikacija sa specijalistima ortopedije i traumatologije, neurokirurzima i fizijatarima iz javnih i privatnih ustanova grada Zagreba."
    }
  ];

  return (
    <Section>
      <div className={styles.whyContainer}>
        <h2 className={styles.whyHeading}>Zašto Kinetis?</h2>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
