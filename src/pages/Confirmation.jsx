import { useLocation, Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import {
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Dumbbell,
  QrCode,
  BookmarkCheck,
} from 'lucide-react';

export default function Confirmation() {
  const location = useLocation();
  const { lastRegistration } = useBooking();

  // Retrieve registration data from navigation state or localStorage fallback
  const registration = location.state?.registration || lastRegistration;

  if (!registration) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 text-slate-400 flex items-center justify-center mx-auto border border-slate-800">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">No Active Registration Found</h2>
        <p className="text-slate-400 text-sm">
          It looks like you haven't completed a membership registration yet.
        </p>
        <Link
          to="/#plans"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-slate-950 font-bold text-sm uppercase tracking-wider"
        >
          <span>Choose a Membership Tier</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const { member, plan, orderId, timestamp } = registration;
  const formattedDate = new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
      {/* 1. Success Banner */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>
        <span className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Registration Confirmed
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          Welcome to IronPulse, {member.fullName.split(' ')[0]}!
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
          Your membership has been activated successfully. Your digital access pass is ready to use immediately.
        </p>
      </div>

      {/* 2. Digital Membership Pass & Order Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Left: Digital Pass Graphic (5 cols) */}
        <div className="md:col-span-5 rounded-3xl p-6 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 text-slate-950 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          {/* Subtle watermarked logo */}
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <Dumbbell className="w-56 h-56" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-md bg-slate-950 text-orange-400">
                Member Pass
              </span>
              <span className="text-xs font-mono font-bold text-slate-950/80">
                ID: {orderId}
              </span>
            </div>

            <h3 className="text-2xl font-black uppercase tracking-wide leading-tight mb-1 text-slate-950">
              {member.fullName}
            </h3>
            <p className="text-xs font-bold text-slate-900/80 uppercase tracking-wider mb-6">
              {plan.name} Tier • {plan.billingCycle} Access
            </p>

            <div className="space-y-1.5 text-xs text-slate-900 font-semibold mb-6">
              <p>Activation Date: {member.startDate}</p>
              <p>Facility Access: All Zones & Locker Rooms</p>
              {plan.includePersonalTrainer && (
                <p className="font-bold flex items-center gap-1 text-slate-950">
                  <Sparkles className="w-3.5 h-3.5" />
                  1-on-1 Personal Coaching Included
                </p>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-950/20 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-900/70">
                Access Code
              </p>
              <p className="text-sm font-black font-mono tracking-widest text-slate-950">
                {orderId}-PASS
              </p>
            </div>
            <div className="p-2 bg-slate-950 text-white rounded-xl shadow-md">
              <QrCode className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Right: Registration & Billing Details (7 cols) */}
        <div className="md:col-span-7 rounded-3xl p-6 sm:p-8 bg-slate-900/90 border border-slate-800 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                Enrollment Receipt
              </h3>
              <span className="text-xs text-slate-400 font-mono">{formattedDate}</span>
            </div>

            {/* Member Details */}
            <div className="grid grid-cols-2 gap-4 text-xs mb-6 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div>
                <span className="text-slate-500 font-medium">Email</span>
                <p className="text-slate-200 font-semibold truncate mt-0.5">{member.email}</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Phone</span>
                <p className="text-slate-200 font-semibold mt-0.5">{member.phone}</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Target Goal</span>
                <p className="text-slate-200 font-semibold mt-0.5">{member.primaryGoal}</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Experience Level</span>
                <p className="text-slate-200 font-semibold capitalize mt-0.5">{member.fitnessLevel}</p>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between text-slate-400">
                <span>{plan.name} Plan ({plan.billingCycle})</span>
                <span className="text-white font-mono font-semibold">${plan.basePrice}/mo</span>
              </div>

              {plan.includePersonalTrainer && (
                <div className="flex justify-between text-orange-400 text-xs">
                  <span>1-on-1 Dedicated Coaching Add-on</span>
                  <span className="font-mono font-semibold">+${plan.ptRate}/mo</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Amount Paid (Simulated)</span>
                <div className="text-right">
                  <span className="text-2xl font-black text-white font-mono">
                    ${plan.totalBilledToday}
                  </span>
                  <span className="text-[10px] text-slate-500 block">USD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Navigation Buttons */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
            <Link
              to="/classes"
              className="flex-1 py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider bg-orange-500 hover:bg-orange-400 text-slate-950 flex items-center justify-center gap-2 transition-all shadow-md shadow-orange-500/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Your First Class</span>
            </Link>
            <Link
              to="/my-bookings"
              className="py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
            >
              <BookmarkCheck className="w-4 h-4 text-orange-400" />
              <span>View Bookings</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
