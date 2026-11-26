import { useNavigate } from 'react-router-dom';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

export default function PlanCard({ plan, isAnnual }) {
  const navigate = useNavigate();

  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
  const billedInfo = isAnnual
    ? 'billed annually (Rs. ' + (price * 12).toLocaleString('en-IN') + '/yr)'
    : 'billed monthly';

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
      className={`relative rounded-[2rem] p-8 flex flex-col justify-between transition-all duration-300 ${
        plan.popular
          ? 'bg-gradient-to-b from-zinc-950 via-black to-zinc-950 border-2 border-green-500 shadow-[0_0_50px_-10px_rgba(34,197,94,0.3)] scale-100 lg:-translate-y-2'
          : 'bg-zinc-950/80 border border-zinc-800 hover:border-green-500/40 shadow-xl'
      }`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-black font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-green-500/30 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 fill-black" />
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
            <span className="text-[11px] font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-0.5 rounded-full">
              Save 20%
            </span>
          )}
        </div>
        <p className="text-sm text-zinc-400 mb-6 min-h-[40px] leading-relaxed">
          {plan.tagline}
        </p>

        {/* Pricing Display */}
        <div className="mb-6 p-4 rounded-2xl bg-black border border-zinc-800">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-green-400">Rs.</span>
            <span className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono">
              {price.toLocaleString('en-IN')}
            </span>
            <span className="text-zinc-400 font-medium text-sm">/ month</span>
          </div>
          <p className="text-xs text-zinc-500 mt-1 capitalize">{billedInfo}</p>
        </div>

        {/* Feature List */}
        <div className="space-y-3.5 mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            What's Included:
          </p>
          {plan.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div
                className={`mt-0.5 rounded-full p-1 shrink-0 ${
                  plan.popular
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-zinc-800 text-zinc-300'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-sm text-zinc-300 leading-snug">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={handleSelectPlan}
        className={`w-full py-4 px-6 rounded-full font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer ${
          plan.popular
            ? 'bg-green-500 hover:bg-green-400 text-black shadow-lg shadow-green-500/30 hover:scale-[1.02]'
            : 'bg-zinc-900 hover:bg-zinc-800 text-white hover:text-green-400 border border-zinc-700 hover:border-green-500/50'
        }`}
      >
        <span>Select Plan</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
