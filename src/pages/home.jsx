import React, { useEffect } from "react";
import Hero from "../components/Hero";
import HeirFormSection1 from "../components/HeirFormSection1";
import Fatwas from "../components/FatwasSection";
import Contact from "./Statistics";
import Footer from "../components/Footer";
import SEO from "../components/SEO"; 
import Feature from '../components/Features';

const Home = ({ calculatorRef, fatwasRef, contactRef }) => {
  useEffect(() => {
    const scrollTo = sessionStorage.getItem("scrollTo");
    if (scrollTo === "calculator" && calculatorRef?.current) {
      calculatorRef.current.scrollIntoView({ behavior: "smooth" });
      sessionStorage.removeItem("scrollTo");
    }
  }, [calculatorRef]);

  return (
    <>
      {/* SEO for MyMirath homepage */}
      <SEO
        title="MyMirath - Islamic Inheritance Calculator"
        description="MyMirath is a Shariah-compliant Islamic inheritance calculator. Calculate shares for children, spouses, parents, siblings, and more with accurate guidance."
        keywords="Islamic inheritance calculator, Shariah inheritance, Mirath, Muslim inheritance, Heir shares, Fatwas"
        url="https://mymirath.netlify.app"
        image="https://mymirath.netlify.app/images/m1.png"
      />

      <Hero scrollToCalculator={() => calculatorRef.current?.scrollIntoView({ behavior: "smooth" })} />
      <Feature/>
      <main className="px-3 sm:px-4 space-y-8 sm:space-y-10">
        <section ref={calculatorRef} className="min-h-screen bg-[#FAFAFA] pt-6 sm:pt-8">
          <HeirFormSection1 />
        </section>

        <section ref={fatwasRef} className="bg-[#FAFAFA] pt-4 sm:pt-6">
          <Fatwas />
        </section>

        <section ref={contactRef} className="bg-[#FAFAFA] pb-16 sm:pb-10">
          <Contact />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
