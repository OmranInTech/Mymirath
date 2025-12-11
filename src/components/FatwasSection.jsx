/*fatwas component*/

import React from "react";
import { useTranslation } from "react-i18next";

const Fatwas = React.forwardRef((props, ref) => {
  const { t } = useTranslation();
  const items = t("fatwas.items", { returnObjects: true });
  const localizedItems = Array.isArray(items) && items.length > 0 ? items : [];
  return (
    <section
      ref={ref}
      id="fatwas"
      className="bg-[#FAFAFA] py-12 px-6 max-w-7xl mx-auto"
    >
      <h2 className="text-4xl font-bold text-center text-[#DC9B83] mb-12">
        {t('fatwasAndGuidance')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {localizedItems.map(({ category, title, text }, i) => {
          // Determine colors for category badges and card border/text
          let badgeClasses = "";
          let cardBorder = "";
          let titleColor = "text-[#DC9B83]";
          let textColor = "text-[#4A4A4A]";

          if (category === "quran") {
            badgeClasses = "bg-[#E8BCA8] text-[#4A4A4A]";
            cardBorder = "border-[#E8BCA8]";
          } else if (category === "hadith") {
            badgeClasses = "bg-[#DC9B83] text-white";
            cardBorder = "border-[#DC9B83]";
          } else if (category === "scholar") {
            badgeClasses = "bg-transparent text-[#000000] border border-[#E8BCA8]";
            cardBorder = "border-[#E8BCA8]";
            titleColor = "text-[#000000]";
            textColor = "text-[#4A4A4A]";
          }

          return (
            <div
              key={i}
              className={`bg-white rounded-2xl p-6 shadow-sm border ${cardBorder} text-[#4A4A4A]
                transform transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg cursor-pointer`}
            >
              <div
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3
                  ${badgeClasses} ${category === "scholar" ? "border" : ""}`}
              >
                {t(category)}
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${titleColor}`}>{title}</h3>
              <p className={`text-sm leading-relaxed ${textColor}`}>{text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
});

export default Fatwas;
