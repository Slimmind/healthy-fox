'use client';

import { useCallback, useMemo } from 'react';

import Sidebar from '@/components/sidebar';
import Switcher from '@/components/switcher';
import {
  useProductsList,
  useCurrentProduct,
  useChosenProducts,
  useProductActions,
} from '@/store/products';
import { SwitcherConfigItemType } from '@/types/switcher';

import { MealTimesTitle } from '../../harvard-plate.constants';
import { MealTime, Product } from '../../harvard-plate.types';
import { useMealSummary } from '../../hooks/use-meal-summary';
import ChosenProductList from '../chosen-product-list';
import Measurement from '../measurement';
import PlateRoundel from '../plate-roundel';
import ProductCharacteristics from '../product-characteristics';
import ProductList from '../product-list';

import styles from './harvard-plate.module.css';

const MOCK_USER_DATA = {
  calories: 2000,
  proteins: 240,
  fats: 180,
  carbohydrates: 100,
};

export const HarvardPlate = () => {
  const productsList = useProductsList();
  const currentProduct = useCurrentProduct();
  const chosenProducts = useChosenProducts();
  const {
    addChosenProduct,
    removeChosenProduct,
    updateProductPortion,
    filterProductsByMealTime,
    filterProductsByNutritionalValue,
  } = useProductActions();

  const mealSummary = useMealSummary(chosenProducts);

  const mealTimeSwitcherConfig: SwitcherConfigItemType[] = useMemo(
    () =>
      Object.values(MealTime).map((mealTime) => ({
        value: mealTime,
        text: MealTimesTitle[mealTime],
        switchHandler: () => filterProductsByMealTime(mealTime),
      })),
    [filterProductsByMealTime]
  );

  const handleProductSelect = useCallback(
    (selectedProduct: Product): void => {
      addChosenProduct(selectedProduct);
    },
    [addChosenProduct]
  );

  const changePortionSize = useCallback(
    (value: string): void => {
      if (!currentProduct) return;

      updateProductPortion(currentProduct.id, Number(value) || 0);
    },
    [currentProduct, updateProductPortion]
  );

  const handleInputFocus = useCallback((_product: Product) => {
    // Note: currentProduct is automatically set when adding a product
    // This function might not be needed anymore, but keeping for compatibility
  }, []);

  return (
    <div className={styles.plate}>
      <Switcher config={mealTimeSwitcherConfig} />
      <PlateRoundel onFilter={filterProductsByNutritionalValue} />
      <Sidebar mod="left">
        <ProductList
          products={productsList}
          onProductSelect={handleProductSelect}
        />

        <ChosenProductList
          products={chosenProducts}
          onInputFocus={handleInputFocus}
          onRemove={removeChosenProduct}
          onPortionChange={changePortionSize}
        />
      </Sidebar>
      <Measurement userValues={MOCK_USER_DATA} chosenValues={mealSummary} />
      <Sidebar mod="right">
        <ProductCharacteristics product={currentProduct} />
      </Sidebar>
    </div>
  );
};
