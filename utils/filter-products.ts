import { ProductType } from '@/types/common';

export const filterProducts = (
  mealTime: string,
  products: ProductType[],
  callBack: (products: ProductType[]) => void
): void => {
  const filteredMeals = products.filter(
    (meal) =>
      (meal.mealTimes.includes(mealTime) && meal.category === 'food') ||
      meal.category.includes(mealTime)
  );
  callBack(filteredMeals);
};
