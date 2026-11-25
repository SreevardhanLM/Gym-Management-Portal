/**
 * Calculate BMI based on height (cm) and weight (kg)
 */
export function calculateBMI(heightCm, weightKg) {
  if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
    return null;
  }
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  return parseFloat(bmi.toFixed(1));
}

/**
 * Return category label, color code, and badge classes for a given BMI
 */
export function getBMICategory(bmi) {
  if (!bmi) return { label: 'Unknown', color: 'text-slate-400', bg: 'bg-slate-800' };

  if (bmi < 18.5) {
    return {
      label: 'Underweight',
      color: 'text-sky-400',
      bg: 'bg-sky-500/20 border-sky-500/30',
      advice: 'Focus on caloric surplus and strength training for mass.'
    };
  } else if (bmi >= 18.5 && bmi < 25) {
    return {
      label: 'Healthy Weight',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/20 border-emerald-500/30',
      advice: 'Great baseline! Maintain consistency with balanced training.'
    };
  } else if (bmi >= 25 && bmi < 30) {
    return {
      label: 'Overweight',
      color: 'text-amber-400',
      bg: 'bg-amber-500/20 border-amber-500/30',
      advice: 'High-intensity interval training and modest caloric deficit recommended.'
    };
  } else {
    return {
      label: 'Obese',
      color: 'text-rose-400',
      bg: 'bg-rose-500/20 border-rose-500/30',
      advice: 'Cardio endurance, structural mobility, and guided nutritional coaching recommended.'
    };
  }
}

/**
 * Calculate recommended daily calorie intake based on weight (kg), height (cm), and fitness goal
 * Fitness goals: 'fat-loss', 'maintenance', 'muscle-gain'
 */
export function calculateDailyCalories(heightCm, weightKg, goal = 'maintenance', gender = 'neutral') {
  if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
    return null;
  }

  // Simplified Mifflin-St Jeor baseline calculation
  // Base BMR estimate ~ 10*weight + 6.25*height - 5*25 + (gender offset)
  const baseBMR = (10 * weightKg) + (6.25 * heightCm) - (5 * 28);
  const tdee = Math.round(baseBMR * 1.45); // Moderate activity multiplier for active gym members

  let targetCalories = tdee;
  let proteinGrams = Math.round(weightKg * 2.0); // 2g per kg

  if (goal === 'fat-loss') {
    targetCalories = Math.round(tdee - 450);
  } else if (goal === 'muscle-gain') {
    targetCalories = Math.round(tdee + 350);
  }

  return {
    tdee,
    targetCalories: Math.max(1200, targetCalories),
    proteinGrams,
    goalLabel: goal === 'fat-loss' ? 'Fat Loss Deficit' : goal === 'muscle-gain' ? 'Muscle Hypertrophy Surplus' : 'Maintenance Balance'
  };
}
