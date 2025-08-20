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
  vitamins: Nutrient[];
  minerals: Nutrient[];
  countryOfOrigin: string;
  certifications: string[];
  tasteProfile: string[];
  suitableDiets: string[];
  cookingMethods: string[];
  seasonality: string[];
};

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'drink';

export type Nutrient = {
  name: string;
  value: number;
};
