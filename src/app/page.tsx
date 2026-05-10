import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Calendar, Clock, Link2, Video, Bell, BarChart3, Globe, Puzzle } from "lucide-react";

const features = [
  { icon: Calendar, title: "Calendar Integration", desc: "Sync with Google Calendar, Outlook & Apple Calendar automatically." },
  { icon: Clock, title: "Smart Availability", desc: "Set working hours, buffer times, and max bookings per day." },
  { icon: Link2, title: "Shareable Booking Link", desc: "One link for all your meeting types. Share it anywhere." },
  { icon: Video, title: "Video Conferencing", desc: "Auto-generate Zoom or Google Meet links for every booking." },
  { icon: Bell, title: "Reminders & Notifications", desc: "Automated email & SMS reminders to reduce no-shows." },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Track bookings, popular times, and cancellation rates." },
  { icon: Globe, title: "Time Zone Detection", desc: "Guests see your availability in their local time zone." },
  { icon: Puzzle, title: "Embeddable Widget", desc: "Drop a booking widget directly on your website." },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image src="/scheduly-logo-lockup.svg" alt="Scheduly" width={130} height={32} priority />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/login">
              <Button size="sm">Get started free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center bg-gradient-to-b from-blue-50 to-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            Google Calendar & Google Meet integration
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
            Scheduling that works<br />
            <span className="text-blue-600">as hard as you do</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10">
            Share your Scheduly link. Let guests pick a time. It just works — with automatic calendar sync, video links, and reminders built in.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto">
                Sign up free with Google
              </Button>
            </Link>
            <Link href="/book/demo/30min">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                See a live demo
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-400">No credit card required · Free forever plan</p>
        </div>

        {/* Mock UI preview */}
        <div className="mt-16 max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-100 px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <div className="flex-1 mx-4 bg-white rounded-md px-3 py-1 text-xs text-slate-400">
              scheduly.app/yourname
            </div>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {["30 min call", "1 hour deep dive", "Quick check-in"].map((title, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-5 text-left hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                <div className={`w-10 h-10 rounded-lg mb-3 flex items-center justify-center ${["bg-blue-100", "bg-purple-100", "bg-green-100"][i]}`}>
                  <Clock className={`w-5 h-5 ${["text-blue-600", "text-purple-600", "text-green-600"][i]}`} />
                </div>
                <h3 className="font-semibold text-slate-900">{title}</h3>
                <p className="text-sm text-slate-500 mt-1">{[30, 60, 15][i]} minutes · Google Meet</p>
                <div className="mt-3 text-xs font-medium text-blue-600">Book a time →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Everything you need to schedule smarter</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Scheduly replaces back-and-forth emails with a seamless booking experience.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-sm transition-all">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Up and running in 3 steps</h2>
          <p className="text-lg text-slate-500 mb-16">No complex setup. No credit card needed.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { step: "01", title: "Sign up with Google", desc: "Connect your Google account and calendar in one click." },
              { step: "02", title: "Create event types", desc: "Set up meeting types with custom durations and questions." },
              { step: "03", title: "Share your link", desc: "Send your Scheduly link and let guests book themselves." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold mb-4">
                  {step}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-blue-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to stop the back-and-forth?</h2>
          <p className="text-blue-100 text-lg mb-8">Join thousands of professionals who schedule smarter with Scheduly.</p>
          <Link href="/login">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Get started for free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Image src="/scheduly-logo-lockup-dark.svg" alt="Scheduly" width={110} height={28} />
          <p className="text-sm">© 2026 Scheduly. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
