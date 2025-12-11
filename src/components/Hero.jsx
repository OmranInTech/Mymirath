import React from "react";
import { useTranslation } from "react-i18next";
import m1 from "../assets/images/m1.png";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCalculator, FaUsers, FaShieldAlt } from "react-icons/fa";
import { Trans } from 'react-i18next';


const Hero = ({ scrollToCalculator }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCalculatorClick = () => {
    if (location.pathname !== "/") {
      sessionStorage.setItem("scrollTo", "calculator");
      navigate("/");
    } else {
      scrollToCalculator?.();
    }
  };

  return (
    <section className="ml-12 mr-12 relative min-h-[85vh] bg-[#FAFAFA] flex flex-col items-center gap-10 px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-12 overflow-hidden">
      
      {/* Top section: Text + Image */}
      <div className="w-full flex flex-col-reverse md:flex-row items-center md:items-stretch gap-6 md:gap-12">
        
        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center z-10 animate-slideInLeft text-center md:text-left">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-4 sm:mb-6">
           {t("appName")}
          </h1>
         <p className="font-body text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
  <Trans
    i18nKey="heroText"
    components={{ 1: <span className="font-semibold text-[#ffb195]" /> }}
    values={{ appName: t("appName") }}
  />
</p>


          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center md:items-start justify-center md:justify-start">
            <button
              onClick={() => navigate("/about")}
              className="bg-[#2e2e2e] text-white hover:bg-[#1f1e1e] py-2 px-6 rounded-full shadow-md transition-transform transform hover:-translate-y-1"
            >
              {t('aboutUs')}
            </button>
            <button
              onClick={handleCalculatorClick}
              className="bg-[#ffb195] text-[#2e2e2e] hover:bg-[#f7a887] py-2 px-6 rounded-full shadow-md transition-transform transform hover:-translate-y-1"
            >
              {t('goToCalculator')}
            </button>
          </div>
        </div>

        {/* Circular Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center animate-slideInRight mt-4 md:mt-0">
          <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-[360px] lg:h-[360px] rounded-full overflow-hidden shadow-xl border-4 border-[#ffb195] transition-transform transform hover:scale-105 duration-700">
            <img
              src={m1}
              alt="Islamic Inheritance Illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>

    </section>
  );
};

export default Hero;
