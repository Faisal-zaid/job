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
  BookmarkCheck,
} from "lucide-react";

// --- Integrated Toast for feedback ---
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
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [form, setForm] = useState({
    name: "",
    education: "degree", // Default value
    cvText: "",
    coverLetter: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`https://backend-jobs-w76c.onrender.com/jobs/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error("Job not found");
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
    if (!form.name || !form.cvText || !form.coverLetter) {
      showNotification("Please complete all fields", "error");
      return;
    }

    try {
      const res = await fetch("https://backend-jobs-w76c.onrender.com/applications", {
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
        setForm({ name: "", education: "degree", cvText: "", coverLetter: "" });
        setTimeout(() => navigate("/jobseeker-dashboard"), 2000);
      } else {
        showNotification("Submission failed", "error");
      }
    } catch (error) {
      showNotification("Server error", "error");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );

  const inputStyle =
    "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 outline-none transition-all placeholder:text-slate-400";
  const labelStyle =
    "text-[11px] font-black text-slate-400 ml-1 mb-1 block uppercase tracking-wider";

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* PROFESSIONAL BLUE HEADER */}
      <div className="bg-gradient-to-br from-indigo-950 via-blue-900 to-indigo-900 pt-32 pb-48 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-indigo-200/80 hover:text-white transition-colors text-sm font-bold mb-8 group">
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Dashboard
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                {job.title}
              </h2>
              <div className="flex flex-wrap gap-5 mt-8">
                <div className="flex items-center gap-2 text-indigo-100/90 font-semibold bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                  <Building2 size={18} className="text-indigo-400" />{" "}
                  {job.company_name}
                </div>
                <div className="flex items-center gap-2 text-indigo-100/90 font-semibold bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                  <MapPin size={18} className="text-indigo-400" />{" "}
                  {job.location || "Remote"}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`flex items-center gap-2 px-6 py-4 rounded-2xl transition-all font-bold shadow-lg ${
                isBookmarked
                  ? "bg-indigo-500 text-white shadow-indigo-500/20"
                  : "bg-white/10 hover:bg-white/20 border border-white/20 text-white"
              }`}>
              {isBookmarked ? (
                <BookmarkCheck size={20} />
              ) : (
                <Bookmark size={20} />
              )}
              {isBookmarked ? "Bookmarked" : "Save Job"}
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 -mt-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: JOB INFO */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-xl shadow-indigo-950/5 border border-slate-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-1 bg-indigo-600 rounded-full" />
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  About the Position
                </h4>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line mb-10">
                {job.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="p-3 bg-white text-indigo-600 rounded-xl shadow-sm">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">
                      Education
                    </p>
                    <p className="text-indigo-950 font-bold">{job.education}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="p-3 bg-white text-indigo-600 rounded-xl shadow-sm">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">
                      Job Type
                    </p>
                    <p className="text-indigo-950 font-bold">{job.job_type}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: SUBMISSION CARD */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-[32px] shadow-2xl shadow-indigo-950/10 border border-slate-100 sticky top-28">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Quick Apply
                </h3>
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Send size={20} />
                </div>
              </div>

              <div className="space-y-4">
                {/* NAME INPUT */}
                <div>
                  <label className={labelStyle}>Full Name</label>
                  <input
                    className={inputStyle}
                    placeholder="Enter your legal name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                {/* EDUCATION SELECT - ADDED BACK HERE */}
                <div>
                  <label className={labelStyle}>Highest Education Level</label>
                  <select
                    className={inputStyle}
                    value={form.education}
                    onChange={(e) =>
                      setForm({ ...form, education: e.target.value })
                    }>
                    <option value="form4">Form 4 / High School</option>
                    <option value="diploma">Diploma</option>
                    <option value="degree">Undergraduate Degree</option>
                    <option value="masters">Master's Degree</option>
                    <option value="phd">PhD / Doctorate</option>
                  </select>
                </div>

                {/* CV TEXTAREA */}
                <div>
                  <label className={labelStyle}>Curriculum Vitae (Text)</label>
                  <textarea
                    className={`${inputStyle} h-28 resize-none`}
                    placeholder="Paste your professional experience here..."
                    value={form.cvText}
                    onChange={(e) =>
                      setForm({ ...form, cvText: e.target.value })
                    }
                  />
                </div>

                {/* COVER LETTER TEXTAREA */}
                <div>
                  <label className={labelStyle}>Cover Letter</label>
                  <textarea
                    className={`${inputStyle} h-28 resize-none`}
                    placeholder="Briefly explain why you're a good fit..."
                    value={form.coverLetter}
                    onChange={(e) =>
                      setForm({ ...form, coverLetter: e.target.value })
                    }
                  />
                </div>

                <button
                  onClick={handleApply}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] mt-2 uppercase tracking-widest text-xs">
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
