import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Briefcase, Search, Filter } from "lucide-react";
import JobCard from "../components/JobCard";
import JobFilter from "../components/JobFilter";
import SearchBar from "../components/SearchBar";

const JobSeekerDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/jobs", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Unable to load jobs.");
    }
  };

  useEffect(() => {
    if (token) fetchJobs();
  }, [token]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesType =
      !filter || job.job_type?.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      job.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    // BRIGHT THEME: Clean White & Soft Grays
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-12 px-6 md:px-12 lg:px-24 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <Briefcase size={20} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Job<span className="text-indigo-600">Portal</span>
              </h2>
            </div>
            <p className="text-slate-500 text-sm font-medium">
              {filteredJobs.length} positions available today
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-full md:w-80">
              <SearchBar onSearch={setSearchQuery} />
            </div>
            <button
              onClick={handleLogout}
              className="p-3 bg-white border border-slate-200 hover:border-red-200 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl transition-all shadow-sm"
              title="Sign Out">
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-6 text-slate-900 font-semibold text-sm border-b border-slate-100 pb-4">
                <Filter size={16} className="text-indigo-600" />
                Refine Search
              </div>
              <JobFilter setFilter={setFilter} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}>
                    <JobCard
                      job={{
                        ...job,
                        company: job.company || {
                          name: job.company_name || "Company",
                        },
                      }}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 border-dashed">
                  <p className="text-slate-400 text-sm font-medium">
                    No results found.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
