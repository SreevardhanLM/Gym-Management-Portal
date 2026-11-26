import { Link } from 'react-router-dom';
import { Dumbbell, MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="text-xl font-black tracking-wider text-white uppercase">
                IRON<span className="text-orange-500">PULSE</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Forging peak athletic performance, strength, and mindset through world-class coaching, modern equipment, and an elite fitness community.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Olympic & Cross-Training Facility</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-4">
              Explore Portal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-orange-400 transition-colors">
                  Home & Membership Plans
                </Link>
              </li>
              <li>
                <Link to="/classes" className="hover:text-orange-400 transition-colors">
                  Weekly Class Timetable
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="hover:text-orange-400 transition-colors">
                  My Reserved Classes
                </Link>
              </li>
              <li>
                <Link to="/join/pro-athlete" className="hover:text-orange-400 transition-colors">
                  Join Membership
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-4">
              Training Hours
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-200">Monday - Friday</p>
                  <p className="text-xs text-slate-500">05:00 AM - 11:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-200">Saturday & Sunday</p>
                  <p className="text-xs text-slate-500">06:00 AM - 09:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-4">
              Club Location
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <span>88 Ironworks Blvd, Fitness District, Metropolis</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <span>+1 (800) 476-6785</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span>contact@ironpulse.fit</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} IronPulse Fitness Portal. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for peak performance
          </p>
        </div>
      </div>
    </footer>
  );
}
