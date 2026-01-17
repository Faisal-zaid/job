import React from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 px-4">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-white">
        <h2 className="text-3xl font-bold text-center mb-4">Dashboard</h2>
        <p className="text-center text-sm text-white/70 mb-6">
          Welcome to your dashboard! Here you can manage your profile and view your activities.
        </p>
        {/* Additional dashboard content can go here */}
      </div>
    </div>
  );
}