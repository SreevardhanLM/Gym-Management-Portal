import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { animate, stagger } from 'animejs';
import plansData from '../data/plans.json';
import PlanCard from '../components/PlanCard';
import BMICalculator from '../components/BMICalculator';
import {
  Dumbbell,
  ShieldCheck,
  Award,
  Zap,
  ArrowRight,
  Users,
  Clock,
  HeartPulse,
} from 'lucide-react';

function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function Home() {
  const [isAnnual, setIsAnnual] = useState(false);
  const headlineRef = useRef(null);
  const athleteCardRef = useRef(null);
  const socialRef = useRef(null);

  // Anime.js initial hero entrance animation
  useEffect(() => {
    if (headlineRef.current) {
      animate(headlineRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        ease: 'outExpo',
      });
    }
    if (athleteCardRef.current) {
      animate(athleteCardRef.current, {
        scale: [0.93, 1],
        opacity: [0, 1],
        duration: 900,
        ease: 'outExpo',
      });
    }
    if (socialRef.current) {
      animate(socialRef.current.children, {
        opacity: [0, 1],
        translateX: [-20, 0],
        delay: stagger(120),
        duration: 700,
        ease: 'outBack',
      });
    }
  }, []);

  // Certified coaches with authentic Malayali names
  const trainers = [
    {
      name: 'Arjun Menon',
      role: 'Head HIIT & Metabolic Conditioning Coach',
      certifications: 'CSCS, ACE Master Trainer',
      experience: '9+ Years Exp',
      specialty: 'High-energy cardiovascular intervals, functional stamina, and athletic agility.',
      badgeColor: 'border-green-500/30 text-green-400 bg-green-500/10',
    },
    {
      name: 'Anjali Nair',
      role: 'Elite Strength & Barbell Specialist',
      certifications: 'USAW Level 2, NSCA-CPT',
      experience: '11+ Years Exp',
      specialty: 'Olympic weightlifting, compound deadlift mechanics, and hypertrophy volume cycling.',
      badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    },
    {
      name: 'Rahul Varma',
      role: 'CrossFit & Functional Athletic Director',
      certifications: 'CrossFit Level 3 (CCFT)',
      experience: '8+ Years Exp',
      specialty: 'Gymnastic stamina, kettlebell mechanics, team WOD programming, and endurance.',
      badgeColor: 'border-lime-500/30 text-lime-400 bg-lime-500/10',
    },
    {
      name: 'Devika Nambiar',
      role: 'Power Yoga & Structural Mobility Lead',
      certifications: 'RYT-500, Functional Mobility Spec',
      experience: '7+ Years Exp',
      specialty: 'Athletic Vinyasa flow, deep hip mobility, core stabilization, and injury prevention.',
      badgeColor: 'border-green-500/30 text-green-400 bg-green-500/10',
    },
  ];

  const gymHighlights = [
    {
      icon: Dumbbell,
      title: 'Olympic Grade Equipment',
      desc: 'Competition Eleiko plates, custom steel power cages, and calibrated barbells engineered for maximal output.',
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
    <div className="space-y-28 pb-24 overflow-hidden relative">
      {/* Outer ambient green aura matching reference perimeter */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-green-500/15 rounded-full blur-[140px] animate-pulse-aura" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px] animate-pulse-aura" />
        <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[180px] animate-pulse-aura" />
      </div>

      {/* 1. HERO SECTION - Coded to match reference design with smooth animations */}
      <section className="relative z-10 pt-4 md:pt-8 pb-4 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[2.5rem] bg-gradient-to-b from-zinc-950 via-black to-zinc-950 border border-green-500/20 shadow-[0_0_80px_-20px_rgba(34,197,94,0.25)] overflow-hidden p-6 sm:p-10 lg:p-14">
            
            {/* Ambient inner green edge glows */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-green-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse-aura" />
            <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-emerald-500/15 rounded-full blur-[130px] pointer-events-none animate-pulse-aura" />

            {/* Top Center: Clean Giant Headline */}
            <div className="text-center mb-8 relative z-10">
              <h1
                ref={headlineRef}
                className="text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tight leading-[1.05] max-w-4xl mx-auto drop-shadow-md"
              >
                Reach Your Best <br className="hidden sm:inline" />
                Shape For Life
              </h1>
            </div>

            {/* Central Stage: High Quality Gym Athlete Photo with Smooth Breathing Float */}
            <div ref={athleteCardRef} className="relative z-10 flex justify-center items-center my-4 animate-float">
              <div className="relative w-full max-w-[420px] sm:max-w-[480px] h-[320px] sm:h-[400px] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900&auto=format&fit=crop&q=85"
                  alt="Elite Fitness Coach"
                  className="w-full h-full object-cover object-top filter brightness-95 contrast-105 transition-transform duration-700 hover:scale-105"
                />
                {/* Vignette gradients to blend into the dark canvas */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-green-500/30 text-green-400 text-[11px] font-bold tracking-widest uppercase shadow-lg shadow-green-500/10">
                  Elite Strength & Transformation
                </div>
              </div>
            </div>

            {/* Bottom Row: Left Social Rail & Clients Proof | Right Supporting text & Neon Green Button */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end relative z-20 pt-6 border-t border-zinc-900">
              
              {/* Left Column: Social Icons */}
              <div className="md:col-span-6 flex items-center">
                <div ref={socialRef} className="flex items-center gap-4 text-zinc-400">
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full hover:text-green-400 hover:bg-zinc-900 transition-all duration-300 hover:scale-125"
                    aria-label="YouTube"
                  >
                    <YoutubeIcon />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full hover:text-green-400 hover:bg-zinc-900 transition-all duration-300 hover:scale-125"
                    aria-label="Facebook"
                  >
                    <FacebookIcon />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full hover:text-green-400 hover:bg-zinc-900 transition-all duration-300 hover:scale-125"
                    aria-label="Instagram"
                  >
                    <InstagramIcon />
                  </a>
                </div>
              </div>

              {/* Right Column (6 cols): Tagline & Vibrant Neon Green "BOOK A CLASS" Button */}
              <div className="md:col-span-6 flex flex-col md:items-end text-left md:text-right space-y-5">
                <p className="text-sm sm:text-base text-zinc-300 max-w-md leading-relaxed font-normal">
                  Get stronger, leaner, and more energized with custom fitness and nutrition coaching that fits your lifestyle.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#plans"
                    className="px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-all"
                  >
                    View Memberships
                  </a>
                  <Link
                    to="/classes"
                    className="px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest bg-green-500 hover:bg-green-400 text-black shadow-[0_0_30px_rgba(34,197,94,0.45)] hover:shadow-[0_0_40px_rgba(34,197,94,0.7)] hover:scale-105 active:scale-100 transition-all inline-flex items-center gap-2"
                  >
                    <span>BOOK A CLASS</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. DYNAMIC PRICING SECTION */}
      <section id="plans" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Membership Packages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Flexible Tiers Built For Every Athlete
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 leading-relaxed">
            Transparent pricing in Indian Rupees (Rs.) with zero lock-in contracts. Switch between monthly flexibility or unlock a 20% annual discount.
          </p>

          {/* Monthly / Annual Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full bg-zinc-950 border border-zinc-800 shadow-inner">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                !isAnnual
                  ? 'bg-green-500 text-black shadow-md shadow-green-500/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                isAnnual
                  ? 'bg-green-500 text-black shadow-md shadow-green-500/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                isAnnual ? 'bg-black text-green-400' : 'bg-green-500/20 text-green-400 border border-green-500/30'
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

      {/* 3. INTERACTIVE BMI & CALORIE CALCULATOR */}
      <section id="calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28 relative z-10">
        <BMICalculator />
      </section>

      {/* 4. WHY TRAIN WITH US / GYM HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5 text-green-400" />
            <span>The FitnessCh Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Engineered For Serious Results
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            No crowded lines, no broken machines, no excuses. Just pure high-energy athletic performance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gymHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 hover:border-green-500/40 smooth-card group"
              >
                <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. CERTIFIED COACHES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Certified Coaching Staff</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Meet Your Master Coaches
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              World-class athletes and credentialed performance specialists committed to dialing in your technique and pushing your ceiling.
            </p>
          </div>
          <Link
            to="/classes"
            className="inline-flex items-center gap-2 text-sm font-bold text-green-400 hover:text-green-300 transition-colors"
          >
            <span>View Coach Class Schedules</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((coach, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-zinc-950/90 border border-zinc-800 p-6 flex flex-col justify-between hover:border-green-500/50 smooth-card group shadow-xl"
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-zinc-900 to-zinc-800 flex items-center justify-center text-white font-black text-2xl mb-4 border border-zinc-700 group-hover:border-green-500/50 group-hover:text-green-400 transition-colors">
                  {coach.name.charAt(0)}
                </div>
                <h4 className="text-lg font-black text-white group-hover:text-green-400 transition-colors">
                  {coach.name}
                </h4>
                <p className="text-xs font-semibold text-zinc-300 mb-2 mt-0.5">{coach.role}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${coach.badgeColor}`}>
                    {coach.certifications}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300">
                    {coach.experience}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  {coach.specialty}
                </p>
              </div>

              <Link
                to="/classes"
                className="w-full py-2.5 px-3 rounded-full bg-black border border-zinc-800 hover:border-green-500 text-xs font-bold text-zinc-300 hover:text-green-400 flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Book With {coach.name.split(' ')[0]}</span>
                <ArrowRight className="w-3.5 h-3.5 text-green-400" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BOTTOM BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-[2.5rem] p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-zinc-950 via-black to-zinc-950 border border-green-500/30 text-white shadow-[0_0_60px_-15px_rgba(34,197,94,0.3)] flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 inline-block mb-4">
              Begin Today
            </span>
            <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
              Ready To Build The Strongest Version Of Yourself?
            </h3>
            <p className="text-zinc-400 text-sm sm:text-base mt-2">
              Join the FitnessCh community today. Select your plan or register your details with instant client-side booking confirmation.
            </p>
          </div>
          <Link
            to="/classes"
            className="shrink-0 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest bg-green-500 hover:bg-green-400 text-black shadow-lg shadow-green-500/30 hover:scale-105 transition-all flex items-center gap-2"
          >
            <span>BOOK A CLASS NOW</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </Link>
        </div>
      </section>
    </div>
  );
}
