import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import ClassCard from '../components/ClassCard';
import {
  Calendar,
  Filter,
  BookmarkCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function Classes() {
  const { classesList, bookingCount } = useBooking();

  const [selectedDay, setSelectedDay] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const days = [
    { label: 'All Days', value: 'All' },
    { label: 'Mon', full: 'Monday', value: 'Monday' },
    { label: 'Tue', full: 'Tuesday', value: 'Tuesday' },
    { label: 'Wed', full: 'Wednesday', value: 'Wednesday' },
    { label: 'Thu', full: 'Thursday', value: 'Thursday' },
    { label: 'Fri', full: 'Friday', value: 'Friday' },
    { label: 'Sat', full: 'Saturday', value: 'Saturday' },
  ];

  const categories = ['All', 'Strength', 'HIIT', 'CrossFit', 'Power Yoga'];

  // Filtered classes memoized
  const filteredClasses = useMemo(() => {
    return classesList.filter((item) => {
      const matchDay = selectedDay === 'All' || item.day.toLowerCase() === selectedDay.toLowerCase();
      const matchCategory =
        selectedCategory === 'All' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase() ||
        (selectedCategory === 'Power Yoga' && item.category.toLowerCase().includes('yoga'));
      return matchDay && matchCategory;
    });
  }, [classesList, selectedDay, selectedCategory]);

  const resetFilters = () => {
    setSelectedDay('All');
    setSelectedCategory('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10 relative z-10">
      {/* 1. Header & Quick MyBookings Callout */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Interactive Weekly Timetable</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Weekly Class Schedule
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
            Reserve your spot in elite coach-led sessions. Capacity is strictly limited to maintain form correction and training intensity.
          </p>
        </div>

        {/* Live Reservation Indicator Box */}
        <div className="p-4 rounded-3xl bg-zinc-950 border border-zinc-800 flex items-center justify-between sm:justify-start gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-green-500/20 text-green-400">
              <BookmarkCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-zinc-400">Active Reservations</p>
              <p className="text-lg font-black text-white">
                {bookingCount} {bookingCount === 1 ? 'Class' : 'Classes'} Booked
              </p>
            </div>
          </div>
          <Link
            to="/my-bookings"
            className="px-5 py-2.5 rounded-full text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-green-500 flex items-center gap-1.5 transition-colors"
          >
            <span>View Bookings</span>
            <ArrowRight className="w-3.5 h-3.5 text-green-400" />
          </Link>
        </div>
      </div>

      {/* 2. Filter Controls (Day & Category) */}
      <div className="bg-zinc-950/90 border border-zinc-800 p-6 rounded-[2rem] shadow-xl space-y-6">
        {/* Day Filter Pills */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-green-400" />
            <span>Filter By Day</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {days.map((day) => {
              const isActive = selectedDay === day.value;
              return (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => setSelectedDay(day.value)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-green-500 text-black shadow-md shadow-green-500/30'
                      : 'bg-black text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span className="sm:hidden">{day.label}</span>
                  <span className="hidden sm:inline">{day.full || day.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="pt-4 border-t border-zinc-850">
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-green-400" />
            <span>Filter By Workout Category</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-black shadow-md'
                      : 'bg-black text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filter Status & Reset */}
        <div className="flex items-center justify-between text-xs text-zinc-400 pt-2">
          <span>
            Showing <strong className="text-white">{filteredClasses.length}</strong> of{' '}
            {classesList.length} scheduled workout sessions
          </span>
          {(selectedDay !== 'All' || selectedCategory !== 'All') && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-green-400 hover:text-green-300 font-bold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Class Cards Grid */}
      {filteredClasses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((item) => (
            <ClassCard key={item.id} workout={item} />
          ))}
        </div>
      ) : (
        /* Empty Filter State */
        <div className="p-12 text-center rounded-[2rem] bg-zinc-950 border border-zinc-800 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 text-zinc-400 flex items-center justify-center mx-auto">
            <Filter className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-white">No Workout Sessions Found</h3>
          <p className="text-sm text-zinc-400 max-w-md mx-auto">
            There are currently no sessions scheduled matching your selected day ({selectedDay}) and category ({selectedCategory}).
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-green-500 text-black hover:bg-green-400 transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear Filters</span>
          </button>
        </div>
      )}

      {/* 4. Bottom Info Callout */}
      <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-green-500/10 text-green-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Need personal training or custom programming?</p>
            <p className="text-xs text-zinc-400">All Pro Athlete and Elite VIP plans include certified 1-on-1 coach consultations.</p>
          </div>
        </div>
        <Link
          to="/join/pro-athlete"
          className="shrink-0 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest bg-green-500 hover:bg-green-400 text-black shadow-md shadow-green-500/20 transition-colors"
        >
          View Memberships
        </Link>
      </div>
    </div>
  );
}
