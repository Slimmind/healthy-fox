import products from '@/products.json';
import { type MealTime, type Product } from '@/types/common';

export const filterProductsByMealTime = (
  mealTime: MealTime,
  updateProducts: (products: Product[]) => void
): void => {
  const filteredProducts = products.filter((product) =>
    product.mealTimes.includes(mealTime)
  ) as Product[];
  updateProducts(filteredProducts);
};
