import { RootState } from '../store';

export const selectProductList = (state: RootState) =>
  state.product.productList;
export const selectChosenProducts = (state: RootState) =>
  state.product.chosenProducts;
export const selectCurrentProduct = (state: RootState) =>
  state.product.currentProduct;
export const selectCurrentMealTime = (state: RootState) =>
  state.product.currentMealTime;
export const selectProductsLoading = (state: RootState) =>
  state.product.loading;
export const selectProductsError = (state: RootState) => state.product.error;
