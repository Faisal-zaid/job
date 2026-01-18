import React from "react";
import { motion } from "framer-motion";

// Basic Skeleton Pulse
export const SkeletonPulse = ({ className = "" }) => (
  <motion.div
    animate={{
      opacity: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className={`bg-slate-700 rounded ${className}`}
  />
);

// Job Card Skeleton
export const JobCardSkeleton = () => (
  <div className="bg-slate-900 rounded-3xl p-7 md:p-9 border border-slate-700">
    <div className="flex flex-col md:flex-row justify-between gap-6">
      <div className="flex gap-5">
        {/* Company Icon Placeholder */}
        <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700">
          <div className="w-8 h-8 bg-slate-700 rounded-lg" />
        </div>

        {/* Title and Company */}
        <div className="space-y-3">
          <div className="h-6 w-32 bg-slate-800 rounded-lg" />
          <div className="h-4 w-24 bg-slate-800 rounded" />
        </div>
      </div>

      {/* Salary Placeholder */}
      <div className="hidden md:flex flex-col items-center justify-center bg-slate-800/50 border border-slate-700/50 px-6 py-4 rounded-2xl">
        <div className="h-3 w-16 bg-slate-700 rounded mb-2" />
        <div className="h-5 w-24 bg-slate-700 rounded" />
      </div>
    </div>

    {/* Description Lines */}
    <div className="mt-6 space-y-2">
      <div className="h-4 w-full bg-slate-800 rounded" />
      <div className="h-4 w-3/4 bg-slate-800 rounded" />
    </div>

    {/* Bottom Section */}
    <div className="mt-8 pt-6 border-t border-slate-700 flex flex-wrap items-center justify-between gap-6">
      <div className="flex flex-wrap items-center gap-6">
        <div className="h-4 w-20 bg-slate-800 rounded" />
        <div className="h-4 w-24 bg-slate-800 rounded" />
      </div>

      <div className="h-12 w-32 bg-slate-800 rounded-xl" />
    </div>
  </div>
);

// Dashboard Stats Skeleton
export const StatsSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-100 rounded-xl" />
          <div>
            <div className="h-8 w-16 bg-slate-100 rounded mb-1" />
            <div className="h-3 w-20 bg-slate-100 rounded" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Form Skeleton
export const FormSkeleton = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <div className="h-4 w-24 bg-slate-200 rounded" />
        <div className="h-12 w-full bg-slate-100 rounded-xl" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-24 bg-slate-200 rounded" />
        <div className="h-12 w-full bg-slate-100 rounded-xl" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-4 w-32 bg-slate-200 rounded" />
      <div className="h-32 w-full bg-slate-100 rounded-xl" />
    </div>
    <div className="h-12 w-40 bg-slate-200 rounded-xl" />
  </div>
);

// Table Row Skeleton
export const TableRowSkeleton = ({ columns = 4 }) => (
  <div className="flex items-center gap-4 py-4 border-b border-slate-100">
    {[...Array(columns)].map((_, i) => (
      <div key={i} className="flex-1">
        <div
          className="h-4 bg-slate-100 rounded"
          style={{ width: `${60 + Math.random() * 40}%` }}
        />
      </div>
    ))}
    <div className="w-20">
      <div className="h-8 w-20 bg-slate-100 rounded-lg" />
    </div>
  </div>
);

// Profile Skeleton
export const ProfileSkeleton = () => (
  <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
    <div className="flex items-center gap-6 mb-6">
      <div className="w-24 h-24 bg-slate-100 rounded-full" />
      <div className="space-y-3">
        <div className="h-6 w-48 bg-slate-100 rounded" />
        <div className="h-4 w-32 bg-slate-100 rounded" />
      </div>
    </div>
    <div className="space-y-4">
      <div className="h-4 w-full bg-slate-100 rounded" />
      <div className="h-4 w-full bg-slate-100 rounded" />
      <div className="h-4 w-3/4 bg-slate-100 rounded" />
    </div>
  </div>
);

// Card Grid Skeleton
export const CardGridSkeleton = ({ count = 4 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[...Array(count)].map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl mb-4" />
        <div className="h-6 w-3/4 bg-slate-100 rounded mb-2" />
        <div className="h-4 w-full bg-slate-100 rounded" />
        <div className="h-4 w-2/3 bg-slate-100 rounded mt-2" />
      </div>
    ))}
  </div>
);

// Generic Loading Spinner
export const LoadingSpinner = ({ size = "md" }) => {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-3",
    xl: "w-16 h-16 border-4",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          ${sizes[size]}
          border-slate-200
          border-t-indigo-600
          rounded-full
          animate-spin
        `}
      />
    </div>
  );
};

// Full Page Loading
export const PageLoader = () => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="text-slate-500 font-medium mt-4">Loading...</p>
    </div>
  </div>
);

// Dots Loading Animation
export const DotsLoader = () => (
  <div className="flex items-center justify-center gap-2">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-3 h-3 bg-indigo-600 rounded-full"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: i * 0.1,
        }}
      />
    ))}
  </div>
);

export default {
  SkeletonPulse,
  JobCardSkeleton,
  StatsSkeleton,
  FormSkeleton,
  TableRowSkeleton,
  ProfileSkeleton,
  CardGridSkeleton,
  LoadingSpinner,
  PageLoader,
  DotsLoader,
};
