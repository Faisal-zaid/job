import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Users,
  Briefcase,
  TrendingUp,
  X,
  Check,
  Building2,
  MapPin,
  Clock,
  ChevronDown,
  FileText,
  Mail,
  Globe,
  Phone,
  DollarSign,
  GraduationCap,
} from "lucide-react";

const EmployerDashboard = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [expandedJob, setExpandedJob] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    job_type: "remote",
    education: "degree",
    company_name: "",
    salary_min: "",
    salary_max: "",
    location: "",
    category: "",
  });

  const token = localStorage.getItem("token");

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setJobs(data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/employer/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setApplications(data.applications || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchJobs(), fetchApplications()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleAddJob = async () => {
    if (!form.title || !form.description || !form.company_name) {
      alert("Title, Description, and Company Name are required");
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
        fetchJobs();
        setShowAddForm(false);
        setForm({
          title: "",
          description: "",
          job_type: "remote",
          education: "degree",
          company_name: "",
          salary_min: "",
          salary_max: "",
          location: "",
          category: "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    await fetch(`http://127.0.0.1:5000/jobs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchJobs();
  };

  const toggleExpanded = (jobId) =>
    setExpandedJob(expandedJob === jobId ? null : jobId);

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-24 pb-12 px-6 md:px-12 lg:px-24 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-black uppercase italic tracking-tight">
            Employer <span className="text-indigo-500">Dashboard</span>
          </h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-indigo-600 hover:bg-indigo-500 px-6 py-4 rounded-2xl font-bold uppercase text-xs flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20">
            {showAddForm ? <X size={18} /> : <Plus size={18} />}
            {showAddForm ? "Cancel Posting" : "Post New Job"}
          </button>
        </header>

        {/* --- ADD JOB FORM --- */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-12">
              <div className="bg-slate-800 border border-white/10 p-8 rounded-[32px] shadow-2xl space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Job Title */}
                  <div className="space-y-2 lg:col-span-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 ml-1">
                      Job Title *
                    </label>
                    <input
                      className="w-full bg-slate-900 border border-slate-700 p-4 rounded-xl focus:border-indigo-500 outline-none transition-all"
                      placeholder="e.g. Senior Software Engineer"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                    />
                  </div>

                  {/* Company Name */}
                  <div className="space-y-2 lg:col-span-1">
                    <label className="text-[10px] font-black uppercase text-slate-500 ml-1">
                      Company *
                    </label>
                    <input
                      className="w-full bg-slate-900 border border-slate-700 p-4 rounded-xl focus:border-indigo-500 outline-none"
                      value={form.company_name}
                      onChange={(e) =>
                        setForm({ ...form, company_name: e.target.value })
                      }
                    />
                  </div>

                  {/* Job Type Selection */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 ml-1">
                      Work Type
                    </label>
                    <select
                      className="w-full bg-slate-900 border border-slate-700 p-4 rounded-xl focus:border-indigo-500 outline-none appearance-none cursor-pointer"
                      value={form.job_type}
                      onChange={(e) =>
                        setForm({ ...form, job_type: e.target.value })
                      }>
                      <option value="remote">Remote</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="physical">Physical (On-site)</option>
                    </select>
                  </div>

                  {/* Education Requirement */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 ml-1">
                      Education Req.
                    </label>
                    <select
                      className="w-full bg-slate-900 border border-slate-700 p-4 rounded-xl focus:border-indigo-500 outline-none appearance-none cursor-pointer"
                      value={form.education}
                      onChange={(e) =>
                        setForm({ ...form, education: e.target.value })
                      }>
                      <option value="form4">Form 4 (KCSE)</option>
                      <option value="certificate">Certificate</option>
                      <option value="diploma">Diploma</option>
                      <option value="degree">Bachelor's Degree</option>
                      <option value="masters">Master's Degree</option>
                      <option value="phd">PhD</option>
                    </select>
                  </div>

                  {/* Location (Only if not remote) */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 ml-1">
                      Location / City
                    </label>
                    <input
                      className="w-full bg-slate-900 border border-slate-700 p-4 rounded-xl focus:border-indigo-500 outline-none"
                      placeholder="e.g. Nairobi, Kenya"
                      value={form.location}
                      onChange={(e) =>
                        setForm({ ...form, location: e.target.value })
                      }
                    />
                  </div>

                  {/* Salary Range Fields */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 ml-1">
                      Min Salary (KES)
                    </label>
                    <input
                      type="number"
                      className="w-full bg-slate-900 border border-slate-700 p-4 rounded-xl focus:border-indigo-500 outline-none"
                      value={form.salary_min}
                      onChange={(e) =>
                        setForm({ ...form, salary_min: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 ml-1">
                      Max Salary (KES)
                    </label>
                    <input
                      type="number"
                      className="w-full bg-slate-900 border border-slate-700 p-4 rounded-xl focus:border-indigo-500 outline-none"
                      value={form.salary_max}
                      onChange={(e) =>
                        setForm({ ...form, salary_max: e.target.value })
                      }
                    />
                  </div>

                  {/* Job Description */}
                  <div className="space-y-2 md:col-span-2 lg:col-span-3">
                    <label className="text-[10px] font-black uppercase text-slate-500 ml-1">
                      Job Description *
                    </label>
                    <textarea
                      className="w-full bg-slate-900 border border-slate-700 p-4 rounded-xl h-32 focus:border-indigo-500 outline-none resize-none"
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddJob}
                  className="bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-xl font-black uppercase text-xs flex items-center gap-2 transition-all">
                  <Check size={18} /> Publish Vacancy
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- JOBS LIST --- */}
        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-slate-800/40 border border-white/5 rounded-[40px] overflow-hidden shadow-xl">
              <div
                className="p-8 cursor-pointer"
                onClick={() => toggleExpanded(job.id)}>
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${job.job_type === "remote" ? "bg-purple-500/20 text-purple-400" : "bg-blue-500/20 text-blue-400"}`}>
                        {job.job_type}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black uppercase italic text-white leading-none">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 font-bold text-slate-500 text-xs uppercase">
                      <span className="flex items-center gap-1">
                        <Building2 size={14} /> {job.company_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {job.location || "Remote"}
                      </span>
                      <span className="flex items-center gap-1 text-emerald-400">
                        <DollarSign size={14} />{" "}
                        {job.salary_min
                          ? `${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}`
                          : "Negotiable"}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`transition-transform duration-300 ${expandedJob === job.id ? "rotate-180 text-indigo-400" : ""}`}
                  />
                </div>
              </div>

              <AnimatePresence>
                {expandedJob === job.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/5 overflow-hidden">
                    <div className="p-8 space-y-10">
                      {/* Job Info Summary */}
                      <div className="bg-slate-900/40 p-6 rounded-3xl border border-white/5">
                        <h4 className="text-[10px] font-black uppercase text-slate-500 mb-3 tracking-widest">
                          Requirements & Description
                        </h4>
                        <div className="flex gap-6 mb-4">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase">
                            <GraduationCap
                              size={16}
                              className="text-indigo-400"
                            />{" "}
                            {job.education}
                          </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">
                          {job.description}
                        </p>
                      </div>

                      {/* Detailed Applicants Container */}
                      <div className="space-y-6">
                        <h4 className="text-indigo-400 font-black uppercase text-xs tracking-[0.2em] flex items-center gap-2">
                          <Users size={18} /> Candidate Applications (
                          {
                            applications.filter((a) => a.job_id === job.id)
                              .length
                          }
                          )
                        </h4>

                        {applications.filter((a) => a.job_id === job.id)
                          .length === 0 ? (
                          <p className="text-slate-500 italic text-sm py-4">
                            No applications for this role yet.
                          </p>
                        ) : (
                          applications
                            .filter((a) => a.job_id === job.id)
                            .map((app) => (
                              <div
                                key={app.id}
                                className="bg-slate-900/60 rounded-[32px] p-8 border border-white/5 shadow-inner space-y-6">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h5 className="text-xl font-black text-white italic uppercase tracking-tight">
                                      {app.applicant_name}
                                    </h5>
                                    <div className="flex gap-4 mt-2 text-[10px] font-black uppercase text-slate-400">
                                      <span className="flex items-center gap-1">
                                        <Globe size={12} />{" "}
                                        {app.country || "Kenya"}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Clock size={12} /> {app.age || "21"}{" "}
                                        Years
                                      </span>
                                      <span className="flex items-center gap-1 text-indigo-400">
                                        <Phone size={12} />{" "}
                                        {app.phone_number || "N/A"}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                  <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2 ml-1">
                                      <FileText
                                        size={14}
                                        className="text-indigo-500"
                                      />{" "}
                                      Curriculum Vitae
                                    </label>
                                    <div className="bg-slate-950/50 rounded-2xl p-6 border border-indigo-500/10 min-h-[150px]">
                                      <p className="text-slate-300 text-sm italic font-mono whitespace-pre-wrap leading-relaxed">
                                        "
                                        {app.cv ||
                                          "Candidate did not provide CV content."}
                                        "
                                      </p>
                                    </div>
                                  </div>

                                  <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2 ml-1">
                                      <Mail
                                        size={14}
                                        className="text-indigo-500"
                                      />{" "}
                                      Cover Letter
                                    </label>
                                    <div className="bg-slate-950/50 rounded-2xl p-6 border border-indigo-500/10 min-h-[150px]">
                                      <p className="text-slate-300 text-sm italic leading-relaxed">
                                        "
                                        {app.cover_letter ||
                                          "No cover letter provided."}
                                        "
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                        )}
                      </div>

                      <button
                        onClick={() => handleDelete(job.id)}
                        className="flex items-center gap-2 text-red-500/80 hover:text-red-400 text-[10px] font-black uppercase transition-all">
                        <Trash2 size={14} /> Delete This Job Posting
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
