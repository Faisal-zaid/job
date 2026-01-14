import { useState } from "react";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-white">
        
        <h2 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-white/70 mb-6">
          Login to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={18} />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-opacity-90 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-white/70">
          Don’t have an account?{" "}
          <span className="underline cursor-pointer hover:text-white">
            Sign up
          </span>
        </div>

      </div>
    </div>
  );
}