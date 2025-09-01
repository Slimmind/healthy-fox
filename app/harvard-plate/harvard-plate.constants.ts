import { MealTime } from '@/types/common';

export const MealTimesTitle = {
  [MealTime.Breakfast]: 'Завтрак',
  [MealTime.Lunch]: 'Обед',
  [MealTime.Dinner]: 'Ужин',
};

export const initialMealSummary = {
  calories: 0,
  proteins: 0,
  fats: 0,
  carbohydrates: 0,
};

export const USER_DATA_MOCK = {
  calories: 2000,
  proteins: 240,
  fats: 180,
  carbohydrates: 100,
};
