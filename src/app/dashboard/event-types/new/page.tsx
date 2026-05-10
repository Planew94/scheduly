"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, Video, Globe, Plus, Trash2 } from "lucide-react";

const durations = [15, 20, 30, 45, 60, 90, 120];
const platforms = ["Google Meet", "Zoom", "Microsoft Teams", "Phone call", "In person"];
const colors = [
  "bg-blue-500", "bg-purple-500", "bg-green-500",
  "bg-orange-500", "bg-pink-500", "bg-red-500", "bg-teal-500"
];

export default function NewEventTypePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(30);
  const [platform, setPlatform] = useState("Google Meet");
  const [color, setColor] = useState("bg-blue-500");
  const [questions, setQuestions] = useState([{ label: "Please share anything that will help prepare for our meeting.", required: false }]);

  const addQuestion = () => setQuestions([...questions, { label: "", required: false }]);
  const removeQuestion = (i: number) => setQuestions(questions.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/event-types">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">New event type</h1>
          <p className="text-slate-500 text-sm">Create a new bookable meeting type</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Basic info */}
        <Card>
          <CardHeader><CardTitle className="text-base">Basic information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Event name *</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. 30 Minute Meeting"
                className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe what this meeting is for..."
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Color</label>
              <div className="flex gap-2">
                {colors.map(c => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-7 h-7 rounded-full ${c} transition-all ${color === c ? "ring-2 ring-offset-2 ring-blue-500 scale-110" : "hover:scale-105"}`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Duration */}
        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Clock className="w-4 h-4" /> Duration</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {durations.map(d => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                    duration === d
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                  }`}
                >
                  {d >= 60 ? `${d / 60}h` : `${d}min`}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Video className="w-4 h-4" /> Location / platform</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {platforms.map(p => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors border text-left ${
                    platform === p
                      ? "bg-blue-50 text-blue-700 border-blue-300"
                      : "bg-white text-slate-600 border-slate-200 hover:border-blue-200"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Availability */}
        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Globe className="w-4 h-4" /> Availability</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Minimum notice</label>
                <select className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option>1 hour</option>
                  <option>2 hours</option>
                  <option>4 hours</option>
                  <option>1 day</option>
                  <option>2 days</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Max advance booking</label>
                <select className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option>7 days</option>
                  <option>14 days</option>
                  <option>30 days</option>
                  <option>60 days</option>
                  <option>90 days</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Buffer time after meeting</label>
              <select className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option>No buffer</option>
                <option>5 minutes</option>
                <option>10 minutes</option>
                <option>15 minutes</option>
                <option>30 minutes</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Booking form questions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Booking form questions</CardTitle>
            <Button variant="ghost" size="sm" onClick={addQuestion} className="flex items-center gap-1 text-blue-600">
              <Plus className="w-3 h-3" /> Add question
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Always-included fields */}
            {["Name", "Email"].map(field => (
              <div key={field} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <input
                  type="text"
                  value={field}
                  readOnly
                  className="flex-1 text-sm text-slate-500 bg-transparent outline-none"
                />
                <Badge variant="secondary" className="text-xs">Always included</Badge>
              </div>
            ))}
            {questions.map((q, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={q.label}
                  onChange={e => {
                    const next = [...questions];
                    next[i] = { ...next[i], label: e.target.value };
                    setQuestions(next);
                  }}
                  placeholder="Question text..."
                  className="flex-1 h-9 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button onClick={() => removeQuestion(i)} className="p-2 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pb-6">
          <Link href="/dashboard/event-types">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button onClick={() => (window.location.href = "/dashboard/event-types")}>
            Create event type
          </Button>
        </div>
      </div>
    </div>
  );
}
