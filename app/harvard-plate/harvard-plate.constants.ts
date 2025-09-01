import { MealTime } from './harvard-plate.types';

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
