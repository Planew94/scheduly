"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Video, Clock, Search, Filter, ChevronDown } from "lucide-react";

const bookings = [
  { id: 1, name: "Alex Rivera", email: "alex@example.com", event: "30 min call", date: "May 8, 2026", time: "2:00 PM", duration: "30 min", platform: "Google Meet", status: "upcoming", avatar: "AR" },
  { id: 2, name: "Priya Sharma", email: "priya@example.com", event: "1 hour deep dive", date: "May 8, 2026", time: "4:30 PM", duration: "60 min", platform: "Zoom", status: "upcoming", avatar: "PS" },
  { id: 3, name: "Tom Walsh", email: "tom@example.com", event: "Quick check-in", date: "May 9, 2026", time: "10:00 AM", duration: "15 min", platform: "Google Meet", status: "upcoming", avatar: "TW" },
  { id: 4, name: "Laura Chen", email: "laura@example.com", event: "30 min call", date: "May 9, 2026", time: "3:00 PM", duration: "30 min", platform: "Google Meet", status: "upcoming", avatar: "LC" },
  { id: 5, name: "Marcus Johnson", email: "marcus@example.com", event: "30 min call", date: "May 5, 2026", time: "11:00 AM", duration: "30 min", platform: "Google Meet", status: "completed", avatar: "MJ" },
  { id: 6, name: "Sofia Martinez", email: "sofia@example.com", event: "1 hour deep dive", date: "May 4, 2026", time: "2:00 PM", duration: "60 min", platform: "Zoom", status: "completed", avatar: "SM" },
  { id: 7, name: "David Park", email: "david@example.com", event: "Quick check-in", date: "May 3, 2026", time: "9:30 AM", duration: "15 min", platform: "Google Meet", status: "cancelled", avatar: "DP" },
];

const statusConfig = {
  upcoming: { label: "Upcoming", variant: "default" as const },
  completed: { label: "Completed", variant: "success" as const },
  cancelled: { label: "Cancelled", variant: "destructive" as const },
};

type StatusFilter = "all" | "upcoming" | "completed" | "cancelled";

export default function BookingsPage() {
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");

  const filtered = bookings.filter(b => {
    const matchesFilter = filter === "all" || b.status === filter;
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.event.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Bookings</h1>
        <p className="text-slate-500 mt-1">View and manage all your scheduled meetings</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or event type..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "upcoming", "completed", "cancelled"] as StatusFilter[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings list */}
      <Card>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">No bookings found</p>
            </div>
          ) : (
            filtered.map((booking, i) => (
              <div key={booking.id} className={`flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors ${i > 0 ? "border-t border-slate-100" : ""}`}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                  {booking.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-medium text-slate-900">{booking.name}</p>
                    <Badge variant={statusConfig[booking.status as keyof typeof statusConfig].variant} className="text-xs">
                      {statusConfig[booking.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500">{booking.email}</p>
                </div>
                <div className="hidden md:block text-center">
                  <p className="text-sm font-medium text-slate-700">{booking.event}</p>
                  <div className="flex items-center gap-1 justify-center mt-0.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="text-xs text-slate-400">{booking.duration}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-700">{booking.date}</p>
                  <p className="text-xs text-slate-400">{booking.time}</p>
                </div>
                <div className="hidden sm:flex items-center gap-1">
                  <Video className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs text-slate-400">{booking.platform}</span>
                </div>
                {booking.status === "upcoming" && (
                  <Button variant="outline" size="sm" className="hidden sm:flex">
                    Reschedule
                  </Button>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
