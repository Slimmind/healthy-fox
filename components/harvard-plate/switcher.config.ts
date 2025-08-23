import { ProductType } from '@/types/common';
import { filterProductsByMealTime } from '@/utils/filter-products';

export const createSwitcherConfig = (
  products: ProductType[],
  setProductList: (products: ProductType[]) => void,
  setMealTime: (mealTime: string) => void
) => ({
  switcherItems: [
    {
      value: 'breakfast',
      text: 'Завтрак',
      switchHandler: () =>
        filterProductsByMealTime('breakfast', setProductList, setMealTime),
    },
    {
      value: 'lunch',
      text: 'Обед',
      switchHandler: () =>
        filterProductsByMealTime('lunch', setProductList, setMealTime),
    },
    {
      value: 'dinner',
      text: 'Ужин',
      switchHandler: () =>
        filterProductsByMealTime('dinner', setProductList, setMealTime),
    },
  ],
});
