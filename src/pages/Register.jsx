import React, { useMemo } from "react"; // Ensure useMemo is here
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  Globe,
  Phone,
  Calendar,
} from "lucide-react";

// 1. Define Schema OUTSIDE the component
const registerSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    age: z.coerce.number().min(18, "Must be 18+").max(99, "Invalid age"),
    country: z.string().min(2, "Country required"),
    phone: z.string().regex(/^\+/, "Use country code (e.g. +254)"),
    role: z.enum(["job_seeker", "employer"]),
    password: z.string().min(8, "Min 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const Register = ({ setUser }) => {
  // --- ALL HOOKS MUST BE AT THE TOP ---
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "job_seeker", age: "" },
  });

  const passwordValue = watch("password", "");

  const strength = useMemo(() => {
    let score = 0;
    if (!passwordValue) return 0;
    if (passwordValue.length >= 8) score++;
    if (/[A-Z]/.test(passwordValue)) score++;
    if (/[0-9]/.test(passwordValue)) score++;
    if (/[^A-Za-z0-9]/.test(passwordValue)) score++;
    return score;
  }, [passwordValue]);

  // --- LOGIC FUNCTIONS ---
  const onSubmit = async (values) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        navigate(
          data.user.role === "employer"
            ? "/employer-dashboard"
            : "/jobseeker-dashboard",
        );
      } else {
        setError("root", { message: data.message || "Registration failed" });
      }
    } catch (err) {
      setError("root", { message: "Server connection failed" });
    }
  };

  const strengthMeta = [
    { label: "Empty", color: "bg-slate-100", text: "text-slate-400" },
    { label: "Weak", color: "bg-red-500", text: "text-red-500" },
    { label: "Fair", color: "bg-amber-500", text: "text-amber-500" },
    { label: "Good", color: "bg-blue-500", text: "text-blue-500" },
    { label: "Strong", color: "bg-emerald-500", text: "text-emerald-500" },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F1F5F9] px-6 py-12 relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-80 bg-slate-900 z-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl bg-white rounded-[40px] shadow-2xl p-8 md:p-12 border border-slate-100">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">
            Create <span className="text-blue-600">Account</span>
          </h2>
          <div className="w-12 h-1 bg-blue-600 mx-auto mt-2 rounded-full" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Full Name"
              icon={<User size={16} />}
              {...register("name")}
              error={errors.name}
            />
            <div className="flex flex-col">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">
                I am a...
              </label>
              <select {...register("role")} className="input-field font-bold">
                <option value="job_seeker">Job Seeker</option>
                <option value="employer">Employer</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <FormInput
                label="Email"
                type="email"
                icon={<Mail size={16} />}
                {...register("email")}
                error={errors.email}
              />
            </div>
            <FormInput
              label="Age"
              type="number"
              icon={<Calendar size={16} />}
              {...register("age")}
              error={errors.age}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Country"
              icon={<Globe size={16} />}
              {...register("country")}
              error={errors.country}
            />
            <FormInput
              label="Phone (+)"
              icon={<Phone size={16} />}
              {...register("phone")}
              error={errors.phone}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FormInput
                label="Password"
                type="password"
                icon={<Lock size={16} />}
                {...register("password")}
                error={errors.password}
              />
              <div className="mt-3 px-1">
                <div className="flex gap-1 h-1">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`flex-1 rounded-full transition-all duration-500 ${strength >= step ? strengthMeta[strength].color : "bg-slate-100"}`}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p
                    className={`text-[9px] font-black uppercase tracking-wider ${strengthMeta[strength].text}`}>
                    {strengthMeta[strength].label}
                  </p>
                  {strength === 4 && (
                    <ShieldCheck size={12} className="text-emerald-500" />
                  )}
                </div>
              </div>
            </div>
            <FormInput
              label="Confirm"
              type="password"
              icon={<Lock size={16} />}
              {...register("confirmPassword")}
              error={errors.confirmPassword}
            />
          </div>

          {errors.root && (
            <p className="text-red-500 text-[11px] font-bold bg-red-50 p-3 rounded-xl border border-red-100 text-center">
              {errors.root.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl disabled:opacity-50 mt-4 active:scale-95">
            {isSubmitting ? "Generating Account..." : "Join JobsConnect"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm font-medium">
            Already have an account?
            <Link
              to="/login"
              className="text-blue-600 font-black uppercase text-xs tracking-widest hover:underline ml-2">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .input-field { width: 100%; background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 1rem; padding: 1rem 1rem 1rem 3rem; color: #0f172a; font-weight: 500; outline: none; transition: all 0.2s; }
        .input-field:focus { border-color: #2563eb; background: white; box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1); }
      `,
        }}
      />
    </div>
  );
};

// Reusable Input Sub-component
const FormInput = React.forwardRef(
  ({ label, error, type = "text", icon, ...props }, ref) => (
    <div className="relative">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">
        {label}
      </label>
      <div className="relative flex items-center">
        <div className="absolute left-4 text-slate-300">{icon}</div>
        <input
          ref={ref}
          type={type}
          className={`input-field ${error ? "border-red-400 bg-red-50/30" : ""}`}
          {...props}
        />
      </div>
      {error && (
        <span className="text-[9px] text-red-500 font-bold ml-1 mt-1 block uppercase tracking-tighter">
          {error.message}
        </span>
      )}
    </div>
  ),
);


export default Register;
