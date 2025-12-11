import React from "react";
import { FaCalculator, FaFileAlt, FaUsers, FaPrint } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Feature = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <FaCalculator size={28} className="text-[#ffb195]" />,
      title: t("accurateCalculation"),
      description: t("accurateCalculationDesc"),
    },
    {
      icon: <FaFileAlt size={28} className="text-[#ffb195]" />,
      title: t("proofShare"),
      description: t("proofShareDesc"),
    },
    {
      icon: (
        <div className="flex items-center justify-center gap-2">
          <FaUsers size={20} className="text-[#ffb195]" />
          <FaPrint size={20} className="text-[#ffb195]" />
        </div>
      ),
      title: t("userFriendlyPrint"),
      description: t("userFriendlyPrintDesc"),
    },
  ];

  return (
    <section className="w-full mt-0 bg-[#FFF1EB] py-16 px-4 sm:px-6 md:px-10 lg:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
        {t("featuresTitle")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 shadow-lg border border-[#EADBD3] flex flex-col items-center text-center transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="w-16 h-16 flex items-center justify-center mb-4 bg-[#fdf4f0] rounded-full text-center">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">{feature.title}</h3>
            <p className="text-gray-700 text-sm md:text-base">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feature;
