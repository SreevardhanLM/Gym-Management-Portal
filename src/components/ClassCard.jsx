import { useBooking } from '../context/BookingContext';
import { Clock, User, CheckCircle2, AlertCircle, Dumbbell, Zap, Flame, HeartHandshake } from 'lucide-react';

export default function ClassCard({ workout }) {
  const { bookedClassIds, bookClass, cancelBooking } = useBooking();

  const isBooked = bookedClassIds.includes(workout.id);
  const isFull = workout.spotsLeft <= 0;

  // Category Icon & Badge
  const getCategoryMeta = (cat) => {
    switch (cat.toLowerCase()) {
      case 'strength':
        return {
          icon: Dumbbell,
          badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          accent: 'border-amber-500/30',
        };
      case 'hiit':
        return {
          icon: Flame,
          badge: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
          accent: 'border-orange-500/30',
        };
      case 'crossfit':
        return {
          icon: Zap,
          badge: 'bg-red-500/15 text-red-400 border-red-500/30',
          accent: 'border-red-500/30',
        };
      case 'power yoga':
      case 'yoga':
        return {
          icon: HeartHandshake,
          badge: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
          accent: 'border-purple-500/30',
        };
      default:
        return {
          icon: Dumbbell,
          badge: 'bg-slate-800 text-slate-300 border-slate-700',
          accent: 'border-slate-800',
        };
    }
  };

  const meta = getCategoryMeta(workout.category);
  const CategoryIcon = meta.icon;

  const handleBookingToggle = () => {
    if (isBooked) {
      cancelBooking(workout.id);
    } else if (!isFull) {
      bookClass(workout.id);
    }
  };

  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between border ${
        isBooked
          ? 'bg-slate-900 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
          : isFull
          ? 'bg-slate-950/70 border-slate-800/80 opacity-75'
          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:shadow-xl hover:-translate-y-1'
      }`}
    >
      <div>
        {/* Top Badges: Category & Day */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border uppercase tracking-wider ${meta.badge}`}
            >
              <CategoryIcon className="w-3.5 h-3.5" />
              <span>{workout.category}</span>
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {workout.day}
            </span>
          </div>

          {/* Intensity Pill */}
          <span className="text-[11px] font-bold text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
            {workout.intensity || 'High'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-white tracking-wide mb-2">
          {workout.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-400 leading-relaxed mb-5 min-h-[36px]">
          {workout.description}
        </p>

        {/* Schedule & Trainer Details */}
        <div className="space-y-2 mb-6 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Clock className="w-4 h-4 text-orange-400 shrink-0" />
            <span className="font-semibold">{workout.time}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">{workout.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <User className="w-4 h-4 text-orange-400 shrink-0" />
            <span>Trainer: </span>
            <span className="font-bold text-white">{workout.trainer}</span>
          </div>
        </div>
      </div>

      {/* Spot Status & Action Button */}
      <div>
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="text-slate-400 font-medium">Spots Availability:</span>
          {isFull && !isBooked ? (
            <span className="font-bold text-rose-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Class Full
            </span>
          ) : workout.spotsLeft <= 3 ? (
            <span className="font-bold text-amber-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Only {workout.spotsLeft} left!
            </span>
          ) : (
            <span className="font-bold text-emerald-400">
              {workout.spotsLeft} of {workout.totalSpots} spots
            </span>
          )}
        </div>

        {/* Capacity Bar */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-5">
          <div
            className={`h-full transition-all duration-300 ${
              isFull ? 'bg-rose-500' : workout.spotsLeft <= 3 ? 'bg-amber-500' : 'bg-emerald-500'
            }`}
            style={{
              width: `${Math.round(((workout.totalSpots - workout.spotsLeft) / workout.totalSpots) * 100)}%`,
            }}
          />
        </div>

        {/* Button */}
        {isBooked ? (
          <button
            type="button"
            onClick={handleBookingToggle}
            className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-emerald-500/20 hover:bg-rose-500/20 text-emerald-400 hover:text-rose-400 border border-emerald-500/40 hover:border-rose-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <CheckCircle2 className="w-4 h-4 group-hover:hidden" />
            <span className="group-hover:hidden">Booked ✓</span>
            <span className="hidden group-hover:inline">Cancel Reservation</span>
          </button>
        ) : isFull ? (
          <button
            type="button"
            disabled
            className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-slate-800/60 text-slate-500 border border-slate-800 cursor-not-allowed text-center"
          >
            Class Full (Waitlist Only)
          </button>
        ) : (
          <button
            type="button"
            onClick={handleBookingToggle}
            className="w-full py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 shadow-md shadow-orange-500/20 hover:scale-[1.02] active:scale-100 transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Book Spot</span>
          </button>
        )}
      </div>
    </div>
  );
}
