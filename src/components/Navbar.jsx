import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Dumbbell, Calendar, BookmarkCheck, Flame, Menu, X, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { bookingCount } = useBooking();

  const navLinkClass = ({ isActive }) =>
    `text-sm font-semibold transition-all px-3 py-1.5 rounded-lg flex items-center gap-2 ${
      isActive
        ? 'text-orange-400 bg-orange-500/10'
        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
    }`;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform">
              <Dumbbell className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-wider text-white uppercase flex items-center gap-1.5">
                IRON<span className="text-orange-500">PULSE</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  Gym
                </span>
              </span>
              <p className="text-[10px] tracking-widest uppercase text-slate-400 -mt-1 font-medium">
                Strength & Conditioning
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={navLinkClass}>
              Home & Plans
            </NavLink>
            <NavLink to="/classes" className={navLinkClass}>
              <Calendar className="w-4 h-4" />
              Classes & Timetable
            </NavLink>
            <NavLink to="/my-bookings" className={navLinkClass}>
              <BookmarkCheck className="w-4 h-4" />
              <span>My Bookings</span>
              {bookingCount > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-black leading-none text-slate-950 bg-orange-400 rounded-full animate-pulse shadow-sm">
                  {bookingCount}
                </span>
              )}
            </NavLink>
          </nav>

          {/* Right Action / CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/join/pro-athlete"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-400 hover:to-amber-300 transition-all shadow-md shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Join Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              to="/my-bookings"
              className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              title="My Bookings"
            >
              <BookmarkCheck className="w-6 h-6" />
              {bookingCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-slate-950">
                  {bookingCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-900/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold text-slate-200 hover:bg-slate-800"
          >
            Home & Plans
          </Link>
          <Link
            to="/classes"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold text-slate-200 hover:bg-slate-800"
          >
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-400" />
              Weekly Class Schedule
            </span>
          </Link>
          <Link
            to="/my-bookings"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold text-slate-200 hover:bg-slate-800"
          >
            <span className="flex items-center gap-2">
              <BookmarkCheck className="w-5 h-5 text-orange-400" />
              My Booked Classes
            </span>
            {bookingCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-bold bg-orange-500 text-slate-950 rounded-full">
                {bookingCount}
              </span>
            )}
          </Link>
          <div className="pt-2">
            <Link
              to="/join/pro-athlete"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-orange-500 to-amber-400 shadow-lg shadow-orange-500/25"
            >
              <span>Get Started / Join Membership</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
