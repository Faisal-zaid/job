import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "../context/AuthContext";
import {
  User, Mail, Lock, Globe, Phone, ArrowRight, ShieldCheck, Briefcase, UserCircle
} from "lucide-react";

// --- Validation Schemas ---
const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is too short"),
  country: z.string().min(1, "Select a country"),
  userType: z.enum(["job_seeker", "employer"]),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

// --- Helper Components ---
const FormHeader = ({ isSignIn, setIsSignIn }) => (
  <div className="flex bg-slate-100 p-1.5 rounded-[20px] mb-10 shadow-inner">
    {["Sign Up", "Sign In"].map((label, idx) => {
      const active = (idx === 1) === isSignIn;
      return (
        <button
          key={label}
          type="button"
          onClick={() => setIsSignIn(idx === 1)}
          className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-[16px] transition-all duration-300 ${
            active ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          {label}
        </button>
      );
    })}
  </div>
);

const InputWrapper = ({ label, icon: Icon, error, children }) => (
  <div className="mb-5">
    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
        <Icon size={18} />
      </div>
      {children}
    </div>
    {error && <p className="text-[10px] text-rose-500 mt-1 ml-1 font-bold">{error.message}</p>}
  </div>
);

function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSignIn, setIsSignIn] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { register, handleSubmit, formState: { errors }, reset, control } = useForm({
    resolver: zodResolver(isSignIn ? signInSchema : signUpSchema),
    defaultValues: { userType: "job_seeker", country: "USA" }
  });

  // Watch userType to update UI styles for the radio buttons
  const selectedUserType = useWatch({ control, name: "userType" });

  const onSubmit = async (data) => {
    setServerError("");
    const endpoint = isSignIn ? "/login" : "/register";
    const BASE_URL = "http://your-api-url.com"; // Replace with your actual base URL

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      if (isSignIn) {
        // Handle successful login
        login(result.user, result.token);
        navigate("/dashboard", { replace: true });
      } else {
        // Handle successful registration
        setSuccessMessage("Account Created! Redirecting to login...");
        setTimeout(() => {
          setIsSignIn(true);
          setSuccessMessage("");
          reset();
        }, 2000);
      }
    } catch (err) {
      setServerError(err.message);
    }
  };

  const inputClass = "w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-50 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:border-indigo-500/20 focus:bg-white transition-all";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6 relative overflow-hidden">
      <div className="w-full max-w-[480px] bg-white rounded-[40px] shadow-2xl p-10 md:p-14 relative z-10 border border-slate-100">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center text-white mb-6 rotate-3 shadow-2xl">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">
            {isSignIn ? "Welcome Back" : "Join The Elite"}
          </h2>
        </div>

        <FormHeader isSignIn={isSignIn} setIsSignIn={setIsSignIn} />

        {(serverError || successMessage) && (
          <div className={`p-4 rounded-2xl text-[11px] font-black uppercase mb-6 border-l-4 ${serverError ? "bg-rose-50 text-rose-600 border-rose-500" : "bg-emerald-50 text-emerald-600 border-emerald-500"}`}>
            {serverError || successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isSignIn && (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <label className={`flex flex-col items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedUserType === 'job_seeker' ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-slate-100 text-slate-400'}`}>
                  <input type="radio" value="job_seeker" {...register("userType")} className="hidden" />
                  <UserCircle size={24} className="mb-2" />
                  <span className="text-[10px] font-black uppercase">Job Seeker</span>
                </label>
                <label className={`flex flex-col items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedUserType === 'employer' ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-slate-100 text-slate-400'}`}>
                  <input type="radio" value="employer" {...register("userType")} className="hidden" />
                  <Briefcase size={24} className="mb-2" />
                  <span className="text-[10px] font-black uppercase">Employer</span>
                </label>
              </div>

              <InputWrapper label="Username" icon={User} error={errors.username}>
                <input {...register("username")} className={inputClass} placeholder="johndoe" />
              </InputWrapper>
            </>
          )}

          <InputWrapper label="Email Address" icon={Mail} error={errors.email}>
            <input type="email" {...register("email")} className={inputClass} placeholder="name@company.com" />
          </InputWrapper>

          {!isSignIn && (
            <div className="grid grid-cols-2 gap-4">
              <InputWrapper label="Country" icon={Globe} error={errors.country}>
                <select {...register("country")} className={inputClass}>
                  <option value="USA">USA</option>
                  <option value="Kenya">Kenya</option>
                </select>
              </InputWrapper>
              <InputWrapper label="Phone" icon={Phone} error={errors.phone}>
                <input type="tel" {...register("phone")} className={inputClass} placeholder="+123..." />
              </InputWrapper>
            </div>
          )}

          <div className={!isSignIn ? "grid grid-cols-2 gap-4" : ""}>
            <InputWrapper label="Password" icon={Lock} error={errors.password}>
              <input type="password" {...register("password")} className={inputClass} placeholder="••••••••" />
            </InputWrapper>
            {!isSignIn && (
              <InputWrapper label="Confirm" icon={Lock} error={errors.confirmPassword}>
                <input type="password" {...register("confirmPassword")} className={inputClass} placeholder="••••••••" />
              </InputWrapper>
            )}
          </div>

          <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-[20px] font-black uppercase text-xs tracking-[0.2em] hover:bg-indigo-600 transition-all flex items-center justify-center gap-3">
            {isSignIn ? "Sign In" : "Register Account"} <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;