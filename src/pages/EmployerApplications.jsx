import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  FileText,
  GraduationCap,
  Briefcase,
  Mail,
  Download,
} from "lucide-react";

const EmployerApplications = () => {
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem("token");

  const fetchApplications = async () => {
    if (!token) {
      console.warn("No auth token found");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/employer/applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch applications");
      }

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

  return (
    <div className="min-h-screen bg-[#0f172a] pt-24 pb-12 px-6 md:px-12 lg:px-24 text-slate-200">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full z-0 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <header className="mb-12">
          <h2 className="text-4xl font-extrabold text-white tracking-tighter uppercase italic">
            Received <span className="text-blue-500">Applications</span>
          </h2>
          <p className="text-slate-400 font-bold uppercase text-[11px] tracking-[0.4em] mt-2">
            Reviewing {applications.length} candidates
          </p>
        </header>

        {applications.length === 0 ? (
          <div className="bg-slate-800/20 border border-dashed border-slate-700 rounded-[32px] p-20 text-center">
            <User className="mx-auto text-slate-700 mb-4" size={48} />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
              No applicants yet
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {applications.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/40 backdrop-blur-xl border border-white/5 rounded-[32px] overflow-hidden shadow-2xl"
              >
                {/* Header */}
                <div className="p-8 border-b border-slate-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-1">
                      <Briefcase size={14} /> {app.job_title}
                    </div>
                    <h3 className="text-2xl font-black text-white italic uppercase tracking-tight">
                      {app.applicant_name}
                    </h3>
                  </div>

                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    New Candidate
                  </span>
                </div>

                {/* Content */}
                <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3">
                        <GraduationCap size={16} className="text-blue-500" />
                        Education
                      </h4>
                      <p className="text-white font-bold bg-slate-900/50 p-4 rounded-xl border border-slate-700/30">
                        {app.education}
                      </p>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3">
                        <Mail size={16} className="text-blue-500" />
                        Cover Letter
                      </h4>
                      <p className="text-slate-400 text-sm leading-relaxed italic">
                        "{app.cover_letter}"
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700/50">
                    <h4 className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">
                      <FileText size={16} className="text-blue-500" />
                      CV Preview
                    </h4>

                    <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap h-40 overflow-y-auto">
                      {app.cv}
                    </pre>

                    <button className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-500/20">
                      <Download size={14} />
                      Download CV
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
