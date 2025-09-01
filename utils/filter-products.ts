import meals from '@/meals.json';
import { type MealTime, type Product } from '@/types/common';

export const filterProductsByMealTime = (mealTime: MealTime): Product[] => {
  return meals.filter((meal) => meal.mealTimes.includes(mealTime)) as Product[];
};
