import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Briefcase,
  Trash2,
  Building2,
  GraduationCap,
  Globe,
} from "lucide-react";
import EmployerApplications from "./EmployerApplications";

function EmployerDashboard() {
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Employer",
    email: "",
  };
  const [view, setView] = useState("jobs");
  const [jobs, setJobs] = useState(
    JSON.parse(localStorage.getItem("jobs")) || []
  );
  const [companies, setCompanies] = useState(
    JSON.parse(localStorage.getItem("companies")) || []
  );

  function addJob(e) {
    e.preventDefault();
    const form = e.target;
    const companyName = form.company.value.trim();

    let company = companies.find(
      (c) => c.name.toLowerCase() === companyName.toLowerCase()
    );
    if (!company) {
      company = { id: Date.now(), name: companyName };
      const updatedCompanies = [...companies, company];
      setCompanies(updatedCompanies);
      localStorage.setItem("companies", JSON.stringify(updatedCompanies));
    }

    const newJob = {
      id: Date.now(),
      title: form.title.value,
      description: form.description.value,
      type: form.type.value,
      education: form.education.value,
      companyId: company.id,
      employerEmail: user.email,
      date: new Date().toLocaleDateString(),
    };

    const updatedJobs = [newJob, ...jobs];
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    form.reset();
  }

  function deleteJob(jobId) {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      const updatedJobs = jobs.filter((job) => job.id !== jobId);
      setJobs(updatedJobs);
      localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    }
  }

  const getCompanyName = (id) =>
    companies.find((c) => c.id === id)?.name || "Unknown Company";

  
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 lg:px-32">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">
              Employer <span className="text-indigo-600">Dashboard</span>
            </h1>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">
              Manage your talent pipeline
            </p>
          </div>

          <div className="flex bg-slate-200 p-1 rounded-2xl">
            {["jobs", "applications"].map((tab) => (
              <button
                key={tab}
                onClick={() => setView(tab)}
                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  view === tab
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}>
                {tab}
              </button>
            ))}
          </div>
        </header>


        <AnimatePresence mode="wait">
          {view === "jobs" ? (
            <motion.div
              key="jobs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-3 gap-12">
              {/* POST JOB FORM */}
              <div className="lg:col-span-1">
                <div className="bg-white p-8 rounded-[32px] shadow-xl shadow-slate-200/60 border border-slate-100 sticky top-8">
                  <h3 className="text-xl font-black text-slate-900 uppercase italic mb-6 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-indigo-600" /> Post Position
                  </h3>
                  <form onSubmit={addJob} className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                        Title
                      </label>
                      <input
                        name="title"
                        required
                        className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        placeholder="Project Lead"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        required
                        className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 h-32"
                        placeholder="Describe the role..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <select
                        name="type"
                        required
                        className="p-4 bg-slate-50 rounded-2xl border-none text-sm font-bold text-slate-600">
                        <option value="remote">Remote</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="physical">On-site</option>
                      </select>
                      <select
                        name="education"
                        required
                        className="p-4 bg-slate-50 rounded-2xl border-none text-sm font-bold text-slate-600">
                        <option value="Degree">Degree</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Masters">Masters</option>
                      </select>
                    </div>
                    <input
                      name="company"
                      required
                      className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Company Name"
                    />
                    <button
                      type="submit"
                      className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-100">
                      Post Listing
                    </button>
                  </form>
                </div>
              </div>

              {/* ACTIVE LISTINGS */}
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-xl font-black text-slate-900 uppercase italic mb-6 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-600" /> Active
                  Listings
                </h3>
                {jobs
                  .filter((j) => j.employerEmail === user.email)
                  .map((job, i) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group bg-white p-8 rounded-[32px] border-2 border-transparent hover:border-indigo-100 transition-all shadow-sm hover:shadow-xl hover:shadow-indigo-500/5">
                      <div className="flex justify-between items-start">
                        <div className="space-y-4">
                          <h4 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {job.title}
                          </h4>
                          <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-md">
                            {job.description}
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                              <Globe className="w-3 h-3" /> {job.type}
                            </span>
                            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                              <GraduationCap className="w-3 h-3" />{" "}
                              {job.education}
                            </span>
                            <span className="flex items-center gap-1.5 px-3 py-1.5 text-slate-400 text-[10px] font-black uppercase tracking-wider">
                              <Building2 className="w-3 h-3" />{" "}
                              {getCompanyName(job.companyId)}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteJob(job.id)}
                          className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="apps"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}>
              <EmployerApplications />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
export default EmployerDashboard;
