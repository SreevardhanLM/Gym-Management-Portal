import { useState } from 'react';
import { Link } from 'react-router-dom';
import plansData from '../data/plans.json';
import PlanCard from '../components/PlanCard';
import BMICalculator from '../components/BMICalculator';
import {
  Flame,
  Dumbbell,
  Calendar,
  ShieldCheck,
  Award,
  Zap,
  ArrowRight,
  Users,
  Clock,
  HeartPulse,
} from 'lucide-react';

export default function Home() {
  const [isAnnual, setIsAnnual] = useState(false);

  // Certified trainers showcase data
  const trainers = [
    {
      name: 'Arjun Menon',
      role: 'Head HIIT & Metabolic Conditioning Coach',
      certifications: 'CSCS, ACE Master Trainer',
      experience: '9+ Years Exp',
      specialty: 'High-energy cardiovascular intervals, functional stamina, and athletic agility.',
      badgeColor: 'border-orange-500/30 text-orange-400 bg-orange-500/10',
    },
    {
      name: 'Elena Rostova',
      role: 'Elite Strength & Barbell Specialist',
      certifications: 'USAW Level 2, NSCA-CPT',
      experience: '11+ Years Exp',
      specialty: 'Olympic weightlifting, compound deadlift mechanics, and hypertrophy volume cycling.',
      badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
    },
    {
      name: 'Marcus Vance',
      role: 'CrossFit & Functional Athletic Director',
      certifications: 'CrossFit Level 3 (CCFT)',
      experience: '8+ Years Exp',
      specialty: 'Gymnastic stamina, kettlebell mechanics, team WOD programming, and endurance.',
      badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    },
    {
      name: 'Priya Sharma',
      role: 'Power Yoga & Structural Mobility Lead',
      certifications: 'RYT-500, Functional Mobility Spec',
      experience: '7+ Years Exp',
      specialty: 'Athletic Vinyasa flow, deep hip mobility, core stabilization, and injury prevention.',
      badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
    },
  ];

  const gymHighlights = [
    {
      icon: Dumbbell,
      title: 'Olympic Grade Equipment',
      desc: 'Eleiko plates, custom steel power cages, and competition barbells engineered for maximal output.',
    },
    {
      icon: Clock,
      title: '24/7 Keycard Freedom',
      desc: 'Train on your terms, any time of day or night with biometric entry and secure lockers.',
    },
    {
      icon: Users,
      title: 'Small Cohort Coaching',
      desc: 'Capped class capacities ensure direct technical feedback from head trainers on every lift.',
    },
    {
      icon: HeartPulse,
      title: 'Active Recovery Lounge',
      desc: 'Infrared Finnish saunas, cold plunge tubs, and compression therapy boots for faster turnaround.',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 md:pb-28">
        {/* Glow ambient background accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-orange-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Top Banner Tag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900 border border-slate-700/80 text-orange-400 text-xs md:text-sm font-black uppercase tracking-widest shadow-xl mb-6">
            <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
            <span>New Season Memberships Now Open</span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-300 font-semibold">
              Save 20% on Annual Tiers
            </span>
          </div>

          {/* High Impact Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight max-w-5xl mx-auto leading-none mb-6">
            TRANSFORM YOUR BODY.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
              DOMINATE YOUR GOALS.
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Welcome to <span className="text-white font-bold">IronPulse Fitness</span>. High-energy group training, Olympic lifting platforms, and science-backed nutritional coaching built to unlock peak human performance.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
            <a
              href="#plans"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider text-slate-950 bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-400 hover:to-amber-300 shadow-xl shadow-orange-500/25 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              <span>Explore Plans</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/classes"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-orange-500/40 transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-orange-400" />
              <span>Book Class Slots</span>
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-800/80">
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80">
              <p className="text-3xl sm:text-4xl font-black text-white font-mono">24/7</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">Gym Access</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80">
              <p className="text-3xl sm:text-4xl font-black text-orange-400 font-mono">11+</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">Weekly Classes</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80">
              <p className="text-3xl sm:text-4xl font-black text-white font-mono">100%</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">Certified Coaches</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80">
              <p className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">4.9★</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">Member Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC PRICING SECTION */}
      <section id="plans" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Membership Packages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Flexible Tiers Built For Every Athlete
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            Transparent pricing with zero lock-in contracts. Switch between monthly flexibility or unlock a 20% annual discount.
          </p>

          {/* Monthly / Annual Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                !isAnnual
                  ? 'bg-orange-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                isAnnual
                  ? 'bg-orange-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                isAnnual ? 'bg-slate-950 text-orange-400' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plansData.map((plan) => (
            <PlanCard key={plan.id} plan={plan} isAnnual={isAnnual} />
          ))}
        </div>
      </section>

      {/* 3. INTERACTIVE BMI & CALORIE CALCULATOR SECTION */}
      <section id="calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <BMICalculator />
      </section>

      {/* 4. WHY TRAIN WITH US / GYM HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5 text-orange-400" />
            <span>The IronPulse Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Engineered For Serious Results
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            No crowded waiting lines, no broken machines, no gimmicks. Just hardcore athletic atmosphere.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gymHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. CERTIFIED TRAINERS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Expert Coaching Staff</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Meet Your Master Coaches
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              World-class athletes and credentialed performance specialists committed to dialing in your technique and pushing your ceiling.
            </p>
          </div>
          <Link
            to="/classes"
            className="inline-flex items-center gap-2 text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors"
          >
            <span>View Coach Class Schedules</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((coach, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between hover:border-orange-500/40 transition-all group"
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center text-white font-black text-2xl mb-4 border border-slate-700 group-hover:border-orange-500/50 transition-colors">
                  {coach.name.charAt(0)}
                </div>
                <h4 className="text-lg font-black text-white group-hover:text-orange-400 transition-colors">
                  {coach.name}
                </h4>
                <p className="text-xs font-semibold text-slate-300 mb-2 mt-0.5">{coach.role}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${coach.badgeColor}`}>
                    {coach.certifications}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-700 bg-slate-800 text-slate-300">
                    {coach.experience}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {coach.specialty}
                </p>
              </div>

              <Link
                to="/classes"
                className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Book With {coach.name.split(' ')[0]}</span>
                <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BOTTOM MEMBERSHIP INVITATION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-slate-950 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-slate-950 text-orange-400 inline-block mb-4">
              Begin Today
            </span>
            <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-950 leading-tight">
              Ready To Build The Strongest Version Of Yourself?
            </h3>
            <p className="text-slate-900/90 text-sm sm:text-base mt-2 font-medium">
              Join the IronPulse family today. Select your plan or register your details with instant client-side booking confirmation.
            </p>
          </div>
          <Link
            to="/join/pro-athlete"
            className="shrink-0 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider bg-slate-950 hover:bg-slate-900 text-white shadow-xl hover:scale-105 transition-all flex items-center gap-2"
          >
            <span>Claim Your Spot</span>
            <ArrowRight className="w-4 h-4 text-orange-400" />
          </Link>
        </div>
      </section>
    </div>
  );
}
// ?hs