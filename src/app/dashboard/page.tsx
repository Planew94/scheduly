import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, TrendingUp, Plus, Copy, ExternalLink, Video } from "lucide-react";

const stats = [
  { label: "Bookings this month", value: "24", change: "+12%", icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Hours scheduled", value: "18.5", change: "+8%", icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Unique guests", value: "19", change: "+5%", icon: Users, color: "text-green-600", bg: "bg-green-50" },
  { label: "Completion rate", value: "94%", change: "+2%", icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50" },
];

const upcomingBookings = [
  { name: "Alex Rivera", event: "30 min call", time: "Today, 2:00 PM", type: "Google Meet", avatar: "AR" },
  { name: "Priya Sharma", event: "1 hour deep dive", time: "Today, 4:30 PM", type: "Zoom", avatar: "PS" },
  { name: "Tom Walsh", event: "Quick check-in", time: "Tomorrow, 10:00 AM", type: "Google Meet", avatar: "TW" },
  { name: "Laura Chen", event: "30 min call", time: "Tomorrow, 3:00 PM", type: "Google Meet", avatar: "LC" },
];

const eventTypes = [
  { title: "30 min call", duration: "30 min", bookings: 14, link: "scheduly.app/jane/30min", color: "bg-blue-500" },
  { title: "1 hour deep dive", duration: "60 min", bookings: 7, link: "scheduly.app/jane/deep-dive", color: "bg-purple-500" },
  { title: "Quick check-in", duration: "15 min", bookings: 3, link: "scheduly.app/jane/quick", color: "bg-green-500" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Good morning, Jane 👋</h1>
          <p className="text-slate-500 mt-1">Thursday, May 8 · Here&apos;s what&apos;s on your schedule</p>
        </div>
        <Link href="/dashboard/event-types/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New event type
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, change, icon: Icon, color, bg }) => (
          <Card key={label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <Badge variant="success" className="text-xs">{change}</Badge>
              </div>
              <p className="text-2xl font-bold text-slate-900">{value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming bookings */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Upcoming bookings</CardTitle>
              <Link href="/dashboard/bookings">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">View all</Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {upcomingBookings.map((booking, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4 border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                    {booking.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">{booking.name}</p>
                    <p className="text-xs text-slate-500">{booking.event}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-slate-700">{booking.time}</p>
                    <div className="flex items-center gap-1 justify-end mt-0.5">
                      <Video className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-400">{booking.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Event types */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Your event types</CardTitle>
              <Link href="/dashboard/event-types">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">Manage</Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {eventTypes.map((et, i) => (
                <div key={i} className="px-6 py-4 border-t border-slate-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-2 h-2 rounded-full ${et.color}`} />
                    <span className="text-sm font-medium text-slate-900">{et.title}</span>
                    <Badge variant="secondary" className="ml-auto text-xs">{et.duration}</Badge>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{et.bookings} bookings this month</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 truncate flex-1">{et.link}</span>
                    <button className="p-1 hover:bg-slate-100 rounded" title="Copy link">
                      <Copy className="w-3 h-3 text-slate-400" />
                    </button>
                    <button className="p-1 hover:bg-slate-100 rounded" title="Open">
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Calendar integration banner */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-slate-900 text-sm">Connect Google Calendar</p>
              <p className="text-xs text-slate-500">Sync your availability and auto-create events for new bookings</p>
            </div>
          </div>
          <Link href="/dashboard/settings">
            <Button size="sm">Connect now</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
