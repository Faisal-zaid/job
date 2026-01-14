import React from "react";
import { motion } from "framer-motion";

function Header() {
  return (
    <>
      {/* HERO SECTION */}
      <div className="relative bg-[url('/Home1.jpg')] bg-cover bg-center h-screen w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Darker overlay for better text readability */}
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />

        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-7xl md:text-[92px] font-black text-white leading-[0.9] tracking-tighter italic uppercase">
            Find Your Next <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
              LANDING JOB
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-slate-200 text-lg md:text-xl font-medium mt-8 max-w-2xl mx-auto drop-shadow-md">
            Join thousands of job seekers and professionals worldwide. Discover
            verified opportunities, define your career path, work on your own
            terms, and maximize your earning potential.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a
              href="#"
              className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-indigo-500 hover:text-white transition-all shadow-2xl">
              JOIN US
            </a>
            <a
              href="#"
              className="bg-slate-900/40 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-white/20 transition-all">
              POST JOBS
            </a>
          </motion.div>
        </div>

        {/* Subtle bottom fade */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* ABOUT SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative py-24 px-6 md:px-20 lg:px-32 max-w-7xl mx-auto overflow-hidden"
        id="About">
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
            <div className="grid grid-cols-2 gap-8">
              {[
                { val: "5+", lab: "Years of Excellence" },
                { val: "5M+", lab: "Active Employees" },
                { val: "$100M+", lab: "Paid Out" },
                { val: "99%", lab: "Satisfaction" },
              ].map((stat, i) => (
                <div key={i} className="group">
                  <p className="text-4xl md:text-5xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {stat.val}
                  </p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">
                    {stat.lab}
                  </p>
                </div>
              ))}
            </div>

            <div className="h-[1px] w-full bg-slate-100 my-10" />

            <p className="text-slate-600 leading-relaxed font-medium mb-10 italic">
              We provide an ecosystem where talent meets opportunity. Our
              mission is to democratize access to high-quality job opportunities
              while ensuring a fair, transparent, and trustworthy earning
              environment for every user.
            </p>

            <button className="group flex items-center gap-4 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-indigo-600 transition-all shadow-xl">
              Learn More
              <div className="w-6 h-[2px] bg-white group-hover:w-10 transition-all" />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}


export default Header;
