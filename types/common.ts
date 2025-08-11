export type ProductType = {
  id: string;
  name: string;
  mealTimes: Array<'breakfast' | 'lunch' | 'dinner' | 'snack'>;
  preferredMealTimes: Array<
    'when_ill' | 'morning' | 'afternoon' | 'evening' | 'night'
  >;
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

export type MainNavLink = {
  text: string;
  url: string;
};
