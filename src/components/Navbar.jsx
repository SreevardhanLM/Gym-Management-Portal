import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Dumbbell, Calendar, BookmarkCheck, Menu, X, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { bookingCount } = useBooking();

  const navLinkClass = ({ isActive }) =>
    `text-sm font-semibold tracking-wide transition-all px-3.5 py-1.5 rounded-full flex items-center gap-2 ${
      isActive
        ? 'text-green-400 bg-green-500/10 border border-green-500/20'
        : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
    }`;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo matching the reference vibe */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-green-600 via-emerald-500 to-green-400 flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-105 transition-transform">
              <Dumbbell className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
              Fitness<span className="text-green-400">Ch</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/classes" className={navLinkClass}>
              <Calendar className="w-4 h-4" />
              Classes & Timetable
            </NavLink>
            <NavLink to="/my-bookings" className={navLinkClass}>
              <BookmarkCheck className="w-4 h-4" />
              <span>My Bookings</span>
              {bookingCount > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-black text-black bg-green-400 rounded-full animate-pulse shadow-sm">
                  {bookingCount}
                </span>
              )}
            </NavLink>
          </nav>

          {/* Right Action: Glowing Neon Green Pill Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/classes"
              className="px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-wider bg-green-500 hover:bg-green-400 text-black shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 active:scale-100 transition-all flex items-center gap-1.5"
            >
              <span>BOOK A CLASS</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              to="/my-bookings"
              className="relative p-2 rounded-lg text-zinc-300 hover:text-white"
              title="My Bookings"
            >
              <BookmarkCheck className="w-6 h-6" />
              {bookingCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[10px] font-black text-black">
                  {bookingCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-black/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-base font-semibold text-zinc-200 hover:bg-zinc-900"
          >
            Home & Plans
          </Link>
          <Link
            to="/classes"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-base font-semibold text-zinc-200 hover:bg-zinc-900"
          >
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-400" />
              Weekly Class Schedule
            </span>
          </Link>
          <Link
            to="/my-bookings"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-base font-semibold text-zinc-200 hover:bg-zinc-900"
          >
            <span className="flex items-center gap-2">
              <BookmarkCheck className="w-5 h-5 text-green-400" />
              My Booked Classes
            </span>
            {bookingCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-black bg-green-500 text-black rounded-full">
                {bookingCount}
              </span>
            )}
          </Link>
          <div className="pt-3">
            <Link
              to="/classes"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full font-black text-xs uppercase tracking-wider text-black bg-green-500 hover:bg-green-400 shadow-lg shadow-green-500/30"
            >
              <span>BOOK A CLASS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
