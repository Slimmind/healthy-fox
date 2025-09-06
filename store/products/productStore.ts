import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import {
  type MealTime,
  type NutritionalCharacteristic,
  type Product,
} from '@/app/harvard-plate/harvard-plate.types';
import meals from '@/meals.json';

interface ProductStoreState {
  productsList: Product[];
  currentProduct: Product | null;
  chosenProducts: Product[];
}

interface ProductStoreActions {
  setProductsList: (products: Product[]) => void;
  setCurrentProduct: (product: Product | null) => void;
  setChosenProducts: (products: Product[]) => void;
  addChosenProduct: (product: Product) => void;
  removeChosenProduct: (productId: string) => void;
  updateProductPortion: (productId: string, portionSize: number) => void;
  filterProductsByMealTime: (mealTime: MealTime) => void;
  filterProductsByNutritionalValue: (value: NutritionalCharacteristic) => void;
  resetProductsList: () => void;
}

export type ProductStore = ProductStoreState & ProductStoreActions;

export const useProductStore = create<ProductStore>()(
  subscribeWithSelector((set) => ({
    // Initial state
    productsList: [],
    currentProduct: null,
    chosenProducts: [],

    // Actions
    setProductsList: (products) => set({ productsList: products }),

    setCurrentProduct: (product) => set({ currentProduct: product }),

    setChosenProducts: (products) => set({ chosenProducts: products }),

    addChosenProduct: (product) =>
      set((state) => ({
        chosenProducts: [...state.chosenProducts, product],
        productsList: state.productsList.filter((p) => p.id !== product.id),
        currentProduct: product,
      })),

    removeChosenProduct: (productId) =>
      set((state) => {
        const productToRemove = state.chosenProducts.find(
          (p) => p.id === productId
        );
        if (!productToRemove) return state;

        const isAlreadyInList = state.productsList.some(
          (p) => p.id === productId
        );

        return {
          chosenProducts: state.chosenProducts.filter(
            (p) => p.id !== productId
          ),
          productsList: isAlreadyInList
            ? state.productsList
            : [productToRemove, ...state.productsList],
        };
      }),

    updateProductPortion: (productId, portionSize) =>
      set((state) => ({
        chosenProducts: state.chosenProducts.map((product) =>
          product.id === productId ? { ...product, portionSize } : product
        ),
        currentProduct:
          state.currentProduct?.id === productId
            ? { ...state.currentProduct, portionSize }
            : state.currentProduct,
      })),

    filterProductsByMealTime: (mealTime) => {
      const filteredMeals = meals.filter((meal) =>
        meal.mealTimes.includes(mealTime)
      ) as Product[];
      set({ productsList: filteredMeals });
    },

    filterProductsByNutritionalValue: (value) =>
      set((state) => ({
        productsList: state.productsList.filter((product) =>
          product.mainCharacteristic.includes(value)
        ),
      })),

    resetProductsList: () => set({ productsList: [] }),
  }))
);
