import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, Copy, ExternalLink, Pencil, Trash2, Video, Users } from "lucide-react";

const eventTypes = [
  {
    id: "30min",
    title: "30 Minute Meeting",
    desc: "A quick intro or catch-up call.",
    duration: "30 min",
    type: "One-on-one",
    platform: "Google Meet",
    bookings: 14,
    color: "bg-blue-500",
    active: true,
  },
  {
    id: "deep-dive",
    title: "1 Hour Deep Dive",
    desc: "A thorough session for complex topics.",
    duration: "60 min",
    type: "One-on-one",
    platform: "Zoom",
    bookings: 7,
    color: "bg-purple-500",
    active: true,
  },
  {
    id: "quick",
    title: "Quick Check-in",
    desc: "A brief 15-minute status update.",
    duration: "15 min",
    type: "One-on-one",
    platform: "Google Meet",
    bookings: 3,
    color: "bg-green-500",
    active: true,
  },
  {
    id: "group",
    title: "Team Workshop",
    desc: "Group session for up to 10 participants.",
    duration: "90 min",
    type: "Group",
    platform: "Google Meet",
    bookings: 0,
    color: "bg-orange-500",
    active: false,
  },
];

export default function EventTypesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Event Types</h1>
          <p className="text-slate-500 mt-1">Create and manage your bookable meeting types</p>
        </div>
        <Link href="/dashboard/event-types/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New event type
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {eventTypes.map((et) => (
          <Card key={et.id} className={`relative overflow-hidden ${!et.active ? "opacity-60" : ""}`}>
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${et.color}`} />
            <CardContent className="pl-6 pr-5 py-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-900 truncate">{et.title}</h3>
                    {!et.active && <Badge variant="secondary" className="text-xs">Inactive</Badge>}
                  </div>
                  <p className="text-sm text-slate-500 mb-3">{et.desc}</p>

                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                      <Clock className="w-3 h-3" />
                      {et.duration}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                      <Users className="w-3 h-3" />
                      {et.type}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                      <Video className="w-3 h-3" />
                      {et.platform}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-1">
                    <span className="text-xs text-slate-400 flex-1 truncate">
                      scheduly.app/jane/{et.id}
                    </span>
                    <button className="p-1 hover:bg-slate-100 rounded" title="Copy link">
                      <Copy className="w-3 h-3 text-slate-400" />
                    </button>
                    <Link href={`/book/jane/${et.id}`}>
                      <button className="p-1 hover:bg-slate-100 rounded" title="Preview">
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-900">{et.bookings}</p>
                    <p className="text-xs text-slate-400">bookings</p>
                  </div>
                  <div className="flex gap-1">
                    <Link href={`/dashboard/event-types/${et.id}/edit`}>
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Edit">
                        <Pencil className="w-4 h-4 text-slate-400" />
                      </button>
                    </Link>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add new card */}
        <Link href="/dashboard/event-types/new">
          <Card className="border-dashed border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer h-full min-h-[140px]">
            <CardContent className="flex flex-col items-center justify-center h-full py-10 gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                <Plus className="w-5 h-5 text-slate-400" />
              </div>
              <p className="text-sm font-medium text-slate-500">Create new event type</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
