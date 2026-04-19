import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Users,
  X,
  Check,
  Building2,
  DollarSign,
  ChevronDown,
  FileText,
  Mail,
  MapPin,
  Globe,
  Phone,
  Clock,
  GraduationCap,
} from "lucide-react";

const EmployerDashboard = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
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
  });

  const token = localStorage.getItem("token");

  /* ---------------- FETCH DATA ---------------- */

  const fetchJobs = async () => {
    const res = await fetch("https://backend-jobs-w76c.onrender.com/jobs", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setJobs(await res.json());
  };

  const fetchApplications = async () => {
    const res = await fetch("https://backend-jobs-w76c.onrender.com/employer/applications", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setApplications(data.applications || []);
  };

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  /* ---------------- ACTIONS ---------------- */

  const handleAddJob = async () => {
    const res = await fetch("https://backend-jobs-w76c.onrender.com/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        salary_min: form.salary_min ? Number(form.salary_min) : null,
        salary_max: form.salary_max ? Number(form.salary_max) : null,
        location: form.job_type === "remote" ? null : form.location,
      }),
    });

    if (res.ok) {
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
      });
      fetchJobs();
      fetchApplications();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    await fetch(`https://backend-jobs-w76c.onrender.com/jobs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchJobs();
    fetchApplications();
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-24 px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* HEADER */}
        <header className="flex justify-between items-center">
          <h1 className="text-4xl font-black italic uppercase">
            Employer <span className="text-indigo-500">Dashboard</span>
          </h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-indigo-600 hover:bg-indigo-500 px-6 py-4 rounded-2xl text-xs font-black uppercase flex items-center gap-2"
          >
            {showAddForm ? <X size={16} /> : <Plus size={16} />}
            {showAddForm ? "Cancel" : "Post Job"}
          </button>
        </header>

        {/* ---------------- ADD JOB FORM (REPLACED) ---------------- */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-slate-800 border border-white/10 rounded-3xl p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    placeholder="Job Title"
                    className="input"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />

                  <input
                    placeholder="Company Name"
                    className="input"
                    value={form.company_name}
                    onChange={(e) =>
                      setForm({ ...form, company_name: e.target.value })
                    }
                  />

                  <input
                    type="number"
                    placeholder="Min Salary (KES)"
                    className="input"
                    value={form.salary_min}
                    onChange={(e) =>
                      setForm({ ...form, salary_min: e.target.value })
                    }
                  />

                  <input
                    type="number"
                    placeholder="Max Salary (KES)"
                    className="input"
                    value={form.salary_max}
                    onChange={(e) =>
                      setForm({ ...form, salary_max: e.target.value })
                    }
                  />

                  <select
                    className="input"
                    value={form.job_type}
                    onChange={(e) =>
                      setForm({ ...form, job_type: e.target.value })
                    }
                  >
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="physical">Physical</option>
                  </select>

                  <select
                    className="input"
                    value={form.education}
                    onChange={(e) =>
                      setForm({ ...form, education: e.target.value })
                    }
                  >
                    <option value="form4">Form 4</option>
                    <option value="certificate">Certificate</option>
                    <option value="diploma">Diploma</option>
                    <option value="degree">Degree</option>
                    <option value="masters">Masters</option>
                    <option value="phd">PhD</option>
                  </select>

                  {form.job_type !== "remote" && (
                    <div className="relative md:col-span-2">
                      <MapPin
                        className="absolute left-4 top-4 text-slate-500"
                        size={16}
                      />
                      <input
                        placeholder="Job Location"
                        className="input pl-10"
                        value={form.location}
                        onChange={(e) =>
                          setForm({ ...form, location: e.target.value })
                        }
                      />
                    </div>
                  )}

                  <textarea
                    placeholder="Job Description"
                    className="input md:col-span-2 h-32"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                </div>

                <button
                  onClick={handleAddJob}
                  className="bg-indigo-600 px-8 py-4 rounded-xl text-xs font-black uppercase flex items-center gap-2"
                >
                  <Check size={16} /> Publish Job
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---------------- JOBS LIST ---------------- */}
        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-slate-800/40 rounded-3xl border border-white/5 overflow-hidden"
            >
              <div
                className="p-6 cursor-pointer flex justify-between"
                onClick={() =>
                  setExpandedJob(expandedJob === job.id ? null : job.id)
                }
              >
                <div>
                  <h3 className="text-xl font-black uppercase italic">
                    {job.title}
                  </h3>
                  <div className="flex gap-4 text-xs text-slate-400 mt-2">
                    <span className="flex items-center gap-1">
                      <Building2 size={12} /> {job.company_name}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {job.location || "Remote"}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <DollarSign size={12} />
                      {job.salary_min
                        ? `${job.salary_min} - ${job.salary_max}`
                        : "Negotiable"}
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={`transition ${
                    expandedJob === job.id && "rotate-180 text-indigo-400"
                  }`}
                />
              </div>

              <AnimatePresence>
                {expandedJob === job.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/5 p-6 space-y-6"
                  >
                    <div className="text-sm text-slate-400">
                      <GraduationCap
                        size={14}
                        className="inline mr-2 text-indigo-400"
                      />
                      {job.education}
                    </div>

                    <h4 className="text-xs uppercase font-black text-indigo-400 flex items-center gap-2">
                      <Users size={14} /> Applicants
                    </h4>

                    {applications
                      .filter((a) => a.job_id === job.id)
                      .map((app) => (
                        <div
                          key={app.id}
                          className="bg-slate-900 rounded-2xl p-6 space-y-4"
                        >
                          <h5 className="font-black italic">
                            {app.applicant_name}
                          </h5>

                          <div className="flex gap-4 mt-2 text-[10px] font-black uppercase text-slate-400">
                            <span className="flex items-center gap-1">
                              <Globe size={12} /> {app.country || "Kenya"}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} /> {app.age || "N/A"} Years
                            </span>
                            <span className="flex items-center gap-1 text-indigo-400">
                              <Phone size={12} /> {app.phone_number || "N/A"}
                            </span>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <FileText size={14} className="text-indigo-400" />
                              <p className="text-sm italic mt-2">{app.cv}</p>
                            </div>
                            <div>
                              <Mail size={14} className="text-indigo-400" />
                              <p className="text-sm italic mt-2">
                                {app.cover_letter}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}

                    <button
                      onClick={() => handleDelete(job.id)}
                      className="text-red-400 text-xs uppercase font-black flex items-center gap-2"
                    >
                      <Trash2 size={14} /> Delete Job
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* SHARED INPUT STYLE */}
      <style jsx>{`
        .input {
          width: 100%;
          background: #020617;
          border: 1px solid #334155;
          padding: 1rem;
          border-radius: 0.75rem;
          outline: none;
        }
        .input:focus {
          border-color: #6366f1;
        }
      `}</style>
    </div>
  );
};

export default EmployerDashboard;
