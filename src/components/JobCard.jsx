import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  GraduationCap,
  Building2,
  ArrowRight,
} from "lucide-react";

const JobCard = ({ job }) => {
  if (!job) return null;

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="
        bg-slate-900 
        rounded-3xl 
        p-7 md:p-9 
        border border-slate-700 
        hover:border-blue-500/60 
        transition-all 
        relative 
        overflow-hidden
        shadow-xl
      "
    >
      {/* Subtle gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-emerald-500/10 pointer-events-none" />

      <div className="relative z-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex gap-5">
            {/* Company Icon */}
            <div className="w-14 h-14 rounded-2xl bg-blue-600/15 flex items-center justify-center border border-blue-500/30 text-blue-400">
              <Building2 size={28} />
            </div>

            {/* Title */}
            <div>
              <span className="inline-block mb-2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg">
                {job.job_type || "Full Time"}
              </span>

              <h3 className="text-2xl font-extrabold text-white leading-tight">
                {job.title}
              </h3>

              <p className="text-slate-300 text-sm font-semibold mt-1">
                {job.company?.name || "N/A"}
              </p>
            </div>
          </div>

          {/* Salary */}
          <div className="hidden md:flex flex-col items-center justify-center bg-emerald-500/15 border border-emerald-400/30 px-6 py-4 rounded-2xl">
            <p className="text-[10px] font-black text-emerald-200 uppercase tracking-widest mb-1">
              Salary
            </p>
            <p className="text-lg font-bold text-emerald-300">
              {job.salary_min && job.salary_max
                ? `$${(job.salary_min / 1000).toFixed(0)}k - $${(
                    job.salary_max / 1000
                  ).toFixed(0)}k`
                : "Competitive"}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-200 text-sm leading-relaxed mt-6 line-clamp-2">
          {job.description}
        </p>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-slate-700 flex flex-wrap items-center justify-between gap-6">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-[12px] font-semibold text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-blue-400" />
              {job.location || "Remote"}
            </div>

            <div className="flex items-center gap-2">
              <GraduationCap size={14} className="text-blue-400" />
              {job.education || "Any Degree"}
            </div>
          </div>

          {/* Apply Button */}
          <Link to={`/jobs/${job.id}`} className="relative group">
            <div className="absolute -inset-1 bg-blue-600 rounded-xl blur-md opacity-40 group-hover:opacity-80 transition"></div>

            <button className="
              relative 
              flex 
              items-center 
              gap-3 
              bg-blue-600 
              hover:bg-blue-500 
              text-white 
              px-8 
              py-4 
              rounded-xl 
              font-bold 
              uppercase 
              text-[11px] 
              tracking-[0.25em]
              shadow-lg
              active:scale-95
              transition
            ">
              Apply Now
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;
