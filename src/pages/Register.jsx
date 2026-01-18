import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Register = ({ setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("job_seeker");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);

        if (data.user.role === "employer") {
          navigate("/employer-dashboard");
        } else {
          navigate("/jobseeker-dashboard");
        }
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 px-6 py-12 relative overflow-hidden">
      {/* Decorative Background Element to match Login */}
      <div className="absolute top-0 left-0 w-full h-80 bg-slate-900 z-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg bg-white rounded-[40px] shadow-2xl border border-slate-100 p-10 md:p-14">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">
            Create <span className="text-indigo-600">Account</span>
          </h2>
          <div className="w-12 h-1 bg-indigo-600 mx-auto mt-2 rounded-full" />
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-4">
            Start your journey with Jobs Connect
          </p>
        </div>

        {/* Form Inputs */}
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Full Name
              </label>
              <input
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-medium outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all placeholder:text-slate-300"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                I am a...
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all appearance-none">
                <option value="job_seeker">Job Seeker</option>
                <option value="employer">Employer</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-medium outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all placeholder:text-slate-300"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-medium outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all placeholder:text-slate-300"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-xs font-bold bg-red-50 p-4 rounded-xl border border-red-100">
              {error}
            </motion.p>
          )}

          <button
            onClick={handleRegister}
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl active:scale-95 mt-4">
            Create Account
          </button>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-slate-400 font-medium text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-black uppercase text-xs tracking-widest hover:underline decoration-2 underline-offset-4 ml-1">
              Sign In
            </Link>
          </p>
          <Link
            to="/"
            className="inline-block mt-6 text-slate-300 hover:text-slate-500 font-bold uppercase text-[9px] tracking-[0.4em] transition-colors">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;