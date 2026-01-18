import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ------------------ STAT ITEM ------------------ */
const StatItem = ({ val, lab }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const numericValue = parseInt(val.replace(/\D/g, ""));
  const suffix = val.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const duration = 2000;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * numericValue));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isInView, numericValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <p className="text-4xl font-black text-slate-900">
        {count}
        {suffix}
      </p>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
        {lab}
      </p>
    </motion.div>
  );
};

/* ------------------ HEADER ------------------ */
function Header() {
  const navigate = useNavigate();

  return (
    <>
      {/* HERO */}
      <div className="relative bg-[url('/Home1.jpg')] bg-cover bg-center h-screen flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-black text-white uppercase italic"
          >
            Find Your Next <br />
            <span className="text-indigo-400">Landing Job</span>
          </motion.h1>

          <p className="text-slate-200 mt-6 text-lg">
            Discover verified opportunities and grow your career.
          </p>

          {/* 🔥 THESE BUTTONS REPLACE OLD HOME BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button
              onClick={() => navigate("/jobs")}
              className="bg-white text-black px-8 py-4 rounded-xl font-bold"
            >
              Browse Jobs
            </button>

            <button
              onClick={() => navigate("/register")}
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/login")}
              className="border border-white text-white px-8 py-4 rounded-xl font-bold"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* STATS / ABOUT PREVIEW */}
      <section id="About" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <StatItem val="5+" lab="Years Experience" />
          <StatItem val="5M+" lab="Users" />
          <StatItem val="$100M+" lab="Paid Out" />
          <StatItem val="99%" lab="Satisfaction" />
        </div>
      </section>
    </>
  );
}

export default Header;
