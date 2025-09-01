import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { type MealTime, type Product } from '@/types/common';

type ProductState = {
  productList: Product[];
  currentProduct: Product | null;
  chosenProducts: Product[];
  currentMealTime: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: ProductState = {
  productList: [],
  currentProduct: null,
  chosenProducts: [],
  currentMealTime: '',
  loading: false,
  error: '',
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductList: (state, action: PayloadAction<Product[]>) => {
      state.productList = action.payload;
    },
    setCurrentProduct: (state, action: PayloadAction<Product>) => {
      state.currentProduct = action.payload;
    },
    setChosenProducts: (state, action: PayloadAction<Product[]>) => {
      state.chosenProducts = action.payload;
    },
    addChosenProduct: (state, action: PayloadAction<Product>) => {
      state.chosenProducts = [...state.chosenProducts, action.payload];
      state.productList = state.productList.filter(
        (product) => product.id !== action.payload.id
      );
    },
    removeChosenProduct: (state, action: PayloadAction<Product>) => {
      state.chosenProducts = state.chosenProducts.filter(
        (product) => product.id !== action.payload.id
      );
      state.productList = [action.payload, ...state.productList];
    },
    setMealTime: (state, action: PayloadAction<MealTime>) => {
      state.currentMealTime = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setProductList,
  setCurrentProduct,
  setChosenProducts,
  addChosenProduct,
  removeChosenProduct,
  setMealTime,
  setLoading,
  setError,
} = productSlice.actions;

export default productSlice.reducer;
