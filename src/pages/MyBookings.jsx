import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import {
  BookmarkCheck,
  Calendar,
  Clock,
  User,
  Trash2,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function MyBookings() {
  const { bookedClassIds, classesList, cancelBooking } = useBooking();

  // Find all booked classes matching the stored IDs
  const bookedClasses = classesList.filter((item) => bookedClassIds.includes(item.id));

  // Calculate total training minutes booked
  const totalMinutes = bookedClasses.reduce((acc, curr) => {
    const mins = parseInt(curr.duration, 10) || 60;
    return acc + mins;
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>Member Timetable</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            My Booked Classes
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
            View, manage, or modify your weekly coach-led workout reservations. All slots are saved directly in your browser.
          </p>
        </div>

        {/* Quick link to /classes */}
        <Link
          to="/classes"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-400 hover:to-amber-300 text-slate-950 shadow-lg shadow-orange-500/20 transition-all hover:scale-105 active:scale-100"
        >
          <Calendar className="w-4 h-4" />
          <span>Browse & Add More Sessions</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 2. Stats summary if user has bookings */}
      {bookedClasses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-orange-500/20 text-orange-400">
              <BookmarkCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-slate-400">Total Bookings</p>
              <p className="text-2xl font-black text-white font-mono">
                {bookedClasses.length} {bookedClasses.length === 1 ? 'Session' : 'Sessions'}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-slate-400">Scheduled Training</p>
              <p className="text-2xl font-black text-white font-mono">
                {totalMinutes} <span className="text-sm font-normal text-slate-400">minutes</span>
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-slate-400">Slot Guarantee</p>
              <p className="text-2xl font-black text-emerald-400 font-mono">Confirmed</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Bookings List or Empty State */}
      {bookedClasses.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Confirmed Reserved Slots ({bookedClasses.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookedClasses.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl p-6 bg-slate-900/90 border border-slate-800 hover:border-slate-700 shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Category & Day header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
                      {item.category}
                    </span>
                    <span className="text-xs font-bold text-slate-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                      {item.day}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h4 className="text-xl font-black text-white mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Schedule info box */}
                  <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 mb-6 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                      <span className="font-semibold">{item.time}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400">{item.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-orange-400 shrink-0" />
                      <span>Coach: </span>
                      <span className="font-bold text-white">{item.trainer}</span>
                    </div>
                  </div>
                </div>

                {/* Cancel Booking Action */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Slot Confirmed</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => cancelBooking(item.id)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 hover:border-rose-500 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel Reservation</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 md:p-20 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-slate-900 text-slate-500 border border-slate-800 flex items-center justify-center mx-auto">
            <Calendar className="w-10 h-10" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">
              No Workouts Booked Yet
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              You haven't reserved any weekly classes yet. Browse our weekly workout schedule and book your spot with zero hassle!
            </p>
          </div>
          <Link
            to="/classes"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider bg-orange-500 hover:bg-orange-400 text-slate-950 shadow-xl shadow-orange-500/20 transition-all hover:scale-105 active:scale-100"
          >
            <Calendar className="w-4 h-4" />
            <span>Explore Weekly Class Schedule</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
