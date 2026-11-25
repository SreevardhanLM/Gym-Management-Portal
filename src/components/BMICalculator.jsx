import React, { useState, useId } from 'react';
import { calculateBMI, getBMICategory, calculateDailyCalories } from '../utils/calculations';
import { Flame, Activity, Target, Sparkles, Scale, Info } from 'lucide-react';

export default function BMICalculator() {
  const heightInputId = useId();
  const weightInputId = useId();
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(72);
  const [goal, setGoal] = useState('muscle-gain');

  const bmi = calculateBMI(Number(height), Number(weight));
  const category = getBMICategory(bmi);
  const nutrition = calculateDailyCalories(Number(height), Number(weight), goal);

  const goals = [
    { id: 'fat-loss', label: 'Fat Loss', desc: 'Caloric Deficit' },
    { id: 'maintenance', label: 'Maintain', desc: 'Energy Balance' },
    { id: 'muscle-gain', label: 'Muscle Gain', desc: 'Hypertrophy Surplus' },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>Biometric Fitness Estimator</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-wide">
            BMI & Daily Calorie Calculator
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Input your body metrics to generate instant metabolic baselines and nutrition recommendations.
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          <Info className="w-4 h-4 text-orange-400" />
          <span>Calculated live using Mifflin-St Jeor formulas</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Height and Weight Sliders / Number inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Height */}
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={heightInputId} className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Height (cm)
                </label>
                <span className="text-2xl font-black text-orange-400 font-mono">
                  {height} <span className="text-xs text-slate-500 font-normal">cm</span>
                </span>
              </div>
              <input
                id={heightInputId}
                type="range"
                min="130"
                max="220"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
                <span>130 cm</span>
                <span>175 cm</span>
                <span>220 cm</span>
              </div>
            </div>

            {/* Weight */}
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={weightInputId} className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Weight (kg)
                </label>
                <span className="text-2xl font-black text-orange-400 font-mono">
                  {weight} <span className="text-xs text-slate-500 font-normal">kg</span>
                </span>
              </div>
              <input
                id={weightInputId}
                type="range"
                min="40"
                max="160"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
                <span>40 kg</span>
                <span>80 kg</span>
                <span>160 kg</span>
              </div>
            </div>
          </div>

          {/* Fitness Goal Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Target Fitness Goal
            </label>
            <div className="grid grid-cols-3 gap-3">
              {goals.map((item) => {
                const isSelected = goal === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setGoal(item.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-orange-500 bg-orange-500/10 text-white shadow-lg shadow-orange-500/10'
                        : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <p className={`text-sm font-black ${isSelected ? 'text-orange-400' : 'text-slate-300'}`}>
                      {item.label}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Output Dashboard (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4 p-6 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800/80">
          {/* Live BMI Score */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-orange-400" />
                Live BMI Score
              </span>
              <span className={`text-xs font-extrabold uppercase px-3 py-1 rounded-full border ${category.bg} ${category.color}`}>
                {category.label}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-6xl font-black text-white tracking-tight font-mono">
                {bmi || '--'}
              </span>
              <span className="text-sm font-semibold text-slate-400">kg/m²</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {category.advice}
            </p>

            {/* Visual spectrum bar */}
            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden flex">
              <div className="w-[18.5%] bg-sky-500" title="Underweight (<18.5)"></div>
              <div className="w-[25%] bg-emerald-500" title="Healthy (18.5-24.9)"></div>
              <div className="w-[20%] bg-amber-500" title="Overweight (25-29.9)"></div>
              <div className="flex-1 bg-rose-500" title="Obese (30+)"></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
              <span>Under</span>
              <span>Healthy</span>
              <span>Over</span>
              <span>Obese</span>
            </div>
          </div>

          {/* Calorie & Protein Targets */}
          <div className="pt-5 border-t border-slate-800 space-y-3">
            <div className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-orange-400">Daily Energy Intake</p>
                  <p className="text-[11px] text-slate-400">{nutrition?.goalLabel}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-white font-mono">
                  {nutrition ? nutrition.targetCalories.toLocaleString() : '--'}
                </span>
                <span className="text-xs font-semibold text-slate-400 ml-1">kcal</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-800 text-amber-400">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-slate-300">Target Daily Protein</p>
                  <p className="text-[11px] text-slate-500">2.0g per kg bodyweight</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-white font-mono">
                  {nutrition ? nutrition.proteinGrams : '--'}
                </span>
                <span className="text-xs font-semibold text-slate-400 ml-1">g/day</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
