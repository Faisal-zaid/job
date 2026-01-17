import React from "react";
import { motion } from "framer-motion";

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      // Smooth lift and slight scale on hover
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative p-8 bg-slate-50 rounded-[32px] border-2 border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] transition-all duration-500 overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 opacity-50" />

      <div className="relative z-10">
        {/* ICON BOX - Now with a Framer Motion spring rotation */}
        <motion.div
          whileHover={{ rotate: 12, scale: 1.1 }}
          className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm mb-8 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
          <Icon className="w-7 h-7" strokeWidth={2.5} />
        </motion.div>

        {/* CONTENT */}
        <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tight mb-4 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>

        <p className="text-slate-500 text-sm font-bold leading-relaxed opacity-80 group-hover:opacity-100">
          {description}
        </p>
      </div>

      {/* BOTTOM ACCENT BAR */}
      <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-indigo-600 group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
};

export default FeatureCard;
