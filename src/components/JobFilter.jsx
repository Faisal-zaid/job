import React from "react";
import { ChevronDown, Filter } from "lucide-react";

const JobFilter = ({ setFilter, setSalary }) => {
  const handleTypeChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSalaryChange = (e) => {
    setSalary(e.target.value);
  };

  // Shared classes for the select inputs to keep code clean
  const selectStyles = `
    w-full bg-slate-900/50 backdrop-blur-md 
    border border-slate-700/50 rounded-xl 
    px-4 py-3 text-sm font-bold text-white
    outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 
    transition-all appearance-none cursor-pointer
  `;

  return (
    <div className="space-y-8">
      {/* Job Type Section */}
      <div className="relative">
        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1">
          Employment Type
        </label>
        <div className="relative">
          <select onChange={handleTypeChange} className={selectStyles}>
            <option value="" className="bg-slate-900">
              All Opportunities
            </option>
            <option value="Full-time" className="bg-slate-900">
              Full-time
            </option>
            <option value="Part-time" className="bg-slate-900">
              Part-time
            </option>
            <option value="Remote" className="bg-slate-900">
              Remote
            </option>
            <option value="Contract" className="bg-slate-900">
              Contract
            </option>
          </select>
          {/* Custom Chevron for better UI */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
            <ChevronDown size={16} />
          </div>
        </div>
      </div>

      {/* Salary Range Section */}
      <div className="relative">
        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1">
          Salary Expectations
        </label>
        <div className="relative">
          <select onChange={handleSalaryChange} className={selectStyles}>
            <option value="" className="bg-slate-900">
              Any Range
            </option>
            <option value="0-50000" className="bg-slate-900">
              $0 — $50k
            </option>
            <option value="50000-100000" className="bg-slate-900">
              $50k — $100k
            </option>
            <option value="100000+" className="bg-slate-900">
              $100k+
            </option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
            <ChevronDown size={16} />
          </div>
        </div>
      </div>

      {/* Quick Info Box (Optional Design Element) */}
      <div className="mt-10 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
        <p className="text-[9px] leading-relaxed text-slate-400 font-medium">
          <span className="text-blue-400 font-bold uppercase mr-1">
            Pro Tip:
          </span>
          Remote roles often offer the most flexible salary packages.
        </p>
      </div>
    </div>
  );
};

export default JobFilter;
