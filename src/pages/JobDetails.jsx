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
  FileText,
  User,
  CheckCircle2,
  X,
  AlertCircle,
} from "lucide-react";

// --- Integrated Toast for feedback ---
const Toast = ({ message, type, onClear }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${
      type === "success"
        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
        : "bg-rose-500/10 border-rose-500/20 text-rose-400"
    }`}>
    {type === "success" ? (
      <CheckCircle2 size={18} />
    ) : (
      <AlertCircle size={18} />
    )}
    <p className="text-xs font-black uppercase tracking-wider">{message}</p>
    <button onClick={onClear} className="ml-2 hover:text-white">
      <X size={14} />
    </button>
  </motion.div>
);

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  const [form, setForm] = useState({
    name: "",
    education: "form4",
    cvText: "",
    coverLetter: "",
  });

  const token = localStorage.getItem("token");

  const showNotification = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/jobs/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error("Failed to load job");
        const data = await res.json();
        setJob(data);
      } catch (err) {
        setError("Opportunity no longer available.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, token]);

  const handleApply = async () => {
    if (!form.name || !form.cvText || !form.coverLetter) {
      showNotification("Please complete all fields", "error");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          job_id: job.id,
          applicant_name: form.name,
          education: form.education,
          cv: form.cvText,
          cover_letter: form.coverLetter,
        }),
      });

      if (res.ok) {
        showNotification("Application Sent Successfully!");
        setForm({ name: "", education: "form4", cvText: "", coverLetter: "" });
      } else {
        showNotification("Submission failed", "error");
      }
    } catch (error) {
      showNotification("Server error", "error");
    }
  };

  const inputStyle =
    "w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all";

  if (loading)
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0f172a] pt-24 pb-12 px-6 md:px-12 lg:px-24 text-slate-200">
      {/* Toast Portal */}
      <div className="fixed top-8 right-8 z-[100]">
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

      <div className="max-w-7xl mx-auto relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors uppercase text-[10px] font-black tracking-[0.2em] mb-8">
          <ArrowLeft size={16} /> Back to Search
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: JOB PROFILE */}
          <div className="lg:col-span-7">
            <h2 className="text-5xl font-extrabold text-white tracking-tighter uppercase italic mb-4">
              {job.title}
            </h2>
            <div className="flex flex-wrap gap-6 mb-8">
              <span className="flex items-center gap-2 text-blue-400 font-bold uppercase text-xs tracking-widest">
                <Building2 size={16} /> {job.company_name}
              </span>
              <span className="flex items-center gap-2 text-slate-400 font-bold uppercase text-xs tracking-widest">
                <MapPin size={16} /> {job.location || "Remote"}
              </span>
              <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase text-xs tracking-widest">
                <Briefcase size={16} /> {job.job_type}
              </span>
            </div>

            <div className="space-y-8 bg-slate-800/20 rounded-[32px] p-8 border border-white/5">
              <div>
                <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-4">
                  The Role
                </h4>
                <p className="text-slate-300 leading-relaxed text-lg">
                  {job.description}
                </p>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-2xl border border-slate-700/30">
                <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase">
                    Minimum Education
                  </p>
                  <p className="text-white font-bold uppercase">
                    {job.education}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: APPLICATION FORM */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/40 backdrop-blur-xl p-8 rounded-[40px] border border-white/10 shadow-2xl sticky top-28">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-600/20">
                  <Send size={20} />
                </div>
                <h3 className="text-2xl font-black text-white italic uppercase tracking-tight">
                  Apply Now
                </h3>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2">
                    Full Name
                  </label>
                  <input
                    className={inputStyle}
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2">
                    Highest Education
                  </label>
                  <select
                    className={inputStyle}
                    value={form.education}
                    onChange={(e) =>
                      setForm({ ...form, education: e.target.value })
                    }>
                    <option value="form4">Form 4</option>
                    <option value="degree">Degree</option>
                    <option value="masters">Masters</option>
                    <option value="phd">PhD</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2 flex justify-between">
                    <span>Curriculum Vitae</span>
                    <span className="text-blue-500">Paste Text</span>
                  </label>
                  <textarea
                    className={`${inputStyle} h-32 resize-none`}
                    placeholder="Highlight your experience..."
                    value={form.cvText}
                    onChange={(e) =>
                      setForm({ ...form, cvText: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2">
                    Cover Letter
                  </label>
                  <textarea
                    className={`${inputStyle} h-32 resize-none`}
                    placeholder="Why are you a good fit?"
                    value={form.coverLetter}
                    onChange={(e) =>
                      setForm({ ...form, coverLetter: e.target.value })
                    }
                  />
                </div>

                <button
                  onClick={handleApply}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-[20px] shadow-xl transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-xs mt-4">
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
