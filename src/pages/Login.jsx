import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion"; // Consistent with your Header animations

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 px-6 py-12">
      {/* Background Decoration to match Home page */}
      <div className="absolute top-0 left-0 w-full h-64 bg-slate-900 z-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
        <div className="p-10 md:p-12">
          {/* Header */}
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">
              Welcome <span className="text-indigo-600">Back</span>
            </h2>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">
              Secure Access to Jobs Connect
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-medium outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all placeholder:text-slate-300"
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
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-medium outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all placeholder:text-slate-300"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 text-red-500 text-xs font-bold p-4 rounded-xl border border-red-100">
                {error}
              </motion.div>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl active:scale-95 mt-4">
              Sign In
            </button>
          </div>

          {/* Footer Links */}
          <div className="mt-10 text-center">
            <p className="text-slate-400 font-medium text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 font-black uppercase text-xs tracking-widest hover:underline decoration-2 underline-offset-4 ml-1">
                Create Account
              </Link>
            </p>
            <Link
              to="/"
              className="inline-block mt-6 text-slate-300 hover:text-slate-500 font-bold uppercase text-[9px] tracking-[0.4em] transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
