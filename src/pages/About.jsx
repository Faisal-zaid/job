import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Award,
  Globe2,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Target,
  Heart,
  Lightbulb,
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const stats = [
    { icon: Users, value: "50K+", label: "Active Job Seekers" },
    { icon: Globe2, value: "120+", label: "Countries Supported" },
    { icon: Award, value: "15K+", label: "Companies Hiring" },
    { icon: TrendingUp, value: "98%", label: "Success Rate" },
  ];

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To bridge the gap between talented professionals and world-class opportunities, making career growth accessible to everyone.",
    },
    {
      icon: Heart,
      title: "Our Values",
      description:
        "We believe in transparency, integrity, and putting people first. Every connection we facilitate is built on trust and mutual benefit.",
    },
    {
      icon: Lightbulb,
      title: "Our Vision",
      description:
        "To become the global leader in connecting talent with opportunity, creating a world where everyone can do meaningful work.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Emily Williams",
      role: "Head of Product",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "David Brown",
      role: "Head of Growth",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* HERO SECTION */}
      <section className="relative bg-slate-900 py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-600/20 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[100px] rounded-full" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            <span className="inline-block px-4 py-2 bg-indigo-600/20 text-indigo-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              About JobsConnect
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-6">
              Building The Future of{" "}
              <span className="text-indigo-400">Work</span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
              We're on a mission to transform how people find jobs and how
              companies find talent. Join us in reshaping the global workforce.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative -mt-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 text-center">
                <div className="w-14 h-14 mx-auto bg-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-3xl font-black text-slate-900">
                  {stat.value}
                </p>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16">
            <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs">
              Our Philosophy
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mt-4">
              What Drives <span className="text-indigo-600">Us</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic mb-4">
                  {value.title}
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mt-4 mb-6">
                Thousands of Success{" "}
                <span className="text-indigo-600">Stories</span>
              </h2>
              <p className="text-slate-600 font-medium leading-relaxed mb-8">
                JobsConnect has helped countless professionals find their dream
                jobs and helped companies build their dream teams. Here's why
                leading organizations trust us:
              </p>

              <ul className="space-y-4">
                {[
                  "AI-Powered Job Matching Algorithm",
                  "Verified Employer Profiles",
                  "Real-Time Application Tracking",
                  "24/7 Professional Support",
                  "Resume Builder & Optimization",
                  "Interview Preparation Resources",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-indigo-600 rounded-[40px] rotate-3" />
              <div className="relative bg-slate-900 rounded-[40px] p-8 md:p-12">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <p className="text-4xl font-black text-white italic">
                      10M+
                    </p>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-2">
                      Job Applications
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-black text-white italic">
                      500K+
                    </p>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-2">
                      Hires Made
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-black text-white italic">98%</p>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-2">
                      Satisfaction
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-black text-white italic">4.9</p>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-2">
                      User Rating
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16">
            <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs">
              Meet The Team
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mt-4">
              The Minds Behind{" "}
              <span className="text-indigo-600">JobsConnect</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-6 text-center shadow-lg border border-slate-100 hover:shadow-xl transition-all">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-4 border-indigo-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-black text-slate-900 uppercase italic">
                  {member.name}
                </h3>
                <p className="text-indigo-600 text-xs font-bold uppercase tracking-wider mt-1">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-[48px] p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-600 rounded-full blur-[120px] opacity-20" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-600 rounded-full blur-[120px] opacity-20" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-6">
                Ready to Get <span className="text-indigo-400">Started</span>?
              </h2>
              <p className="text-slate-400 max-w-lg mx-auto mb-10 font-medium">
                Join thousands of job seekers and employers who have already
                transformed their careers and businesses with JobsConnect.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-indigo-400 hover:text-white transition-all">
                  Create Free Account
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/20 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white hover:text-slate-900 transition-all">
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
