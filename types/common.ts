export enum NutritionalCharacteristic {
  Fiber = 'fiber',
  Carbohydrates = 'carbohydrates',
  Proteins = 'proteins',
  Fats = 'fats',
}

export enum MealTime {
  Breakfast = 'breakfast',
  Lunch = 'lunch',
  Dinner = 'dinner',
}

export type ProductType = {
  id: string;
  name: string;
  mealTimes: string[];
  preferredMealTimes: string[];
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  fiber: number;
  sugars: number;
  sodium: number;
  cholesterol: number;
  glycemicIndex: number;
  image: string;
  description: string;
  unit: string;
  unitValue: number;
  type: string;
  mainCharacteristic: NutritionalCharacteristic[];
  allergens: string[];
  storage: string;
  category: string;
  isVegan: boolean;
  isVegetarian: boolean;
  isOrganic: boolean;
  portionSize: number;
  portionLabel: string;
  shelfLife: {
    room: number;
    fridge: number;
    frozen: number;
  };
  vitamins: NutrientType[];
  minerals: NutrientType[];
  countryOfOrigin: string;
  certifications: string[];
  tasteProfile: string[];
  suitableDiets: string[];
  cookingMethods: string[];
  seasonality: string[];
};

export type NutrientType = {
  name: string;
  value: number;
};

export type MainNavLink = {
  text: string;
  url: string;
};

export type NutritionField =
  | 'calories'
  | 'proteins'
  | 'fats'
  | 'carbohydrates'
  | 'portionSize';
