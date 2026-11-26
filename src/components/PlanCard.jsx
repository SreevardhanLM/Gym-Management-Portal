import { useNavigate } from 'react-router-dom';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

export default function PlanCard({ plan, isAnnual }) {
  const navigate = useNavigate();

  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
  const billedInfo = isAnnual ? 'billed annually ($' + (price * 12) + '/yr)' : 'billed monthly';

  const handleSelectPlan = () => {
    navigate(`/join/${plan.id}`, {
      state: {
        billingCycle: isAnnual ? 'annual' : 'monthly',
        planPrice: price,
        planName: plan.name,
      },
    });
  };

  return (
    <div
      className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
        plan.popular
          ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-orange-500 shadow-2xl shadow-orange-500/20 scale-100 lg:-translate-y-2'
          : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700 shadow-xl'
      }`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
          <span>Most Popular</span>
        </div>
      )}

      <div>
        {/* Tier Header */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-black text-white uppercase tracking-wider">
            {plan.name}
          </h3>
          {isAnnual && (
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          )}
        </div>
        <p className="text-sm text-slate-400 mb-6 min-h-[40px] leading-relaxed">
          {plan.tagline}
        </p>

        {/* Pricing Display */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-semibold text-slate-400">$</span>
            <span className="text-5xl font-black text-white tracking-tight">
              {price}
            </span>
            <span className="text-slate-400 font-medium text-sm">/ month</span>
          </div>
          <p className="text-xs text-slate-500 mt-1 capitalize">{billedInfo}</p>
        </div>

        {/* Feature List */}
        <div className="space-y-3.5 mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            What's Included:
          </p>
          {plan.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div
                className={`mt-0.5 rounded-full p-1 shrink-0 ${
                  plan.popular
                    ? 'bg-orange-500/20 text-orange-400'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-sm text-slate-300 leading-snug">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={handleSelectPlan}
        className={`w-full py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
          plan.popular
            ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 shadow-lg shadow-orange-500/30 hover:scale-[1.02]'
            : 'bg-slate-800 hover:bg-slate-700 text-white hover:text-orange-400 border border-slate-700 hover:border-orange-500/50'
        }`}
      >
        <span>Select Plan</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
