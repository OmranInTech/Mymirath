import React from "react";
import Footer from "../components/Footer";
import omranPhoto from "../assets/images/omran.png";

const About = () => {
  return (
    <>
      {/* Force LTR to prevent flipping in RTL languages */}
      <div dir="ltr">
        <main className="min-h-screen bg-white py-16 px-6 md:px-20 flex flex-col gap-24 text-left">
          
          {/* Hero Section */}
          <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
            {/* Photo */}
            <div className="flex-shrink-0 relative">
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden shadow-2xl border-4 border-[#DC9B83] transition-transform transform hover:scale-105 duration-500 animate-fade-in">
                <img
                  src={omranPhoto}
                  alt="Omran Ahmadzai"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#DC9B83] tracking-tight text-left">
                About <span className="text-[#E8BCA8]">MyMirath</span>
              </h1>
              <p className="text-lg md:text-xl text-[#4A4A4A] leading-relaxed text-left">
                MyMirath is a modern, Shariah-compliant Islamic inheritance calculator. 
                It helps Muslims accurately calculate inheritance shares according to Quranic and Fiqh principles with a simple and intuitive interface.
              </p>
            </div>
          </section>

          {/* Info Cards */}
          <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">

            {/* Mission Card */}
            <div className="bg-[#FFF1EB] rounded-3xl p-8 shadow-xl border border-[#EADBD3] flex flex-col items-center text-center transform transition-transform duration-500 hover:-translate-y-3 hover:shadow-2xl animate-slide-up text-left">
              <h2 className="text-2xl font-semibold text-[#DC9B83] mb-4">Our Mission</h2>
              <p className="text-[#4A4A4A] leading-relaxed">
                To make Islamic inheritance calculations accessible, accurate, and clear for all Muslims, ensuring Shariah compliance in every step.
              </p>
            </div>

            {/* Features Card */}
            <div className="bg-[#FFF1EB] rounded-3xl p-8 shadow-xl border border-[#EADBD3] flex flex-col items-center text-center transform transition-transform duration-500 hover:-translate-y-3 hover:shadow-2xl animate-slide-up delay-100 text-left">
              <h2 className="text-2xl font-semibold text-[#DC9B83] mb-4">Features</h2>
              <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2 text-left">
                <li>Intuitive inheritance calculator</li>
                <li>Supports all common and special family cases</li>
                <li>Fast, accurate, and fully Shariah-compliant</li>
                <li>Print and save inheritance reports easily</li>
              </ul>
            </div>

            {/* Developer Card */}
            <div className="bg-[#FFF1EB] rounded-3xl p-8 shadow-xl border border-[#EADBD3] flex flex-col items-center text-center transform transition-transform duration-500 hover:-translate-y-3 hover:shadow-2xl animate-slide-up delay-200 text-left">
              <h2 className="text-2xl font-semibold text-[#DC9B83] mb-4">About the Developer</h2>
              <p className="text-[#4A4A4A] leading-relaxed mb-4">
                Created by <strong>Omran Ahmadzai</strong>, a passionate software engineer dedicated to building tools that serve the Ummah. 
                MyMirath reflects his commitment to simplicity, accuracy, and reliability.
              </p>
              <button className="mt-auto bg-[#DC9B83] text-white px-6 py-2 rounded-full hover:bg-[#E8BCA8] transition-all duration-300 shadow-md">
                Learn More
              </button>
            </div>

          </section>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default About;
