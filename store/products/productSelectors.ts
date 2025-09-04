import { useProductStore, type ProductStore } from './productStore';

// Stable selector functions to prevent infinite loops
const selectProductsList = (state: ProductStore) => state.productsList;
const selectCurrentProduct = (state: ProductStore) => state.currentProduct;
const selectChosenProducts = (state: ProductStore) => state.chosenProducts;

// Individual action selectors to prevent object recreation
const selectSetProductsList = (state: ProductStore) => state.setProductsList;
const selectSetCurrentProduct = (state: ProductStore) =>
  state.setCurrentProduct;
const selectSetChosenProducts = (state: ProductStore) =>
  state.setChosenProducts;
const selectAddChosenProduct = (state: ProductStore) => state.addChosenProduct;
const selectRemoveChosenProduct = (state: ProductStore) =>
  state.removeChosenProduct;
const selectUpdateProductPortion = (state: ProductStore) =>
  state.updateProductPortion;
const selectFilterProductsByMealTime = (state: ProductStore) =>
  state.filterProductsByMealTime;
const selectFilterProductsByNutritionalValue = (state: ProductStore) =>
  state.filterProductsByNutritionalValue;
const selectResetProductsList = (state: ProductStore) =>
  state.resetProductsList;

// Selectors
export const useProductsList = () => useProductStore(selectProductsList);
export const useCurrentProduct = () => useProductStore(selectCurrentProduct);
export const useChosenProducts = () => useProductStore(selectChosenProducts);

// Individual action hooks
export const useSetProductsList = () => useProductStore(selectSetProductsList);
export const useSetCurrentProduct = () =>
  useProductStore(selectSetCurrentProduct);
export const useSetChosenProducts = () =>
  useProductStore(selectSetChosenProducts);
export const useAddChosenProduct = () =>
  useProductStore(selectAddChosenProduct);
export const useRemoveChosenProduct = () =>
  useProductStore(selectRemoveChosenProduct);
export const useUpdateProductPortion = () =>
  useProductStore(selectUpdateProductPortion);
export const useFilterProductsByMealTime = () =>
  useProductStore(selectFilterProductsByMealTime);
export const useFilterProductsByNutritionalValue = () =>
  useProductStore(selectFilterProductsByNutritionalValue);
export const useResetProductsList = () =>
  useProductStore(selectResetProductsList);

// Combined actions hook - using individual selectors to prevent object recreation
export const useProductActions = () => ({
  setProductsList: useSetProductsList(),
  setCurrentProduct: useSetCurrentProduct(),
  setChosenProducts: useSetChosenProducts(),
  addChosenProduct: useAddChosenProduct(),
  removeChosenProduct: useRemoveChosenProduct(),
  updateProductPortion: useUpdateProductPortion(),
  filterProductsByMealTime: useFilterProductsByMealTime(),
  filterProductsByNutritionalValue: useFilterProductsByNutritionalValue(),
  resetProductsList: useResetProductsList(),
});
