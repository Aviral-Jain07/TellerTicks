import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { cn } from "../lib/utils";
import { Activity, Mail, Lock, ArrowRight } from "lucide-react";

function GoogleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
    </svg>
  );
}

function GitHubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function LoginPage() {
  const [email, setEmail] = useState("arjun.mehta@tellerticks.ai");
  const [password, setPassword] = useState("••••••••");
  const login = useAppStore((s) => s.login);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-zinc-950">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ai-cyan/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ai-violet/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-accent/15 border border-brand-accent/20">
            <Activity className="w-7 h-7 text-brand-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-[#D47E30]">Teller</span>
              <span className="text-white">Ticks</span>
            </h1>
            <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase">
              AI Intelligence Framework
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div
          className={cn(
            "rounded-2xl p-8",
            "bg-white/[0.04] backdrop-blur-xl border border-white/10",
            "shadow-2xl shadow-black/40"
          )}
        >
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-white">Welcome back</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Sign in to your intelligence dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(
                    "w-full pl-10 pr-4 py-2.5 rounded-lg text-sm",
                    "bg-white/5 border border-white/10 text-white placeholder:text-zinc-600",
                    "focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30",
                    "transition-all"
                  )}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(
                    "w-full pl-10 pr-4 py-2.5 rounded-lg text-sm",
                    "bg-white/5 border border-white/10 text-white placeholder:text-zinc-600",
                    "focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30",
                    "transition-all"
                  )}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-1.5 text-zinc-400 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-zinc-600 bg-zinc-800"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-brand-accent hover:text-brand-accent/80 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className={cn(
                "w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200",
                "bg-brand-accent text-white hover:bg-brand-accent/90",
                "shadow-lg shadow-brand-accent/25 hover:shadow-brand-accent/40",
                "active:scale-[0.98]"
              )}
            >
              Sign In
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-900 px-2 text-zinc-500">
                  or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                type="button"
                onClick={handleLogin}
                className={cn(
                  "flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all",
                  "bg-white/5 border border-white/10 text-zinc-300",
                  "hover:bg-white/10 hover:border-white/20"
                )}
              >
                <GoogleIcon className="w-4 h-4" />
                Google
              </button>
              <button
                type="button"
                onClick={handleLogin}
                className={cn(
                  "flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all",
                  "bg-white/5 border border-white/10 text-zinc-300",
                  "hover:bg-white/10 hover:border-white/20"
                )}
              >
                <GitHubIcon className="w-4 h-4" />
                GitHub
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-zinc-600 mt-6">
          Built with <span className="text-brand-accent">♦</span> for SIH 2025
          — AI-Powered Social Intelligence
        </p>
      </div>
    </div>
  );
}
