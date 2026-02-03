import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CallToAction from "@/components/CallToAction";
import WhyKinetis from "@/components/WhyKinetis";
import AboutTherapist from "@/components/AboutTherapist";
import TherapyProcess from "@/components/TherapyProcess";
import Services from "@/components/Services";
import ServicesAreas from "@/components/ServicesAreas";
import TargetAudience from "@/components/TargetAudience";
import CommonMyths from "@/components/CommonMyths";
import PainWarning from "@/components/PainWarning";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import "./page.css";

export default function Home() {
  return (
    <div className="pageContainer">
      <Header />
      <main>
        <Hero />
        <CallToAction />
        <WhyKinetis />
        <AboutTherapist />
        <ServicesAreas />
        <TherapyProcess />
        <Services />
        <TargetAudience />
        <CommonMyths />
        <PainWarning />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
