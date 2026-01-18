import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  MapPin,
  GraduationCap,
  Building2,
  ArrowLeft,
  Send,
  CheckCircle2,
  X,
  AlertCircle,
  Bookmark,
} from "lucide-react";

const Toast = ({ message, type, onClear }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${
      type === "success"
        ? "bg-white border-emerald-100 text-emerald-600"
        : "bg-white border-rose-100 text-rose-600"
    }`}>
    {type === "success" ? (
      <CheckCircle2 size={18} />
    ) : (
      <AlertCircle size={18} />
    )}
    <p className="text-sm font-bold">{message}</p>
    <button onClick={onClear} className="ml-2 hover:opacity-70">
      <X size={14} />
    </button>
  </motion.div>
);

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    name: "",
    education: "degree",
    cvText: "",
    coverLetter: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/jobs/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, token]);

  const showNotification = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleApply = async () => {
    if (!form.name || !form.cvText)
      return showNotification("Name and CV required", "error");
    showNotification("Application submitted successfully!");
  };

  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* THEMED BLUE HEADER SECTION */}
      <div className="bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-900 pt-32 pb-48 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        {/* Decorative subtle circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full -ml-10 -mb-10 blur-2xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-indigo-100/70 hover:text-white transition-colors text-sm font-bold mb-8 group">
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Dashboard
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest">
                  Featured Opportunity
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                {job.title}
              </h2>
              <div className="flex flex-wrap gap-4 mt-6">
                <span className="flex items-center gap-2 text-indigo-100 font-medium">
                  <Building2 size={18} className="text-indigo-400" />{" "}
                  {job.company_name}
                </span>
                <span className="flex items-center gap-2 text-indigo-100 font-medium">
                  <MapPin size={18} className="text-indigo-400" />{" "}
                  {job.location || "Remote"}
                </span>
              </div>
            </div>

            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl transition-all font-bold">
              <Bookmark size={20} /> Save Job
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT OVERLAP SECTION */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 -mt-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: INFO */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-xl shadow-indigo-900/5 border border-slate-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-1 bg-indigo-600 rounded-full" />
                <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">
                  Role Overview
                </h4>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
                {job.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                <div className="flex items-center gap-4 p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                  <div className="p-3 bg-white text-indigo-600 rounded-xl shadow-sm">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">
                      Education
                    </p>
                    <p className="text-indigo-900 font-bold">{job.education}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                  <div className="p-3 bg-white text-indigo-600 rounded-xl shadow-sm">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">
                      Job Type
                    </p>
                    <p className="text-indigo-900 font-bold">{job.job_type}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-[32px] shadow-2xl shadow-indigo-900/10 border border-slate-100 sticky top-28">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Apply Now
                </h3>
                <Send className="text-indigo-600" size={24} />
              </div>

              <div className="space-y-4">
                <div className="group">
                  <label className="text-[11px] font-bold text-slate-500 ml-1 mb-1 block uppercase">
                    Full Name
                  </label>
                  <input
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 outline-none transition-all"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 ml-1 mb-1 block uppercase">
                    Experience / CV
                  </label>
                  <textarea
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 h-32 resize-none outline-none focus:border-indigo-600 transition-all"
                    placeholder="Paste your CV or experience summary..."
                    value={form.cvText}
                    onChange={(e) =>
                      setForm({ ...form, cvText: e.target.value })
                    }
                  />
                </div>

                <button
                  onClick={handleApply}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] mt-2 uppercase tracking-widest text-xs">
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <AnimatePresence>
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClear={() => setToast(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JobDetails;
