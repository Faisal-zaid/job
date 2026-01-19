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
    education: "form4",
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
        body: JSON.stringify({ ...form }),
      });
      if (res.ok) {
        fetchJobs();
        setShowAddForm(false);
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await fetch(`http://127.0.0.1:5000/jobs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchJobs();
  };

  const toggleExpanded = (jobId) =>
    setExpandedJob(expandedJob === jobId ? null : jobId);

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-24 pb-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-black uppercase italic tracking-tight">
            Employer <span className="text-indigo-400">Dashboard</span>
          </h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl font-bold uppercase text-xs flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20">
            {showAddForm ? <X size={18} /> : <Plus size={18} />}
            {showAddForm ? "Close Form" : "Post New Job"}
          </button>
        </header>

        {/* Jobs List */}
        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-slate-800/40 border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
              <div
                className="p-8 cursor-pointer hover:bg-slate-800/60 transition-all"
                onClick={() => toggleExpanded(job.id)}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-black uppercase italic text-white">
                      {job.title}
                    </h3>
                    <div className="flex gap-4 mt-2">
                      <span className="flex items-center gap-1 text-xs font-bold text-slate-500 uppercase">
                        <Building2 size={14} /> {job.company_name}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-slate-500 uppercase">
                        <MapPin size={14} /> {job.location || "Remote"}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`text-slate-500 transition-transform duration-300 ${expandedJob === job.id ? "rotate-180 text-indigo-400" : ""}`}
                  />
                </div>
              </div>

              <AnimatePresence>
                {expandedJob === job.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-white/5">
                    <div className="p-8 space-y-8">
                      {/* Detailed Applicant List Section */}
                      <div>
                        <h4 className="text-indigo-400 font-black uppercase text-xs tracking-widest mb-6 flex items-center gap-2 italic">
                          <Users size={18} /> Detailed Applicant List
                        </h4>

                        <div className="space-y-8">
                          {applications
                            .filter((a) => a.job_id === job.id)
                            .map((app) => (
                              <div
                                key={app.id}
                                className="bg-slate-900/40 rounded-[32px] p-8 border border-white/5 shadow-inner">
                                <div className="flex justify-between items-start mb-6">
                                  <div>
                                    <h5 className="text-xl font-black text-white italic uppercase tracking-tight">
                                      {app.applicant_name}
                                    </h5>
                                    <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
                                      {app.education || "DIPLOMA"}
                                    </p>
                                  </div>
                                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                                    Active
                                  </span>
                                </div>

                                {/* Vital Stats Row */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                  <div className="bg-slate-800/50 p-3 rounded-xl border border-white/5">
                                    <p className="text-[9px] font-black text-slate-500 uppercase mb-1">
                                      Country
                                    </p>
                                    <p className="text-sm font-bold text-white flex items-center gap-2">
                                      <Globe
                                        size={14}
                                        className="text-indigo-400"
                                      />{" "}
                                      {app.country || "Kenya"}
                                    </p>
                                  </div>
                                  <div className="bg-slate-800/50 p-3 rounded-xl border border-white/5">
                                    <p className="text-[9px] font-black text-slate-500 uppercase mb-1">
                                      Age
                                    </p>
                                    <p className="text-sm font-bold text-white flex items-center gap-2">
                                      <Clock
                                        size={14}
                                        className="text-indigo-400"
                                      />{" "}
                                      {app.age || "21"}
                                    </p>
                                  </div>
                                  <div className="bg-slate-800/50 p-3 rounded-xl border border-white/5">
                                    <p className="text-[9px] font-black text-slate-500 uppercase mb-1">
                                      Phone
                                    </p>
                                    <p className="text-sm font-bold text-white flex items-center gap-2">
                                      <Phone
                                        size={14}
                                        className="text-indigo-400"
                                      />{" "}
                                      {app.phone_number || "N/A"}
                                    </p>
                                  </div>
                                </div>

                                {/* --- MIRRORED DOCUMENTS SECTION --- */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                  {/* CV BOX */}
                                  <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-2">
                                      <FileText
                                        size={14}
                                        className="text-indigo-400"
                                      />{" "}
                                      Curriculum Vitae
                                    </label>
                                    <div className="bg-slate-950/50 rounded-2xl p-6 border border-indigo-500/20 min-h-[120px]">
                                      <p className="text-slate-300 text-sm italic font-mono whitespace-pre-wrap leading-relaxed">
                                        "{app.cv || "No CV content provided."}"
                                      </p>
                                    </div>
                                  </div>

                                  {/* COVER LETTER BOX */}
                                  <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-2">
                                      <Mail
                                        size={14}
                                        className="text-indigo-400"
                                      />{" "}
                                      Cover Letter
                                    </label>
                                    <div className="bg-slate-950/50 rounded-2xl p-6 border border-indigo-500/20 min-h-[120px]">
                                      <p className="text-slate-300 text-sm italic leading-relaxed">
                                        "
                                        {app.cover_letter ||
                                          "No statement provided."}
                                        "
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      <button
                        onClick={() => handleDelete(job.id)}
                        className="flex items-center gap-2 text-red-500 hover:text-red-400 text-[10px] font-black uppercase transition-colors">
                        <Trash2 size={14} /> Remove this Job Posting
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
