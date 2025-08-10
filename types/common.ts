export type ProductType = {
  id: string;
  name: string;
  mealTimes: string[];
  preferredMealTimes: string[];
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  image: string;
  description: string;
  unit: string;
  type: string;
  allergens: string[];
  storage: string;
  category: string;
};

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'drink';
