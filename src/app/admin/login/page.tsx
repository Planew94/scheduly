"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { adminLogin } from "@/lib/admin-auth";
import { Button } from "@/components/ui/button";
import { Shield, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@scheduly.app");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await adminLogin(email, password);
    if (result.success) {
      router.push("/admin");
    } else {
      setError(result.error ?? "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">

        {/* Logo + badge */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image src="/scheduly-logo-lockup-dark.svg" alt="Scheduly" width={140} height={34} />
          </div>
          <div className="inline-flex items-center gap-2 bg-red-950 border border-red-800 text-red-400 text-xs font-semibold px-3 py-1.5 rounded-full">
            <Shield className="w-3.5 h-3.5" />
            Admin access only
          </div>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-xl font-bold text-white mb-1">Admin sign in</h1>
          <p className="text-slate-400 text-sm mb-6">Restricted to authorised personnel only.</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-950 border border-red-800 text-red-400 text-sm px-4 py-3 rounded-lg mb-5">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full h-10 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Enter admin password"
                className="w-full h-10 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white mt-2"
            >
              {loading ? "Signing in…" : "Sign in to admin"}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          Not an admin?{" "}
          <a href="/login" className="text-slate-400 hover:text-white transition-colors">
            Go to regular login →
          </a>
        </p>
      </div>
    </div>
  );
}
