import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  FileText,
  GraduationCap,
  Briefcase,
  Mail,
  ArrowLeft,
  LogOut,
  Search,
  FilterX,
  Globe,
  Phone,
  Clock,
  CheckCircle,
} from "lucide-react";

const EmployerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchApplications = async () => {
    try {
      const res = await fetch("https://backend-jobs-w76c.onrender.com/employer/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setApplications(data.applications || []);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setApplications([]);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const filteredApps = applications.filter(
    (app) =>
      app.applicant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job_title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#0f172a] pt-24 pb-12 px-6 md:px-12 lg:px-24 text-slate-200">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full z-0 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors uppercase text-[10px] font-black tracking-[0.2em] mb-4">
              <ArrowLeft size={14} /> Return to Dashboard
            </button>
            <h2 className="text-4xl font-extrabold text-white tracking-tighter uppercase italic">
              Received <span className="text-blue-500">Applications</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group hidden sm:block">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors"
                size={16}
              />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-800/40 border border-slate-700/50 rounded-2xl py-3 pl-12 pr-4 text-xs font-bold text-white outline-none focus:border-blue-500/50 transition-all w-64 shadow-xl"
              />
            </div>
            <button
              onClick={handleSignOut}
              className="p-4 bg-slate-800/40 border border-slate-700/50 hover:border-red-500/50 hover:text-red-500 rounded-2xl transition-all shadow-xl">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        <div className="grid gap-10">
          {filteredApps.length === 0 ? (
            <div className="text-center py-20 opacity-50">
              No applications found.
            </div>
          ) : (
            filteredApps.map((app) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
                {/* Profile Header */}
                <div className="p-8 border-b border-slate-700/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center font-black text-2xl italic shadow-lg shadow-blue-500/20 text-white rotate-3">
                      {app.applicant_name ? app.applicant_name[0] : "?"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-1">
                        <Briefcase size={14} /> {app.job_title}
                      </div>
                      <h3 className="text-2xl font-black text-white italic uppercase tracking-tight">
                        {app.applicant_name}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
                    <CheckCircle size={14} /> Active Application
                  </div>
                </div>

                <div className="p-8 space-y-8">
                  {/* Candidate Profile Details */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-700/30">
                      <span className="flex items-center gap-2 text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">
                        <Globe size={12} className="text-blue-500" /> Country
                      </span>
                      <p className="text-white font-bold text-sm">
                        {app.country || "Kenya"}
                      </p>
                    </div>
                    <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-700/30">
                      <span className="flex items-center gap-2 text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">
                        <Clock size={12} className="text-blue-500" /> Age
                      </span>
                      <p className="text-white font-bold text-sm">
                        {app.age || "21"} Years
                      </p>
                    </div>
                    <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-700/30">
                      <span className="flex items-center gap-2 text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">
                        <Phone size={12} className="text-blue-500" /> Phone
                      </span>
                      <p className="text-blue-400 font-mono font-bold text-sm">
                        {app.phone_number || "N/A"}
                      </p>
                    </div>
                    <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-700/30">
                      <span className="flex items-center gap-2 text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">
                        <GraduationCap size={12} className="text-blue-500" />{" "}
                        Level
                      </span>
                      <p className="text-white font-bold text-sm">
                        {app.education || "Graduate"}
                      </p>
                    </div>
                  </div>

                  {/* DOCUMENT SECTION - BOTH SHOWING SIDE BY SIDE */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* CV CONTAINER */}
                    <div className="space-y-3">
                      <h4 className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest ml-2">
                        <FileText size={14} className="text-blue-500" />{" "}
                        Curriculum Vitae
                      </h4>
                      <div className="bg-slate-950/40 rounded-[24px] p-6 border border-slate-700/50 relative h-60 overflow-hidden group">
                        <pre className="text-[11px] text-slate-400 font-mono whitespace-pre-wrap h-full overflow-y-auto scrollbar-hide italic leading-relaxed">
                          {app.cv || "No CV content provided."}
                        </pre>
                        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
                      </div>
                    </div>

                    {/* COVER LETTER CONTAINER */}
                    <div className="space-y-3">
                      <h4 className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest ml-2">
                        <Mail size={14} className="text-blue-500" /> Cover
                        Letter
                      </h4>
                      <div className="bg-slate-950/40 rounded-[24px] p-6 border border-slate-700/50 relative h-60 overflow-hidden group">
                        <div className="text-[11px] text-slate-400 leading-relaxed italic h-full overflow-y-auto scrollbar-hide">
                          "{app.cover_letter || "No cover letter provided."}"
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerApplications;
