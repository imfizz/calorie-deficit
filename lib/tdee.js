export const calculateTDEE = (weight, height, age, gender, activityLevel) => {
  let bmr = gender === "male"
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;

  const activityMultipliers = {
    sedentary: 1.2,
    moderate: 1.55,
    active: 1.725,
  };

  return bmr * (activityMultipliers[activityLevel] || 1.2);
};

export const macroTargets = (tdee, goal) => {
  let multiplier = goal === "fat loss" ? 0.65 : goal === "muscle gain" ? 1.1 : 1.0;
  let calories = tdee * multiplier;

  let protein = (calories * 0.3) / 4;
  let carbs = (calories * 0.4) / 4;
  let fats = (calories * 0.3) / 9;

  return { calories, protein, carbs, fats };
};