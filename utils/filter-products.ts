import { MealTimesTitle } from '@/constants/common';
import meals from '@/meals.json';
import { ProductType } from '@/types/common';

export const filterProductsByMealTime = (
  mealTime: 'breakfast' | 'lunch' | 'dinner',
  updateProducts: (products: ProductType[]) => void,
  updateMealTime: (mealTime: string) => void
): void => {
  const filteredMeals = meals.filter(
    (meal) =>
      meal.mealTimes.includes(mealTime) || meal.category.includes(mealTime)
  );
  updateProducts(filteredMeals);
  updateMealTime(MealTimesTitle[mealTime] || 'Продукты');
};
