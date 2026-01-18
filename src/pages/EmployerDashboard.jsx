import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Users,
  Briefcase,
  TrendingUp,
  DollarSign,
  X,
  Check,
  Building2,
  MapPin,
  Clock,
  ChevronDown,
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
    education: "form4",
    company_name: "",
    salary_min: "",
    salary_max: "",
    location: "",
    category: "",
  });

  const token = localStorage.getItem("token");

  // Fetch Jobs
  const fetchJobs = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setJobs(data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    }
  };

  // Fetch Applications
  const fetchApplications = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/employer/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setApplications(data.applications || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setApplications([]);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchJobs(), fetchApplications()]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Add Job
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
          location: form.job_type === "remote" ? null : form.location,
        }),
      });

      if (res.ok) {
        fetchJobs();
        fetchApplications();
        setForm({
          title: "",
          description: "",
          job_type: "remote",
          education: "form4",
          company_name: "",
          salary_min: "",
          salary_max: "",
          location: "",
          category: "",
        });
        setShowAddForm(false);
      }
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  // Delete Job
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await fetch(`http://127.0.0.1:5000/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchJobs();
      fetchApplications();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  // Toggle Job Details
  const toggleExpanded = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  // Calculate Stats
  const totalApplications = applications.length;
  const totalJobs = jobs.length;
  const pendingApplications = applications.filter(
    (a) => a.status !== "reviewed",
  ).length;

  const stats = [
    {
      icon: Briefcase,
      label: "Active Jobs",
      value: totalJobs,
      color: "bg-blue-500",
    },
    {
      icon: Users,
      label: "Total Applicants",
      value: totalApplications,
      color: "bg-emerald-500",
    },
    {
      icon: Clock,
      label: "Pending Review",
      value: pendingApplications,
      color: "bg-amber-500",
    },
    {
      icon: TrendingUp,
      label: "Avg. Applications",
      value: totalJobs > 0 ? Math.round(totalApplications / totalJobs) : 0,
      color: "bg-purple-500",
    },
  ];

  const jobTypes = ["remote", "hybrid", "physical"];
  const educationLevels = [
    "form4",
    "certificate",
    "diploma",
    "degree",
    "masters",
    "phd",
  ];
  const categories = [
    "Technology",
    "Marketing",
    "Sales",
    "Design",
    "Finance",
    "Healthcare",
    "Education",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-24 pb-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8">
          <h1 className="text-4xl font-black uppercase italic tracking-tight mb-2">
            Employer <span className="text-indigo-400">Dashboard</span>
          </h1>
          <p className="text-slate-400 font-medium">
            Manage your jobs and review applications.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-800/60 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-black">{stat.value}</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ADD JOB BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-3">
            <Plus size={20} />
            {showAddForm ? "Cancel" : "Post New Job"}
          </button>
        </motion.div>

        {/* ADD JOB FORM */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8">
              <div className="bg-slate-800/60 backdrop-blur-md border border-white/10 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-indigo-400 uppercase italic">
                    Post a New Job
                  </h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Job Title */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                      Job Title *
                    </label>
                    <input
                      placeholder="e.g. Senior React Developer"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all placeholder:text-slate-600"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                      Company Name *
                    </label>
                    <input
                      placeholder="Your Company"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all placeholder:text-slate-600"
                      value={form.company_name}
                      onChange={(e) =>
                        setForm({ ...form, company_name: e.target.value })
                      }
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                      Category
                    </label>
                    <select
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all appearance-none"
                      value={form.category}
                      onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                      }>
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Salary Range */}
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                      Min Salary ($)
                    </label>
                    <input
                      type="number"
                      placeholder="50000"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all placeholder:text-slate-600"
                      value={form.salary_min}
                      onChange={(e) =>
                        setForm({ ...form, salary_min: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                      Max Salary ($)
                    </label>
                    <input
                      type="number"
                      placeholder="100000"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all placeholder:text-slate-600"
                      value={form.salary_max}
                      onChange={(e) =>
                        setForm({ ...form, salary_max: e.target.value })
                      }
                    />
                  </div>

                  {/* Job Type */}
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                      Job Type
                    </label>
                    <select
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all appearance-none"
                      value={form.job_type}
                      onChange={(e) =>
                        setForm({ ...form, job_type: e.target.value })
                      }>
                      {jobTypes.map((type) => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Education */}
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                      Required Education
                    </label>
                    <select
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all appearance-none"
                      value={form.education}
                      onChange={(e) =>
                        setForm({ ...form, education: e.target.value })
                      }>
                      {educationLevels.map((level) => (
                        <option key={level} value={level}>
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Location */}
                  {form.job_type !== "remote" && (
                    <div className="md:col-span-2">
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                        Location
                      </label>
                      <input
                        placeholder="City, Country"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all placeholder:text-slate-600"
                        value={form.location}
                        onChange={(e) =>
                          setForm({ ...form, location: e.target.value })
                        }
                      />
                    </div>
                  )}

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                      Job Description *
                    </label>
                    <textarea
                      placeholder="Describe the role, responsibilities, and requirements..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-sm h-32 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all placeholder:text-slate-600 resize-none"
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddJob}
                  className="mt-6 bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg flex items-center gap-3">
                  <Check size={18} />
                  Publish Job
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* JOBS LIST */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}>
          <h2 className="text-2xl font-black uppercase italic tracking-tight mb-6">
            Your <span className="text-indigo-400">Jobs</span>
          </h2>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-slate-800/60 border border-white/10 rounded-3xl p-6 animate-pulse">
                  <div className="h-6 bg-slate-700 rounded w-1/3 mb-2" />
                  <div className="h-4 bg-slate-700 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-slate-800/60 border border-white/10 rounded-3xl p-12 text-center">
              <Briefcase className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-black uppercase italic mb-2">
                No Jobs Yet
              </h3>
              <p className="text-slate-400 font-medium mb-6">
                Post your first job to start receiving applications.
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all">
                Post Your First Job
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-800/60 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden">
                  {/* Job Header */}
                  <div
                    className="p-6 cursor-pointer hover:bg-slate-800/80 transition-all"
                    onClick={() => toggleExpanded(job.id)}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-indigo-600/20 text-indigo-400 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                            {job.job_type}
                          </span>
                          {job.category && (
                            <span className="bg-emerald-600/20 text-emerald-400 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                              {job.category}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-black uppercase italic mb-1">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-4 text-slate-400 text-sm">
                          <span className="flex items-center gap-1">
                            <Building2 size={14} />
                            {job.company_name || "Company"}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {job.location || "Remote"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-emerald-400 text-sm font-bold">
                            {job.salary_min && job.salary_max
                              ? `$${(job.salary_min / 1000).toFixed(0)}k - $${(job.salary_max / 1000).toFixed(0)}k`
                              : "Negotiable"}
                          </p>
                          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                            {job.applications?.length || 0} applicants
                          </p>
                        </div>
                        <ChevronDown
                          size={20}
                          className={`text-slate-400 transition-transform ${expandedJob === job.id ? "rotate-180" : ""}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedJob === job.id && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden">
                        <div className="px-6 pb-6 border-t border-white/5">
                          <div className="py-4">
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                              Description
                            </h4>
                            <p className="text-slate-300 text-sm leading-relaxed">
                              {job.description}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-3 mt-4">
                            <button
                              onClick={() => handleDelete(job.id)}
                              className="flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-xl font-bold text-xs hover:bg-red-500 hover:text-white transition-all">
                              <Trash2 size={16} />
                              Delete Job
                            </button>
                          </div>

                          {/* Applicants */}
                          {job.applications?.length > 0 && (
                            <div className="mt-6 pt-6 border-t border-white/5">
                              <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-4">
                                <Users size={16} />
                                Applicants ({job.applications.length})
                              </h4>

                              <div className="space-y-4">
                                {job.applications.map((app) => (
                                  <div
                                    key={app.id}
                                    className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-4">
                                    <div className="flex items-start justify-between mb-3">
                                      <div>
                                        <h5 className="font-bold text-white">
                                          {app.applicant_name}
                                        </h5>
                                        <p className="text-slate-500 text-xs">
                                          {app.education}
                                        </p>
                                      </div>
                                      <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-lg text-[10px] font-bold uppercase">
                                        New
                                      </span>
                                    </div>

                                    <div className="bg-slate-800 rounded-xl p-3 mb-3">
                                      <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
                                        Cover Letter
                                      </p>
                                      <p className="text-slate-400 text-sm italic">
                                        "{app.cover_letter}"
                                      </p>
                                    </div>

                                    <div className="flex items-center justify-between">
                                      <p className="text-slate-500 text-xs truncate max-w-[200px]">
                                        CV: {app.cv || "Not provided"}
                                      </p>
                                      {app.cv && (
                                        <a
                                          href={app.cv}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl font-bold text-xs transition-all">
                                          View CV
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
