import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Building2,
  Clock,
  ArrowRight,
  TrendingUp,
  Users,
  Globe2,
  Award,
  ChevronRight,
} from "lucide-react";
import JobCard from "../components/JobCard";

function Home() {
  const navigate = useNavigate();
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentJobs = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/jobs");
        const data = await res.json();
        if (Array.isArray(data)) {
          // Get only the 3 most recent jobs
          setRecentJobs(data.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentJobs();
  }, []);

  const stats = [
    { icon: Users, value: "50K+", label: "Active Job Seekers" },
    { icon: Briefcase, value: "15K+", label: "Companies Hiring" },
    { icon: Globe2, value: "120+", label: "Countries" },
    { icon: Award, value: "98%", label: "Success Rate" },
  ];

  const categories = [
    { name: "Technology", count: 1250, icon: "💻", color: "bg-blue-500" },
    { name: "Marketing", count: 890, icon: "📢", color: "bg-pink-500" },
    { name: "Design", count: 650, icon: "🎨", color: "bg-purple-500" },
    { name: "Sales", count: 780, icon: "💼", color: "bg-emerald-500" },
    { name: "Finance", count: 420, icon: "💰", color: "bg-amber-500" },
    { name: "Healthcare", count: 560, icon: "🏥", color: "bg-red-500" },
  ];

  return (
    <div className="relative z-0">
      {/* HERO SECTION */}
      <section className="relative bg-[url('/Home1.jpg')] bg-cover bg-center min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-indigo-600/20 text-indigo-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <TrendingUp size={14} />
              #1 Job Platform in 2025
            </span>

            <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none mb-6">
              Find Your Next <br />
              <span className="text-indigo-400">Dream Job</span>
            </h1>

            <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-2xl">
              Connect with top employers and discover opportunities that match
              your skills. Join millions of professionals who found their dream
              careers through JobsConnect.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/jobs")}
                className="group flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-xl shadow-indigo-600/30">
                Browse Jobs
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <button
                onClick={() => navigate("/register")}
                className="group flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all">
                Get Started
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-slate-500 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600/20 rounded-2xl mb-4">
                  <stat.icon className="w-8 h-8 text-indigo-400" />
                </div>
                <p className="text-3xl md:text-4xl font-black text-white uppercase italic">
                  {stat.value}
                </p>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16">
            <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs">
              Browse by Category
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mt-4">
              Find Your <span className="text-indigo-600">Perfect Fit</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => navigate("/jobs")}
                className="bg-white rounded-3xl p-6 text-center shadow-lg border border-slate-100 cursor-pointer hover:shadow-xl transition-all group">
                <div
                  className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="font-black text-slate-900 uppercase italic mb-1">
                  {category.name}
                </h3>
                <p className="text-slate-500 text-xs font-bold">
                  {category.count.toLocaleString()} Jobs
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT JOBS SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs">
                Latest Opportunities
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mt-4">
                Recent <span className="text-indigo-600">Jobs</span>
              </h2>
            </div>

            <button
              onClick={() => navigate("/jobs")}
              className="group flex items-center gap-2 mt-6 md:mt-0 text-slate-600 hover:text-indigo-600 font-bold uppercase text-xs tracking-widest transition-colors">
              View All Jobs
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </motion.div>

          {loading ? (
            <div className="grid gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-slate-900 rounded-3xl p-8 animate-pulse">
                  <div className="flex gap-5">
                    <div className="w-14 h-14 bg-slate-700 rounded-2xl" />
                    <div className="flex-1">
                      <div className="h-6 bg-slate-700 rounded w-1/3 mb-2" />
                      <div className="h-4 bg-slate-700 rounded w-1/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentJobs.length > 0 ? (
            <div className="grid gap-6">
              {recentJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}>
                  <JobCard
                    job={{
                      ...job,
                      company: job.company || {
                        name: job.company_name || "Company",
                      },
                    }}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 rounded-3xl p-12 text-center">
              <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-black text-slate-900 uppercase italic mb-2">
                No Jobs Available
              </h3>
              <p className="text-slate-500 font-medium">
                Check back later for new opportunities.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600/20 blur-[100px] rounded-full" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}>
            <span className="inline-block px-4 py-2 bg-indigo-600/20 text-indigo-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Ready to Get Started?
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-6">
              Your Dream Job is <span className="text-indigo-400">Waiting</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed mb-10">
              Join thousands of job seekers who found their perfect career
              through JobsConnect. Create your profile, set your preferences,
              and let the opportunities come to you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/register")}
                className="group flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-xl">
                Create Free Account
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button
                onClick={() => navigate("/about")}
                className="group flex items-center justify-center gap-3 bg-transparent border-2 border-white/20 hover:border-white text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all">
                Learn More
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
