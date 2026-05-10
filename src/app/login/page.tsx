"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 flex-col justify-between p-12">
        <Link href="/">
          <Image src="/scheduly-logo-lockup-dark.svg" alt="Scheduly" width={130} height={32} />
        </Link>

        <div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-6">
            Your calendar,<br />your rules.
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed mb-10">
            Connect your Google account to start accepting bookings in minutes. No manual setup, no back-and-forth.
          </p>

          {/* Testimonial */}
          <div className="bg-white/10 rounded-2xl p-6">
            <p className="text-white text-sm leading-relaxed mb-4">
              &ldquo;Scheduly saved me hours every week. My clients love the clean booking experience and I love that it just syncs with my Google Calendar automatically.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-semibold text-sm">
                JD
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Jane Doe</p>
                <p className="text-blue-200 text-xs">Freelance Consultant</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6 text-blue-200 text-sm">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link href="/">
              <Image src="/scheduly-logo-lockup.svg" alt="Scheduly" width={130} height={32} />
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
          <p className="text-slate-500 mb-10">Sign in to your account to continue</p>

          {/* Google Sign In Button */}
          <Button
            variant="outline"
            size="lg"
            className="w-full flex items-center gap-3 border-slate-200 hover:bg-slate-50 mb-6"
            onClick={() => alert("Google OAuth — add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to .env.local to enable")}
          >
            <GoogleIcon />
            <span className="font-medium text-slate-700">Continue with Google</span>
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-slate-400">or continue with email</span>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <a href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full"
              onClick={(e) => { e.preventDefault(); window.location.href = "/dashboard"; }}
            >
              Sign in
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-600 font-medium hover:underline">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
