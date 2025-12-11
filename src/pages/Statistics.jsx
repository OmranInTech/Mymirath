import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaUsers, FaHome, FaSmile } from "react-icons/fa";

const StatisticCard = ({ icon, title, number, animate, delay }) => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (animate) {
      setVisible(true);
      let start = 0;
      const duration = 1500;
      const increment = number / (duration / 50);

      const counter = setInterval(() => {
        start += increment;
        if (start >= number) {
          start = number;
          clearInterval(counter);
        }
        setCount(Math.floor(start));
      }, 50);

      return () => clearInterval(counter);
    }
  }, [animate, number]);

  return (
    <div
      className={`flex-1 bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-[#EADBD3] flex flex-col items-center justify-center gap-3 transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <div className="w-14 h-14 flex items-center justify-center bg-[#fdf4f0] rounded-full text-3xl text-[#ffb195] animate-bounce-slow">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-semibold text-black text-center">
        {title}
      </h3>
      <p className="text-2xl md:text-3xl font-bold text-[#2e2e2e]">{count}</p>
    </div>
  );
};

const Statistics = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimate(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const stats = [
    { icon: <FaUsers />, title: t("users"), number: 1200 },
    { icon: <FaHome />, title: t("calculations"), number: 3500 },
    { icon: <FaSmile />, title: t("happiness"), number: 98 },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-12 px-4 bg-[#FFF1EB] flex flex-col items-center"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-black text-center mb-10">
        {t("Statistics")}
      </h2>
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6 justify-center items-stretch">
        {stats.map((stat, idx) => (
          <StatisticCard
            key={idx}
            icon={stat.icon}
            title={stat.title}
            number={stat.number}
            animate={animate}
            delay={idx * 150}
          />
        ))}
      </div>
    </section>
  );
};

export default Statistics;
