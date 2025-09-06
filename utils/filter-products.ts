import meals from '@/meals.json';
import { type MealTime, type Product } from '@/types/common';

export const filterProductsByMealTime = (
  mealTime: MealTime,
  updateProducts: (products: Product[]) => void
): void => {
  const filteredMeals = meals.filter((meal) =>
    meal.mealTimes.includes(mealTime)
  ) as Product[];
  updateProducts(filteredMeals);
};
