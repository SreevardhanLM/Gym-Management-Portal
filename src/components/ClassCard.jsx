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
          badge: 'bg-green-500/15 text-green-400 border-green-500/30',
        };
      case 'hiit':
        return {
          icon: Flame,
          badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
        };
      case 'crossfit':
        return {
          icon: Zap,
          badge: 'bg-lime-500/15 text-lime-400 border-lime-500/30',
        };
      case 'power yoga':
      case 'yoga':
        return {
          icon: HeartHandshake,
          badge: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
        };
      default:
        return {
          icon: Dumbbell,
          badge: 'bg-zinc-800 text-zinc-300 border-zinc-700',
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
      className={`rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between border ${
        isBooked
          ? 'bg-zinc-950 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.2)]'
          : isFull
          ? 'bg-zinc-950/70 border-zinc-800/80 opacity-70'
          : 'bg-zinc-950/80 border-zinc-800 hover:border-green-500/40 hover:shadow-xl hover:-translate-y-1'
      }`}
    >
      <div>
        {/* Top Badges: Category & Day */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${meta.badge}`}
            >
              <CategoryIcon className="w-3.5 h-3.5" />
              <span>{workout.category}</span>
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800">
              {workout.day}
            </span>
          </div>

          {/* Intensity Pill */}
          <span className="text-[11px] font-bold text-zinc-400 bg-black px-2.5 py-0.5 rounded-full border border-zinc-800">
            {workout.intensity || 'High'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-white tracking-wide mb-2">
          {workout.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-zinc-400 leading-relaxed mb-5 min-h-[36px]">
          {workout.description}
        </p>

        {/* Schedule & Trainer Details */}
        <div className="space-y-2 mb-6 p-3.5 rounded-2xl bg-black border border-zinc-800">
          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <Clock className="w-4 h-4 text-green-400 shrink-0" />
            <span className="font-semibold">{workout.time}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">{workout.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <User className="w-4 h-4 text-green-400 shrink-0" />
            <span>Trainer: </span>
            <span className="font-bold text-white">{workout.trainer}</span>
          </div>
        </div>
      </div>

      {/* Spot Status & Action Button */}
      <div>
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="text-zinc-400 font-medium">Spots Availability:</span>
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
            <span className="font-bold text-green-400">
              {workout.spotsLeft} of {workout.totalSpots} spots
            </span>
          )}
        </div>

        {/* Capacity Bar */}
        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mb-5">
          <div
            className={`h-full transition-all duration-300 ${
              isFull ? 'bg-rose-500' : workout.spotsLeft <= 3 ? 'bg-amber-500' : 'bg-green-500'
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
            className="w-full py-3 px-4 rounded-full font-bold text-xs uppercase tracking-wider bg-green-500/20 hover:bg-rose-500/20 text-green-400 hover:text-rose-400 border border-green-500/40 hover:border-rose-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <CheckCircle2 className="w-4 h-4 group-hover:hidden" />
            <span className="group-hover:hidden">Booked ✓</span>
            <span className="hidden group-hover:inline">Cancel Reservation</span>
          </button>
        ) : isFull ? (
          <button
            type="button"
            disabled
            className="w-full py-3 px-4 rounded-full font-bold text-xs uppercase tracking-wider bg-zinc-900 text-zinc-500 border border-zinc-800 cursor-not-allowed text-center"
          >
            Class Full (Waitlist Only)
          </button>
        ) : (
          <button
            type="button"
            onClick={handleBookingToggle}
            className="w-full py-3 px-4 rounded-full font-black text-xs uppercase tracking-widest bg-green-500 hover:bg-green-400 text-black shadow-lg shadow-green-500/25 hover:scale-[1.02] active:scale-100 transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Book Spot</span>
          </button>
        )}
      </div>
    </div>
  );
}
