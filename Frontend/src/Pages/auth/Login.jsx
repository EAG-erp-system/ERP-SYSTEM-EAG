import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authThunks.js";

import MainLogo from "../../assets/MainLogo.png"

export default function Login() {
  const { theme, toggleTheme } = useTheme();
  const loc = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const result = await dispatch(login({ email, password }));
      if (login.fulfilled.match(result)) {
        navigate(loc.state?.from || "/dashboard", { replace: true });
      } else {
        setErr(result.payload || "Login failed");
      }
    } catch (e) {
      setErr(e.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#f4f7fa] dark:bg-[#060b14] text-ink-900 dark:text-slate-100 transition-colors duration-300">
      
      <button
        onClick={toggleTheme}
        type="button"
        className="fixed top-4 right-4 p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-black/10 dark:border-white/10 backdrop-blur-md text-ink-800 dark:text-slate-200 hover:opacity-80 active:scale-95 transition-all shadow-sm"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun size={18} className="text-amber-400" />
        ) : (
          <Moon size={18} className="text-brand-500" />
        )}
      </button>

      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-6 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform">
            <img src={MainLogo} alt="" />
          </div>
          <span className="font-semibold text-lg text-ink-900 dark:text-slate-100">
            Ethiopian Assemblies of God Church
          </span>
        </Link>

        <div className="bg-white/80 dark:bg-slate-900/60 border border-blue-600/10 dark:border-white/10 backdrop-blur-xl rounded-2xl p-7 shadow-xl">
          <h1 className="text-2xl font-bold tracking-tight text-ink-900 dark:text-white">
            Welcome back
          </h1>
          <p className="text-sm text-ink-500 dark:text-slate-400 mt-1">
            Please enter your details to sign in.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium mb-1.5 text-ink-800 dark:text-slate-300">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition bg-white/90 dark:bg-white/5 border border-ink-900/10 dark:border-white/10 text-ink-900 dark:text-white placeholder:text-ink-500/50 dark:placeholder:text-slate-500 focus:border-blue-600 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-ink-800 dark:text-slate-300">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition bg-white/90 dark:bg-white/5 border border-ink-900/10 dark:border-white/10 text-ink-900 dark:text-white placeholder:text-ink-500/50 dark:placeholder:text-slate-500 focus:border-blue-600 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {err && (
              <div className="text-sm text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                {err}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-blue-600 to-blue-700 hover:brightness-110 shadow-lg shadow-blue-500/30"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
