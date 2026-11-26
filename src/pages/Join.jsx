import { useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import plansData from '../data/plans.json';
import { useBooking } from '../context/BookingContext';
import {
  ShieldCheck,
  Check,
  User,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function Join() {
  const { planId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { completeRegistration } = useBooking();

  // Find plan by ID, fallback to 'pro-athlete'
  const activePlanId = planId || 'pro-athlete';
  const selectedPlan = plansData.find((p) => p.id === activePlanId) || plansData[1];

  // Billing cycle: read from location.state if passed from Home, else default to monthly
  const [billingCycle, setBillingCycle] = useState(
    location.state?.billingCycle === 'annual' ? 'annual' : 'monthly'
  );

  // Optional Add-on state
  const [includePersonalTrainer, setIncludePersonalTrainer] = useState(false);
  const ptMonthlyRate = 1999;
  const ptAnnualRate = 1599; // 20% off
  const activePtRate = billingCycle === 'annual' ? ptAnnualRate : ptMonthlyRate;

  // Form inputs
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    startDate: new Date().toISOString().split('T')[0],
    fitnessLevel: 'intermediate',
    primaryGoal: 'Muscle Hypertrophy & Strength',
    paymentMethod: 'card',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Base plan price
  const basePrice = billingCycle === 'annual' ? selectedPlan.annualPrice : selectedPlan.monthlyPrice;
  const totalPricePerMonth = basePrice + (includePersonalTrainer ? activePtRate : 0);
  const totalBilledToday = billingCycle === 'annual' ? totalPricePerMonth * 12 : totalPricePerMonth;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handlePlanSwitch = (newId) => {
    navigate(`/join/${newId}`, {
      state: { billingCycle },
      replace: true,
    });
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid email address is required';
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      errs.phone = 'Valid phone number is required';
    }
    if (!formData.startDate) {
      errs.startDate = 'Please select your membership start date';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const registrationRecord = {
      orderId: 'IP-' + Math.floor(100000 + Math.random() * 900000),
      timestamp: new Date().toISOString(),
      member: { ...formData },
      plan: {
        id: selectedPlan.id,
        name: selectedPlan.name,
        billingCycle,
        basePrice,
        includePersonalTrainer,
        ptRate: includePersonalTrainer ? activePtRate : 0,
        totalBilledToday,
        currency: 'INR',
      },
    };

    // Save to context & localStorage
    completeRegistration(registrationRecord);

    setTimeout(() => {
      navigate('/confirmation', { state: { registration: registrationRecord } });
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10 relative z-10">
      {/* Back to Home Link */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Plans Overview</span>
        </Link>
      </div>

      {/* Page Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Step 2 of 2: Member Enrollment</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
          Complete Your Membership
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
          Review your selected plan, customize optional training add-ons, and activate your club access.
        </p>
      </div>

      {/* Main Grid: Form (7 cols) + Order Summary (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Registration Form */}
        <div className="lg:col-span-7 bg-zinc-950/90 border border-zinc-800 rounded-[2.5rem] p-6 md:p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Plan Selector Switcher */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Selected Membership Tier
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {plansData.map((p) => {
                  const isActive = p.id === selectedPlan.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handlePlanSwitch(p.id)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        isActive
                          ? 'border-green-500 bg-green-500/15 text-white shadow-md shadow-green-500/20'
                          : 'border-zinc-800 bg-black text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                      }`}
                    >
                      <p className={`text-xs sm:text-sm font-black ${isActive ? 'text-green-400' : 'text-zinc-300'}`}>
                        {p.name}
                      </p>
                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        Rs. {(billingCycle === 'annual' ? p.annualPrice : p.monthlyPrice).toLocaleString('en-IN')}/mo
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Billing Cycle Switcher */}
            <div className="p-4 rounded-2xl bg-black border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Billing Cycle
                </span>
                <p className="text-xs text-zinc-500">Annual billing saves 20% on all plans</p>
              </div>
              <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-zinc-900 border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    billingCycle === 'monthly'
                      ? 'bg-green-500 text-black shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    billingCycle === 'annual'
                      ? 'bg-green-500 text-black shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>Annual</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-black ${
                    billingCycle === 'annual' ? 'bg-black text-green-400' : 'bg-green-500/20 text-green-400'
                  }`}>
                    -20%
                  </span>
                </button>
              </div>
            </div>

            {/* 3. Personal Training Add-on */}
            <div
              onClick={() => setIncludePersonalTrainer(!includePersonalTrainer)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                includePersonalTrainer
                  ? 'bg-green-500/10 border-green-500/50 shadow-md shadow-green-500/10'
                  : 'bg-black border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="pt-0.5">
                <input
                  type="checkbox"
                  checked={includePersonalTrainer}
                  onChange={() => {}} // handled by parent div
                  className="w-4 h-4 accent-green-500 rounded cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-green-400" />
                    Dedicated 1-on-1 Personal Coaching Add-on
                  </span>
                  <span className="text-xs font-black text-green-400 font-mono">
                    +Rs. {activePtRate.toLocaleString('en-IN')}/mo
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Includes 2 bi-weekly private coaching sessions, customized progressive overload programming, and weekly nutritional check-ins.
                </p>
              </div>
            </div>

            {/* 4. Member Contact Information */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-green-400" />
                <span>Member Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Alex Morgan"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-black border text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.fullName ? 'border-rose-500' : 'border-zinc-800'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="alex@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-black border text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.email ? 'border-rose-500' : 'border-zinc-800'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-black border text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.phone ? 'border-rose-500' : 'border-zinc-800'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Preferred Start Date */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Membership Start Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-black border text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.startDate ? 'border-rose-500' : 'border-zinc-800'
                    }`}
                  />
                  {errors.startDate && (
                    <p className="text-[11px] text-rose-400 mt-1">{errors.startDate}</p>
                  )}
                </div>
              </div>

              {/* Fitness Experience & Goals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Training Experience Level
                  </label>
                  <select
                    name="fitnessLevel"
                    value={formData.fitnessLevel}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="beginner">Beginner (0 - 6 months)</option>
                    <option value="intermediate">Intermediate (1 - 3 years)</option>
                    <option value="advanced">Advanced Athlete (3+ years)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Primary Fitness Objective
                  </label>
                  <select
                    name="primaryGoal"
                    value={formData.primaryGoal}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Hypertrophy & Strength">Hypertrophy & Strength</option>
                    <option value="Fat Loss & Conditioning">Fat Loss & Conditioning</option>
                    <option value="Olympic Weightlifting">Olympic Weightlifting</option>
                    <option value="Mobility & Functional Health">Mobility & Functional Health</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Simulated Payment Mode
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'card', label: 'Credit Card / Debit' },
                  { id: 'upi', label: 'UPI / Google Pay' },
                  { id: 'desk', label: 'Pay at Front Desk' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: item.id }))}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                      formData.paymentMethod === item.id
                        ? 'bg-zinc-900 border-green-500 text-white'
                        : 'bg-black border-zinc-800 text-zinc-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 mt-2">
                <Lock className="w-3.5 h-3.5 text-green-400 shrink-0" />
                <span>Simulation environment: No real credit card charge occurs. All records saved locally.</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full font-black text-xs uppercase tracking-widest bg-green-500 hover:bg-green-400 text-black shadow-xl shadow-green-500/25 transition-all hover:scale-[1.01] active:scale-100 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Activating Membership...</span>
              ) : (
                <>
                  <span>Confirm & Activate Membership</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-zinc-950/90 border border-zinc-800 rounded-[2.5rem] p-6 md:p-8 shadow-2xl">
            <h3 className="text-lg font-black text-white uppercase tracking-wider mb-4 pb-3 border-b border-zinc-800">
              Membership Summary
            </h3>

            {/* Tier banner */}
            <div className="p-4 rounded-2xl bg-black border border-zinc-800 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">
                    Selected Tier
                  </span>
                  <h4 className="text-xl font-black text-white uppercase">{selectedPlan.name}</h4>
                </div>
                <span className="text-xs font-bold uppercase px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
                  {billingCycle}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">{selectedPlan.tagline}</p>
            </div>

            {/* Feature checklist */}
            <div className="space-y-2.5 mb-6 text-xs text-zinc-300">
              <p className="font-bold uppercase tracking-wider text-zinc-400 text-[11px]">
                Tier Benefits Included:
              </p>
              {selectedPlan.features.slice(0, 4).map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 pt-4 border-t border-zinc-800 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Base Plan ({billingCycle})</span>
                <span className="text-white font-mono font-semibold">Rs. {basePrice.toLocaleString('en-IN')}/mo</span>
              </div>

              {includePersonalTrainer && (
                <div className="flex justify-between text-green-400">
                  <span>1-on-1 Coaching Add-on</span>
                  <span className="font-mono font-semibold">+Rs. {activePtRate.toLocaleString('en-IN')}/mo</span>
                </div>
              )}

              {billingCycle === 'annual' && (
                <div className="flex justify-between text-green-400 text-xs">
                  <span>Annual Subscription Discount</span>
                  <span className="font-semibold">20% Applied</span>
                </div>
              )}

              <div className="pt-4 border-t border-zinc-800 flex items-baseline justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Total Billed Today
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    {billingCycle === 'annual' ? 'Full 12-month access' : 'First month subscription'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-white font-mono">
                    Rs. {totalBilledToday.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-zinc-400 block">INR</span>
                </div>
              </div>
            </div>
          </div>

          {/* Guarantee / Perks badge */}
          <div className="p-5 rounded-2xl bg-black border border-zinc-800 text-xs text-zinc-400 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>14-Day Money Back Guarantee</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              If you aren't completely satisfied with our facilities or coaching staff within your first 14 days, get a 100% refund without hassle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
