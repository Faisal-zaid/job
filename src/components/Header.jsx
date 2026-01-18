header;
import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// --- Sub-component for Counting Animation (Keep as is) ---
const StatItem = ({ val, lab }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const numericValue = parseInt(val.replace(/\D/g, ""));
  const suffix = val.replace(/[0-9]/g, "");

  useEffect(() => {
    if (isInView) {
      let startTime = null;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / 2000, 1);
        setCount(Math.floor(progress * numericValue));
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, numericValue]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className="group">
      <p className="text-4xl md:text-5xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
        {count}
        {suffix}
      </p>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">
        {lab}
      </p>
    </motion.div>
  );
};

// --- Main Header Component ---
function Header() {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <>
      {/* HERO SECTION */}
      <div className="relative bg-[url('/Home1.jpg')] bg-cover bg-center h-screen w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* z-index set lower than Navbar's z-50 */}
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] z-0" />

        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-7xl md:text-[92px] font-black text-white leading-[0.9] tracking-tighter italic uppercase">
            Find Your Next <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
              LANDING JOB
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1.5 }}
            className="text-slate-200 text-lg md:text-xl font-medium mt-8 max-w-2xl mx-auto drop-shadow-md">
            Join thousands of job seekers and professionals worldwide. Discover
            verified opportunities, define your career path, and maximize your
            earning potential.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12 relative z-20">
            {/* Functional Buttons using navigate */}
            <button
              onClick={() => navigate("/register")}
              className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-indigo-500 hover:text-white transition-all shadow-2xl active:scale-95">
              JOIN US
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-slate-900/40 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-white/20 transition-all active:scale-95">
              POST JOBS
            </button>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* ABOUT SECTION */}
      <section className="overflow-x-hidden relative z-0">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 40, damping: 20 }}
          className="relative py-24 px-6 md:px-20 lg:px-32 max-w-7xl mx-auto"
          id="About">
          {/* ... Rest of your About UI remains the same ... */}
          <div className="flex flex-col items-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase italic tracking-tighter">
              About <span className="text-indigo-600">Us</span>
            </h2>
            <div className="w-24 h-2 bg-indigo-600 mt-4 rounded-full" />
            <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.3em] mt-6">
              Pioneering the Future of Freelance
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="relative group w-full lg:w-1/2">
              <div className="absolute -inset-4 bg-indigo-100 rounded-[100px] rotate-3 group-hover:rotate-0 transition-transform duration-500" />
              <img
                src={"about.jpg"}
                alt="About Us"
                className="relative w-full aspect-square object-cover rounded-[80px] shadow-2xl"
              />
            </div>

            <div className="w-full lg:w-1/2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
                  },
                }}
                className="grid grid-cols-2 gap-8">
                <StatItem val="5+" lab="Years of Excellence" />
                <StatItem val="5M+" lab="Active Employees" />
                <StatItem val="$100M+" lab="Paid Out" />
                <StatItem val="99%" lab="Satisfaction" />
              </motion.div>
              <div className="h-[1px] w-full bg-slate-100 my-10" />
              <p className="text-slate-600 leading-relaxed font-medium mb-10 italic">
                We provide an ecosystem where talent meets opportunity.
              </p>
              <button
                onClick={() => navigate("/about")}
                className="group flex items-center gap-4 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-indigo-600 transition-all shadow-xl">
                Learn More
                <div className="w-6 h-[2px] bg-white group-hover:w-10 transition-all" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}

export default Header;
