import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, Calendar, TrendingUp, DollarSign, ArrowUpRight, Shield, Activity } from "lucide-react";

const platformStats = [
  { label: "Total users", value: "1,284", change: "+23 this week", icon: Users, color: "text-blue-400", bg: "bg-blue-950 border-blue-900" },
  { label: "Total bookings", value: "8,741", change: "+341 this week", icon: Calendar, color: "text-green-400", bg: "bg-green-950 border-green-900" },
  { label: "Active today", value: "94", change: "hosts with bookings", icon: Activity, color: "text-purple-400", bg: "bg-purple-950 border-purple-900" },
  { label: "Est. MRR", value: "$4,820", change: "+$340 vs last month", icon: DollarSign, color: "text-yellow-400", bg: "bg-yellow-950 border-yellow-900" },
];

const recentUsers = [
  { name: "Jane Doe", email: "jane@example.com", plan: "Pro", bookings: 24, joined: "May 8, 2026", status: "active" },
  { name: "Alex Rivera", email: "alex@example.com", plan: "Free", bookings: 3, joined: "May 7, 2026", status: "active" },
  { name: "Priya Sharma", email: "priya@example.com", plan: "Pro", bookings: 18, joined: "May 6, 2026", status: "active" },
  { name: "Tom Walsh", email: "tom@example.com", plan: "Free", bookings: 1, joined: "May 5, 2026", status: "inactive" },
  { name: "Laura Chen", email: "laura@example.com", plan: "Pro", bookings: 31, joined: "May 3, 2026", status: "active" },
];

const recentActivity = [
  { event: "New user signed up", detail: "marcus@example.com", time: "2 min ago" },
  { event: "Booking completed", detail: "Jane Doe → Alex Rivera", time: "14 min ago" },
  { event: "Pro plan upgrade", detail: "priya@example.com", time: "1 hr ago" },
  { event: "Account suspended", detail: "spam123@fake.com", time: "3 hr ago" },
  { event: "New user signed up", detail: "david@example.com", time: "4 hr ago" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-red-400" />
            <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Admin console</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Platform overview</h1>
          <p className="text-slate-400 text-sm mt-0.5">Saturday, May 9, 2026</p>
        </div>
        <Link href="/admin/users">
          <Button className="bg-white text-slate-900 hover:bg-slate-100 flex items-center gap-2">
            <Users className="w-4 h-4" /> Manage users
          </Button>
        </Link>
      </div>

      {/* Platform stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {platformStats.map(({ label, value, change, icon: Icon, color, bg }) => (
          <div key={label} className={`rounded-xl border p-5 ${bg}`}>
            <div className={`w-8 h-8 rounded-lg bg-black/30 flex items-center justify-center mb-3`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{label}</p>
            <p className={`text-xs mt-1 font-medium ${color}`}>{change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent users */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h2 className="text-sm font-semibold text-white">Recent users</h2>
              <Link href="/admin/users" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                View all <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            {recentUsers.map((user, i) => (
              <div key={i} className={`flex items-center gap-4 px-6 py-3.5 hover:bg-slate-800/50 transition-colors ${i > 0 ? "border-t border-slate-800" : ""}`}>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-slate-300">{user.bookings} bookings</p>
                  <p className="text-xs text-slate-500">{user.joined}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                  user.plan === "Pro"
                    ? "bg-blue-950 border-blue-800 text-blue-300"
                    : "bg-slate-800 border-slate-700 text-slate-400"
                }`}>{user.plan}</span>
                <Link href={`/admin/users?impersonate=${encodeURIComponent(user.email)}`}>
                  <button className="text-xs text-slate-500 hover:text-white border border-slate-700 hover:border-slate-500 px-2 py-1 rounded-md transition-colors">
                    View as
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-sm font-semibold text-white">Activity feed</h2>
          </div>
          <div className="divide-y divide-slate-800">
            {recentActivity.map((item, i) => (
              <div key={i} className="px-6 py-3.5">
                <p className="text-sm text-slate-200">{item.event}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.detail}</p>
                <p className="text-xs text-slate-600 mt-1">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plan breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-white mb-4">Plan breakdown</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { plan: "Free", users: 841, pct: 65, color: "bg-slate-600" },
            { plan: "Pro", users: 389, pct: 30, color: "bg-blue-500" },
            { plan: "Enterprise", users: 54, pct: 5, color: "bg-purple-500" },
          ].map(({ plan, users, pct, color }) => (
            <div key={plan}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-300">{plan}</span>
                <span className="text-sm font-semibold text-white">{users.toLocaleString()}</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-2 rounded-full ${color}`} style={{ width: `${pct}%` }} />
              </div>
              <p className="text-xs text-slate-500 mt-1">{pct}% of users</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
