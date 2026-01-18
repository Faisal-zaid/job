import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Briefcase,
  Search,
  Filter,
  Bookmark,
  Clock,
  CheckCircle,
  TrendingUp,
  Eye,
  X,
} from "lucide-react";
import JobCard from "../components/JobCard";

const JobSeekerDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // all, bookmarked

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
      setFilteredJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Unable to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchJobs();
  }, [token]);

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("bookmarks");
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleBookmark = (jobId) => {
    const newBookmarks = bookmarks.includes(jobId)
      ? bookmarks.filter((id) => id !== jobId)
      : [...bookmarks, jobId];
    setBookmarks(newBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
  };

  useEffect(() => {
    let result = jobs;

    // Filter by tab
    if (activeTab === "bookmarked") {
      result = result.filter((job) => bookmarks.includes(job.id));
    }

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Job type filter
    if (filterType) {
      result = result.filter(
        (job) => job.job_type?.toLowerCase() === filterType.toLowerCase(),
      );
    }

    // Salary filter
    // Salary filter (FIXED – overlap logic)
if (salaryRange) {
  result = result.filter((job) => {
    const jobMin = job.salary_min ?? 0;
    const jobMax = job.salary_max ?? Infinity;

    if (salaryRange === "150000+") {
      return jobMax >= 150000;
    }

    const [min, max] = salaryRange.split("-").map(Number);

    // Overlapping range logic
    return jobMax >= min && jobMin <= max;
  });
}


    setFilteredJobs(result);
  }, [searchQuery, filterType, salaryRange, activeTab, bookmarks, jobs]);

  const clearFilters = () => {
    setSearchQuery("");
    setFilterType("");
    setSalaryRange("");
    setActiveTab("all");
  };

  const hasActiveFilters = searchQuery || filterType || salaryRange;

  const stats = [
    {
      icon: Briefcase,
      label: "Total Jobs",
      value: jobs.length,
      color: "bg-blue-500",
    },
    {
      icon: Bookmark,
      label: "Bookmarked",
      value: bookmarks.length,
      color: "bg-amber-500",
    },
    { icon: Clock, label: "Applied Today", value: 0, color: "bg-emerald-500" },
    { icon: TrendingUp, label: "Interviews", value: 0, color: "bg-purple-500" },
  ];

  const jobTypes = ["remote", "hybrid", "physical"];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-12 px-6 md:px-12 lg:px-24 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto relative">
        {/* HEADER */}
        <header className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tight mb-2">
              Job <span className="text-indigo-600">Dashboard</span>
            </h1>
            <p className="text-slate-500 font-medium">
              Welcome back! Find your next opportunity.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-slate-900">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </header>

        {/* TABS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === "all"
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}>
            <span className="flex items-center gap-2">
              <Briefcase size={18} />
              All Jobs
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                {jobs.length}
              </span>
            </span>
          </button>
          <button
            onClick={() => setActiveTab("bookmarked")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === "bookmarked"
                ? "bg-amber-500 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}>
            <span className="flex items-center gap-2">
              <Bookmark size={18} />
              Bookmarked
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                {bookmarks.length}
              </span>
            </span>
          </button>
        </motion.div>

        {/* SEARCH AND FILTERS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-100 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search jobs by title or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-4 text-slate-900 font-medium outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all ${
                showFilters || hasActiveFilters
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}>
              <Filter size={18} />
              Filters
              {hasActiveFilters && (
                <span className="w-5 h-5 bg-white text-indigo-600 rounded-full text-xs flex items-center justify-center">
                  {(searchQuery ? 1 : 0) +
                    (filterType ? 1 : 0) +
                    (salaryRange ? 1 : 0)}
                </span>
              )}
            </button>
          </div>

          {/* Expandable Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden">
                <div className="pt-6 mt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Job Type Filter */}
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                      Job Type
                    </label>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all appearance-none">
                      <option value="">All Types</option>
                      {jobTypes.map((type) => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Salary Range Filter */}
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                      Salary Range
                    </label>
                    <select
                      value={salaryRange}
                      onChange={(e) => setSalaryRange(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all appearance-none">
                      <option value="">Any Salary</option>
                      <option value="0-50000">$0 - $50k</option>
                      <option value="50001-100000">$50k - $100k</option>
                      <option value="100001-150000">$100k - $150k</option>
                      <option value="150000+">$150k+</option>
                    </select>
                  </div>

                  {/* Clear Button */}
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 px-4 py-3 rounded-xl font-bold transition-all">
                      <X size={16} />
                      Clear All
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Active Filters Tags */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-2 mb-6">
            {searchQuery && (
              <span className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                {searchQuery}
                <button onClick={() => setSearchQuery("")}>
                  <X size={14} />
                </button>
              </span>
            )}
            {filterType && (
              <span className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                {filterType}
                <button onClick={() => setFilterType("")}>
                  <X size={14} />
                </button>
              </span>
            )}
            {salaryRange && (
              <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                {salaryRange
                  .replace(/(\d+)-(\d+)/, "$$$1k - $$$2k")
                  .replace("150000+", "$150k+")}
                <button onClick={() => setSalaryRange("")}>
                  <X size={14} />
                </button>
              </span>
            )}
          </motion.div>
        )}

        {/* RESULTS COUNT */}
        <div className="mb-6">
          <p className="text-slate-500 font-medium">
            {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}{" "}
            found
          </p>
        </div>

        {/* JOBS LIST */}
        {loading ? (
          <div className="grid gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="bg-slate-900 rounded-3xl p-8 animate-pulse">
                <div className="flex gap-5">
                  <div className="w-14 h-14 bg-slate-700 rounded-2xl" />
                  <div className="flex-1">
                    <div className="h-6 bg-slate-700 rounded w-1/3 mb-2" />
                    <div className="h-4 bg-slate-700 rounded w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-3xl border border-slate-100">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <X className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-xl font-black text-slate-900 uppercase italic mb-2">
              Oops!
            </h3>
            <p className="text-slate-500 font-medium">{error}</p>
          </motion.div>
        ) : filteredJobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-3xl border border-slate-100">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-black text-slate-900 uppercase italic mb-2">
              No Jobs Found
            </h3>
            <p className="text-slate-500 font-medium mb-6">
              {activeTab === "bookmarked"
                ? "You haven't bookmarked any jobs yet."
                : "Try adjusting your search or filters."}
            </p>
            <button
              onClick={clearFilters}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative">
                <JobCard
                  job={{
                    ...job,
                    company: job.company || {
                      name: job.company_name || "Company",
                    },
                  }}
                />
                {/* Bookmark Button */}
                <button
                  onClick={() => toggleBookmark(job.id)}
                  className={`absolute top-6 right-6 p-3 rounded-xl transition-all ${
                    bookmarks.includes(job.id)
                      ? "bg-amber-500 text-white"
                      : "bg-slate-800 text-slate-400 hover:bg-amber-500 hover:text-white"
                  }`}>
                  <Bookmark
                    size={18}
                    fill={bookmarks.includes(job.id) ? "currentColor" : "none"}
                  />
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleLogout}
          className="fixed bottom-8 right-8 bg-slate-900 text-white px-6 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-red-600 transition-all shadow-xl flex items-center gap-3">
          <LogOut size={18} />
          Sign Out
        </motion.button>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
