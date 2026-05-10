"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, Globe, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM",
];

const unavailableDays = [0, 6]; // Sun, Sat
const bookedSlots: Record<string, string[]> = {
  "8": ["10:00 AM", "2:00 PM"],
  "12": ["9:00 AM", "9:30 AM", "3:00 PM"],
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function BookingPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<"calendar" | "form" | "confirmed">("calendar");
  const [form, setForm] = useState({ name: "", email: "", notes: "" });

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const isPast = (day: number) => {
    const d = new Date(currentYear, currentMonth, day);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const availableSlots = selectedDay
    ? timeSlots.filter(s => !(bookedSlots[String(selectedDay)] || []).includes(s))
    : [];

  if (step === "confirmed") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">You&apos;re booked!</h2>
          <p className="text-slate-500 mb-6">
            A confirmation email has been sent to <strong>{form.email}</strong>.
          </p>
          <div className="bg-slate-50 rounded-xl p-5 text-left space-y-3 mb-6">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-slate-700">
                {MONTHS[currentMonth]} {selectedDay}, {currentYear}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-slate-700">{selectedTime} · 30 minutes</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Video className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 underline cursor-pointer">Join Google Meet</span>
            </div>
          </div>
          <Button variant="outline" onClick={() => { setStep("calendar"); setSelectedDay(null); setSelectedTime(null); }}>
            Book another time
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden w-full max-w-3xl">
        {/* Host info */}
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-72 border-b sm:border-b-0 sm:border-r border-slate-100 p-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg mb-4">
              JD
            </div>
            <h2 className="font-semibold text-slate-900 text-lg">Jane Doe</h2>
            <h1 className="text-xl font-bold text-slate-900 mt-1 mb-3">30 Minute Meeting</h1>
            <div className="space-y-2.5 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                30 min
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-slate-400" />
                Google Meet
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-400" />
                Eastern Time (ET)
              </div>
            </div>
            {selectedDay && selectedTime && step === "calendar" && (
              <div className="mt-6 pt-6 border-t border-slate-100">
                <p className="text-xs text-slate-400 mb-1">Selected</p>
                <p className="text-sm font-medium text-slate-900">{MONTHS[currentMonth]} {selectedDay}</p>
                <p className="text-sm text-slate-600">{selectedTime}</p>
              </div>
            )}
          </div>

          {step === "calendar" && (
            <div className="flex-1 p-6 sm:p-8">
              {!selectedDay ? (
                <>
                  {/* Month header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-slate-900">{MONTHS[currentMonth]} {currentYear}</h3>
                    <div className="flex gap-1">
                      <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Day labels */}
                  <div className="grid grid-cols-7 mb-2">
                    {DAYS.map(d => (
                      <div key={d} className="text-center text-xs font-medium text-slate-400 py-1">{d}</div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                      const dayOfWeek = new Date(currentYear, currentMonth, day).getDay();
                      const disabled = unavailableDays.includes(dayOfWeek) || isPast(day);
                      return (
                        <button
                          key={day}
                          disabled={disabled}
                          onClick={() => !disabled && setSelectedDay(day)}
                          className={cn(
                            "aspect-square rounded-full text-sm font-medium transition-colors flex items-center justify-center",
                            disabled ? "text-slate-300 cursor-not-allowed" : "text-slate-700 hover:bg-blue-50 hover:text-blue-700",
                            selectedDay === day && "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                          )}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => setSelectedDay(null)} className="p-2 hover:bg-slate-100 rounded-lg">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <h3 className="font-semibold text-slate-900">
                      {DAYS[new Date(currentYear, currentMonth, selectedDay).getDay()]}, {MONTHS[currentMonth]} {selectedDay}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-1">
                    {availableSlots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={cn(
                          "py-2.5 rounded-lg text-sm font-medium border transition-colors",
                          selectedTime === slot
                            ? "bg-blue-600 text-white border-blue-600"
                            : "border-blue-200 text-blue-700 hover:bg-blue-50"
                        )}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  {selectedTime && (
                    <Button className="w-full mt-5" onClick={() => setStep("form")}>
                      Confirm time — {selectedTime}
                    </Button>
                  )}
                </>
              )}
            </div>
          )}

          {step === "form" && (
            <div className="flex-1 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <button onClick={() => setStep("calendar")} className="p-2 hover:bg-slate-100 rounded-lg">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <h3 className="font-semibold text-slate-900">Your details</h3>
              </div>
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); setStep("confirmed"); }}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Anything to share before our meeting?
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={e => setForm({ ...form, notes: e.target.value })}
                    rows={3}
                    placeholder="Optional notes, agenda items..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Confirm booking
                </Button>
                <p className="text-xs text-center text-slate-400">
                  By scheduling you agree to receive a calendar invite and reminder email.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
