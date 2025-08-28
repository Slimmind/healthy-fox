import meals from '@/meals.json';
import { type MealTime, type ProductType } from '@/types/common';

export const filterProductsByMealTime = (
  mealTime: MealTime,
  updateProducts: (products: ProductType[]) => void
): void => {
  const filteredMeals = meals.filter((meal) =>
    meal.mealTimes.includes(mealTime)
  ) as ProductType[];
  updateProducts(filteredMeals);
};
