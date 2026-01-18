import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  FileText,
  GraduationCap,
  Briefcase,
  Mail,
  Download,
  ArrowLeft,
  LogOut,
  Search,
  FilterX,
} from "lucide-react";

const EmployerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchApplications = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/employer/applications", {
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

  // Logic to filter applications based on search term
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
            {/* Real-time Search Input */}
            <div className="relative group hidden sm:block">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors"
                size={16}
              />
              <input
                type="text"
                placeholder="Search candidates or roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-800/40 border border-slate-700/50 rounded-2xl py-3 pl-12 pr-4 text-xs font-bold text-white outline-none focus:border-blue-500/50 transition-all w-64 shadow-xl"
              />
            </div>

            <button
              onClick={handleSignOut}
              className="p-4 bg-slate-800/40 border border-slate-700/50 hover:border-red-500/50 hover:text-red-500 rounded-2xl transition-all group shadow-xl"
              title="Sign Out">
              <LogOut
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </header>

        {/* Mobile Search View */}
        <div className="sm:hidden mb-8">
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800/40 border border-slate-700/50 rounded-2xl py-4 px-6 text-sm font-bold text-white outline-none focus:border-blue-500/50"
          />
        </div>

        {filteredApps.length === 0 ? (
          <div className="bg-slate-800/20 border border-dashed border-slate-700 rounded-[32px] p-20 text-center">
            {searchTerm ? (
              <FilterX className="mx-auto text-slate-700 mb-4" size={48} />
            ) : (
              <User className="mx-auto text-slate-700 mb-4" size={48} />
            )}
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
              {searchTerm
                ? `No results for "${searchTerm}"`
                : "No applicants yet"}
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {filteredApps.map((app, index) => (
              <motion.div
                key={app.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-800/40 backdrop-blur-xl border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-slate-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-1">
                      <Briefcase size={14} /> {app.job_title}
                    </div>
                    <h3 className="text-2xl font-black text-white italic uppercase tracking-tight">
                      {app.applicant_name}
                    </h3>
                  </div>

                  <div className="flex gap-3">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      New Candidate
                    </span>
                  </div>
                </div>

                <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3">
                        <GraduationCap size={16} className="text-blue-500" />{" "}
                        Education
                      </h4>
                      <p className="text-white font-bold bg-slate-900/50 p-4 rounded-xl border border-slate-700/30">
                        {app.education}
                      </p>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3">
                        <Mail size={16} className="text-blue-500" /> Cover
                        Letter
                      </h4>
                      <p className="text-slate-400 text-sm leading-relaxed italic">
                        "{app.cover_letter}"
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700/50 relative group">
                    <h4 className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">
                      <FileText size={16} className="text-blue-500" />{" "}
                      Curriculum Vitae
                    </h4>
                    <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap h-40 overflow-y-auto scrollbar-hide">
                      {app.cv}
                    </pre>
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-900 to-transparent rounded-b-2xl pointer-events-none" />

                    <button className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-500/20">
                      <Download size={14} /> Full Document
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerApplications;
