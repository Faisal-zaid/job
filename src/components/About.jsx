import React from "react";
import { motion } from "framer-motion"; // Import motion
import FeatureCard from "./FeatureCard";
import { Lock, Zap, ShieldHalf, ChartColumn, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Cards will pop in one by one
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 20 },
  },
};

const About = () => {
  const features = [
    {
      icon: Lock,
      title: "Secure Payments",
      description:
        "Escrow protection ensures you get paid for every completed project",
    },
    {
      icon: Zap,
      title: "Fast Matching",
      description:
        "AI-powered job recommendations based on your skills and preferences",
    },
    {
      icon: ShieldHalf,
      title: "Verified Network",
      description:
        "Exclusive community of verified high-tier workers and premium clients",
    },
    {
      icon: ChartColumn,
      title: "Real-Time Analytics",
      description:
        "Track your earnings, performance metrics, and client ratings",
    },
  ];

  return (
    <>
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase italic tracking-tighter leading-none mb-6">
              Engineering <br />
              <span className="text-indigo-600 font-black">
                The Modern Workspace
              </span>
            </h2>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em]">
              Everything you need to scale your freelance career
            </p>
          </motion.div>

          {/* FEATURES GRID WITH STAGGER */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION - Smooth Scale & Fade */}
      <section className="pb-32 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 15,
            mass: 1.2,
          }}
          className="max-w-6xl mx-auto bg-slate-900 rounded-[48px] p-12 md:p-24 relative overflow-hidden shadow-2xl shadow-indigo-200">
          {/* Decorative glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-20" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase italic tracking-tighter">
              Ready To Work <br /> Your Future?
            </h2>
            <p className="text-slate-400 max-w-lg text-sm md:text-base font-medium mb-10 leading-relaxed">
              Join a global community of elite creators. Earn on your own terms
              using tools designed for professional workers.
            </p>

            <Link
              to="/signup"
              className="group flex items-center gap-3 px-10 py-5 bg-white text-slate-900 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-indigo-500 hover:text-white transition-all shadow-xl active:scale-95">
              Get Started Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default About;
