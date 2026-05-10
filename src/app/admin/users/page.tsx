"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, UserX, Eye, Ban, CheckCircle, MoreHorizontal, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const allUsers = [
  { id: "1", name: "Jane Doe", email: "jane@example.com", plan: "Pro", bookings: 24, joined: "May 8, 2026", status: "active", lastSeen: "Today" },
  { id: "2", name: "Alex Rivera", email: "alex@example.com", plan: "Free", bookings: 3, joined: "May 7, 2026", status: "active", lastSeen: "Today" },
  { id: "3", name: "Priya Sharma", email: "priya@example.com", plan: "Pro", bookings: 18, joined: "May 6, 2026", status: "active", lastSeen: "Yesterday" },
  { id: "4", name: "Tom Walsh", email: "tom@example.com", plan: "Free", bookings: 1, joined: "May 5, 2026", status: "inactive", lastSeen: "3 days ago" },
  { id: "5", name: "Laura Chen", email: "laura@example.com", plan: "Pro", bookings: 31, joined: "May 3, 2026", status: "active", lastSeen: "Today" },
  { id: "6", name: "Marcus Johnson", email: "marcus@example.com", plan: "Free", bookings: 7, joined: "Apr 28, 2026", status: "active", lastSeen: "2 days ago" },
  { id: "7", name: "Sofia Martinez", email: "sofia@example.com", plan: "Enterprise", bookings: 94, joined: "Apr 15, 2026", status: "active", lastSeen: "Today" },
  { id: "8", name: "David Park", email: "david@example.com", plan: "Free", bookings: 0, joined: "Apr 10, 2026", status: "suspended", lastSeen: "5 days ago" },
  { id: "9", name: "Emma Wilson", email: "emma@example.com", plan: "Pro", bookings: 12, joined: "Apr 5, 2026", status: "active", lastSeen: "Yesterday" },
  { id: "10", name: "James Brown", email: "james@example.com", plan: "Enterprise", bookings: 67, joined: "Mar 22, 2026", status: "active", lastSeen: "Today" },
];

type StatusFilter = "all" | "active" | "inactive" | "suspended";

const statusStyles: Record<string, string> = {
  active: "bg-green-950 border-green-800 text-green-400",
  inactive: "bg-slate-800 border-slate-700 text-slate-400",
  suspended: "bg-red-950 border-red-800 text-red-400",
};

export default function AdminUsersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const impersonating = searchParams.get("impersonate");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [userStatuses, setUserStatuses] = useState<Record<string, string>>({});
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const getStatus = (user: typeof allUsers[0]) => userStatuses[user.id] ?? user.status;

  const filtered = allUsers.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || getStatus(u) === statusFilter;
    return matchSearch && matchStatus;
  });

  const toggleStatus = (id: string, current: string) => {
    setUserStatuses(prev => ({
      ...prev,
      [id]: current === "suspended" ? "active" : "suspended",
    }));
    setActiveMenu(null);
  };

  const handleImpersonate = (email: string) => {
    router.push(`/dashboard?as=${encodeURIComponent(email)}&admin_return=/admin/users`);
  };

  return (
    <div className="space-y-6">
      {/* Impersonation banner */}
      {impersonating && (
        <div className="flex items-center justify-between bg-yellow-950 border border-yellow-800 text-yellow-300 px-5 py-3 rounded-xl text-sm">
          <span>Ready to impersonate <strong>{impersonating}</strong> — click &ldquo;View as&rdquo; below to switch.</span>
          <button onClick={() => router.push("/admin/users")} className="hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-slate-400 text-sm mt-0.5">{allUsers.length} total users on the platform</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="w-full h-10 pl-9 pr-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "active", "inactive", "suspended"] as StatusFilter[]).map(f => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors border",
                statusFilter === f
                  ? "bg-white text-slate-900 border-white"
                  : "bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-white"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-800 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <div className="col-span-4">User</div>
          <div className="col-span-2 hidden md:block">Plan</div>
          <div className="col-span-2 hidden md:block">Bookings</div>
          <div className="col-span-2 hidden lg:block">Last seen</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            <UserX className="w-8 h-8 mx-auto mb-2 opacity-40" />
            No users found
          </div>
        ) : (
          filtered.map((user, i) => {
            const status = getStatus(user);
            return (
              <div key={user.id} className={cn(
                "grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-800/40 transition-colors relative",
                i > 0 && "border-t border-slate-800"
              )}>
                {/* User */}
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                    {user.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                </div>

                {/* Plan */}
                <div className="col-span-2 hidden md:block">
                  <span className={cn(
                    "text-xs font-semibold px-2 py-0.5 rounded-full border",
                    user.plan === "Pro" ? "bg-blue-950 border-blue-800 text-blue-300" :
                    user.plan === "Enterprise" ? "bg-purple-950 border-purple-800 text-purple-300" :
                    "bg-slate-800 border-slate-700 text-slate-400"
                  )}>{user.plan}</span>
                </div>

                {/* Bookings */}
                <div className="col-span-2 hidden md:block text-sm text-slate-300">{user.bookings}</div>

                {/* Last seen */}
                <div className="col-span-2 hidden lg:block text-sm text-slate-400">{user.lastSeen}</div>

                {/* Status + Actions */}
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full border capitalize hidden sm:inline-flex", statusStyles[status])}>
                    {status}
                  </span>

                  <div className="relative">
                    <button
                      onClick={() => setActiveMenu(activeMenu === user.id ? null : user.id)}
                      className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>

                    {activeMenu === user.id && (
                      <div className="absolute right-0 top-8 z-20 w-44 bg-slate-800 border border-slate-700 rounded-xl shadow-xl py-1 text-sm">
                        <button
                          onClick={() => { handleImpersonate(user.email); setActiveMenu(null); }}
                          className="flex items-center gap-2 w-full px-4 py-2.5 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" /> View as user
                        </button>
                        <button
                          onClick={() => toggleStatus(user.id, status)}
                          className={cn(
                            "flex items-center gap-2 w-full px-4 py-2.5 transition-colors",
                            status === "suspended"
                              ? "text-green-400 hover:bg-slate-700"
                              : "text-red-400 hover:bg-slate-700"
                          )}
                        >
                          {status === "suspended"
                            ? <><CheckCircle className="w-3.5 h-3.5" /> Reinstate user</>
                            : <><Ban className="w-3.5 h-3.5" /> Suspend user</>
                          }
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Click-away for menu */}
      {activeMenu && (
        <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
      )}
    </div>
  );
}
