import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Lock, Mail, ChevronRight, AlertCircle, ArrowLeft } from "lucide-react";

// 1. Define Login Schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);

        // Dynamic Routing
        navigate(
          data.user.role === "employer"
            ? "/employer-dashboard"
            : "/jobseeker-dashboard",
        );
      } else {
        // Use RHF's setError to handle server errors
        setError("root", { message: data.message || "Invalid credentials" });
      }
    } catch (err) {
      setError("root", { message: "Network error. Please try again." });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F1F5F9] px-6 py-12 relative overflow-hidden font-sans">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-80 bg-slate-900 z-0" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
        <div className="p-10 md:p-14">
          {/* Header */}
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">
              Welcome <span className="text-blue-600">Back</span>
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto mt-2 rounded-full" />
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-4">
              Secure Access to Jobs Connect
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-5 text-slate-300" size={18} />
                <input
                  type="email"
                  placeholder="name@company.com"
                  {...register("email")}
                  className={`w-full bg-slate-50 border ${errors.email ? "border-red-400 bg-red-50/30" : "border-slate-100"} rounded-2xl pl-14 pr-6 py-4 text-slate-900 font-medium outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all placeholder:text-slate-300`}
                />
              </div>
              {errors.email && (
                <p className="text-[9px] text-red-500 font-black uppercase mt-1 ml-2 tracking-tighter">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  size={10}
                  className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-5 text-slate-300" size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className={`w-full bg-slate-50 border ${errors.password ? "border-red-400 bg-red-50/30" : "border-slate-100"} rounded-2xl pl-14 pr-6 py-4 text-slate-900 font-medium outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all placeholder:text-slate-300`}
                />
              </div>
              {errors.password && (
                <p className="text-[9px] text-red-500 font-black uppercase mt-1 ml-2 tracking-tighter">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Global Error Message (Toast Style) */}
            <AnimatePresence>
              {errors.root && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 bg-red-50 text-red-600 text-xs font-bold p-4 rounded-2xl border border-red-100">
                  <AlertCircle size={16} />
                  {errors.root.message}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl shadow-blue-900/10 active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-50">
              {isSubmitting ? (
                "Authenticating..."
              ) : (
                <>
                  Sign In{" "}
                  <ChevronRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-10 text-center">
            <p className="text-slate-400 font-medium text-sm">
              New here?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-black uppercase text-xs tracking-widest hover:underline decoration-2 underline-offset-4 ml-1">
                Create Account
              </Link>
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 mt-8 text-slate-300 hover:text-slate-500 font-bold uppercase text-[9px] tracking-[0.4em] transition-colors">
              <ArrowLeft size={12} /> Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
