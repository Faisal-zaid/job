import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  Trash2,
  Users,
  Briefcase,
  MapPin,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  X,
  DollarSign,
  ExternalLink,
  LogOut,
} from "lucide-react";

// --- Custom Toast Component ---
const Toast = ({ message, type, onClear }) => {
  const configs = {
    success: {
      icon: <CheckCircle2 size={18} />,
      color: "text-emerald-400",
      border: "border-emerald-500/20",
      bg: "bg-emerald-500/10",
    },
    warning: {
      icon: <AlertTriangle size={18} />,
      color: "text-amber-400",
      border: "border-amber-500/20",
      bg: "bg-amber-500/10",
    },
    error: {
      icon: <AlertCircle size={18} />,
      color: "text-rose-400",
      border: "border-rose-500/20",
      bg: "bg-rose-500/10",
    },
  };
  const config = configs[type] || configs.success;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${config.bg} ${config.border} ${config.color}`}>
      {config.icon}
      <p className="text-[11px] font-black uppercase tracking-wider">
        {message}
      </p>
      <button
        onClick={onClear}
        className="ml-2 hover:brightness-125 transition-all">
        <X size={14} />
      </button>
    </motion.div>
  );
};

// --- Custom Confirmation Modal ---
const ConfirmModal = ({ isOpen, onConfirm, onCancel, title }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-[32px] shadow-2xl">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6">
            <AlertCircle size={32} />
          </div>
          <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic mb-2">
            Delete Position?
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Confirming will remove{" "}
            <span className="text-white font-bold italic">"{title}"</span>. This
            action is irreversible.
          </p>
          <div className="flex gap-4">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-4 rounded-xl bg-slate-800 text-slate-300 font-bold uppercase text-[10px] tracking-widest hover:bg-slate-700 transition-all">
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-4 rounded-xl bg-red-600 text-white font-bold uppercase text-[10px] tracking-widest hover:bg-red-500 shadow-[0_10px_20px_-5px_rgba(220,38,38,0.4)] transition-all active:scale-95">
              Confirm
            </button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [toast, setToast] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    jobId: null,
    jobTitle: "",
  });
  const [form, setForm] = useState({
    title: "",
    description: "",
    job_type: "remote",
    education: "form4",
    company_name: "",
    location: "",
    salary_min: "",
    salary_max: "",
  });

  const token = localStorage.getItem("token");

  // Authentication Guard
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const showNotification = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      setJobs([]);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/employer/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setApplications(data.applications || []);
    } catch (err) {
      setApplications([]);
    }
  };

  useEffect(() => {
    if (token) {
      fetchJobs();
      fetchApplications();
    }
  }, [token]);

  const handleAddJob = async () => {
    if (!form.title || !form.description || !form.company_name) {
      showNotification("Fill all required fields", "warning");
      return;
    }
    try {
      const res = await fetch("http://127.0.0.1:5000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          salary_min: form.salary_min ? Number(form.salary_min) : null,
          salary_max: form.salary_max ? Number(form.salary_max) : null,
        }),
      });
      if (res.ok) {
        showNotification("Job published successfully!");
        setForm({
          title: "",
          description: "",
          job_type: "remote",
          education: "form4",
          company_name: "",
          location: "",
          salary_min: "",
          salary_max: "",
        });
        fetchJobs();
      } else {
        showNotification("Failed to post job", "error");
      }
    } catch (err) {
      showNotification("Server error", "error");
    }
  };

  const handleDeleteRequest = (job) => {
    setDeleteModal({ isOpen: true, jobId: job.id, jobTitle: job.title });
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/jobs/${deleteModal.jobId}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } },
      );
      if (res.ok) {
        showNotification("Listing deleted", "success");
        fetchJobs();
      }
    } catch (err) {
      showNotification("Error deleting job", "error");
    }
    setDeleteModal({ isOpen: false, jobId: null, jobTitle: "" });
  };

  const inputStyle =
    "w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all";

  return (
    <div className="min-h-screen relative bg-[#0f172a] pt-24 pb-12 px-6 md:px-12 lg:px-24 font-sans text-slate-200">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Notifications */}
      <div className="fixed top-8 right-8 z-[120] pointer-events-none">
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

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title={deleteModal.jobTitle}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModal({ ...deleteModal, isOpen: false })}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-4xl font-extrabold text-white tracking-tighter uppercase italic">
              Employer <span className="text-blue-500">Dashboard</span>
            </h2>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em] mt-1">
              Personnel Management Portal
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Navigation to Applications */}
            <button
              onClick={() => navigate("/employer/applications")}
              className="group flex items-center gap-3 bg-blue-500/10 hover:bg-blue-500 border border-blue-500/20 hover:border-blue-400 px-6 py-3 rounded-2xl transition-all duration-300 shadow-xl">
              <div className="bg-blue-500 group-hover:bg-white p-2 rounded-lg transition-colors">
                <Users
                  size={16}
                  className="text-white group-hover:text-blue-500"
                />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-white font-black uppercase text-[10px] tracking-widest leading-none">
                  View All
                </p>
                <p className="text-blue-400 group-hover:text-blue-100 font-bold text-[9px] uppercase tracking-tighter mt-1">
                  Applications
                </p>
              </div>
              <ExternalLink
                size={14}
                className="text-blue-500 group-hover:text-white ml-2 opacity-50 group-hover:opacity-100"
              />
            </button>

            {/* Logout Button */}
            <button
              onClick={handleSignOut}
              className="p-4 bg-slate-800/40 border border-slate-700/50 hover:border-red-500/50 hover:text-red-500 rounded-2xl transition-all group shadow-xl active:scale-95"
              title="Sign Out">
              <LogOut
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Create Job Section */}
          <aside className="lg:col-span-1">
            <div className="bg-slate-800/40 backdrop-blur-xl p-8 rounded-[32px] border border-white/5 sticky top-28 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <PlusCircle className="text-blue-500" /> New Posting
              </h3>
              <div className="space-y-4">
                <input
                  placeholder="Job Title"
                  className={inputStyle}
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <input
                  placeholder="Company Name"
                  className={inputStyle}
                  value={form.company_name}
                  onChange={(e) =>
                    setForm({ ...form, company_name: e.target.value })
                  }
                />
                <textarea
                  placeholder="Description"
                  className={`${inputStyle} h-24 resize-none`}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    className={inputStyle}
                    value={form.job_type}
                    onChange={(e) =>
                      setForm({ ...form, job_type: e.target.value })
                    }>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="physical">Physical</option>
                  </select>
                  <select
                    className={inputStyle}
                    value={form.education}
                    onChange={(e) =>
                      setForm({ ...form, education: e.target.value })
                    }>
                    <option value="form4">Form 4</option>
                    <option value="degree">Degree</option>
                    <option value="masters">Masters</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Min Salary"
                    className={inputStyle}
                    value={form.salary_min}
                    onChange={(e) =>
                      setForm({ ...form, salary_min: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Max Salary"
                    className={inputStyle}
                    value={form.salary_max}
                    onChange={(e) =>
                      setForm({ ...form, salary_max: e.target.value })
                    }
                  />
                </div>
                {form.job_type !== "remote" && (
                  <input
                    placeholder="Office Location"
                    className={inputStyle}
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                  />
                )}
                <button
                  onClick={handleAddJob}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)] transition-all active:scale-95 uppercase tracking-widest text-[10px]">
                  Publish Listing
                </button>
              </div>
            </div>
          </aside>

          {/* Manage Jobs Section */}
          <main className="lg:col-span-2 space-y-8">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Briefcase className="text-blue-500" /> Management
            </h3>
            {jobs.length === 0 ? (
              <div className="bg-slate-800/20 border border-dashed border-slate-700 rounded-[32px] p-20 text-center">
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                  No active listings
                </p>
              </div>
            ) : (
              jobs.map((job) => (
                <motion.div
                  key={job.id}
                  layout
                  className="bg-slate-800/40 backdrop-blur-md rounded-[32px] p-8 border border-white/5 relative group transition-all hover:bg-slate-800/60">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-2xl font-black text-white italic uppercase tracking-tight leading-none mb-3">
                        {job.title}
                      </h4>
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <MapPin size={12} className="text-blue-500" />{" "}
                          {job.location || "Remote"}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <GraduationCap size={12} className="text-blue-500" />{" "}
                          {job.education}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                          <DollarSign size={10} />{" "}
                          {job.salary_min && job.salary_max
                            ? `${job.salary_min} - ${job.salary_max}`
                            : "Negotiable"}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteRequest(job)}
                      className="p-3 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all active:scale-90">
                      <Trash2 size={20} />
                    </button>
                  </div>

                  {/* Candidate Quick List */}
                  <div className="space-y-4">
                    <h5 className="text-[10px] font-black text-blue-500 uppercase tracking-widest border-b border-slate-700/50 pb-2 flex items-center gap-2">
                      <Users size={14} /> Active Candidates (
                      {
                        applications.filter((app) => app.job_id === job.id)
                          .length
                      }
                      )
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {applications
                        .filter((app) => app.job_id === job.id)
                        .map((app) => (
                          <div
                            key={app.id}
                            className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                            <p className="text-white font-bold text-xs">
                              {app.applicant_name}
                            </p>
                            <p className="text-slate-500 text-[10px] italic mt-2 line-clamp-1">
                              "{app.cover_letter}"
                            </p>
                          </div>
                        ))}
                      {applications.filter((app) => app.job_id === job.id)
                        .length === 0 && (
                        <p className="text-slate-600 text-[10px] uppercase font-bold tracking-tighter italic">
                          Awaiting responses...
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
