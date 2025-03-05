"use client";

import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Github, Codepen, Landmark, Rocket, Atom, Mountain, PenTool, Server, Globe, Cloud, Boxes, Smartphone } from "lucide-react";

const companies = [
  { icon: Github, name: "GitCorp" },
  { icon: Codepen, name: "CodeSphere" },
  { icon: Landmark, name: "LandMark Inc." },
  { icon: Rocket, name: "RocketLabs" },
  { icon: Atom, name: "Atomic Solutions" },
  { icon: Mountain, name: "Mountain Tech" },
  { icon: PenTool, name: "PenDesign" },
  { icon: Server, name: "ServerHub" },
  { icon: Globe, name: "GlobeNet" },
  { icon: Cloud, name: "CloudWorks" },
  { icon: Boxes, name: "Boxify" },
  { icon: Smartphone, name: "Smart Solutions" },
];

const ClientsSlider = () => {
  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden bg-white py-6">
      {/* Başlık */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Bizimle Başaranlar...</h2>

      <motion.div
        className="flex marquee-content"
        animate={{ x: ["0%", "-30%"] }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        style={{ display: "flex", whiteSpace: "nowrap" }}
      >
        {[...companies, ...companies].map((company, index) => (
          <div key={index} className="flex flex-col items-center justify-center mx-4">
            {/* Hover efekti sadece ikon ve isme uygulanıyor */}
            <company.icon 
              size={48} 
              className="text-blue-400 transition-all duration-300 hover:text-blue-600" 
            />
            <span className="mt-2 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-700">
              {company.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ClientsSlider;
