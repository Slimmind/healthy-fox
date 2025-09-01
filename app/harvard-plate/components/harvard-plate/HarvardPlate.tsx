'use client';

import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from '@/components/sidebar';
import Switcher from '@/components/switcher';
import {
  selectChosenProducts,
  selectCurrentProduct,
  selectProductList,
} from '@/store/selectors/product-selectors';
import {
  removeChosenProduct,
  setProductList,
  setCurrentProduct,
  addChosenProduct,
  setChosenProducts,
  setMealTime,
} from '@/store/slices/product-slice';
import {
  MealTime,
  type NutritionalCharacteristic,
  type Product,
} from '@/types/common';
import { SwitcherConfigItemType } from '@/types/switcher';
import { filterProductsByMealTime } from '@/utils/filter-products';

import { MealTimesTitle, USER_DATA_MOCK } from '../../harvard-plate.constants';
import { useMealSummary } from '../../hooks/use-meal-summary';
import ChosenProductList from '../chosen-product-list';
import Measurement from '../measurement';
import PlateRoundel from '../plate-roundel';
import ProductCharacteristics from '../product-characteristics';
import ProductList from '../product-list';

import styles from './harvard-plate.module.css';

export const HarvardPlate = () => {
  const dispatch = useDispatch();
  const productList = useSelector(selectProductList);
  const currentProduct = useSelector(selectCurrentProduct);
  const chosenProducts = useSelector(selectChosenProducts);

  const mealSummary = useMealSummary(chosenProducts);

  const mealTimeSwitcherConfig: SwitcherConfigItemType[] = useMemo(
    () =>
      Object.values(MealTime).map((mealTime) => ({
        value: mealTime,
        text: MealTimesTitle[mealTime],
        switchHandler: () => {
          const filteredProducts = filterProductsByMealTime(mealTime);
          dispatch(setProductList(filteredProducts));
          dispatch(setMealTime(mealTime));
        },
      })),
    [dispatch]
  );

  const removeProduct = useCallback(
    (productId: string): void => {
      const productToRemove = chosenProducts.find(
        (chosenProduct: Product) => chosenProduct.id === productId
      );
      if (productToRemove) {
        dispatch(removeChosenProduct(productToRemove));
      }
    },
    [dispatch, chosenProducts]
  );

  const handleProductSelect = useCallback(
    (selectedProduct: Product): void => {
      const updatedProductList = productList.filter(
        (product: Product) => product.id !== selectedProduct.id
      );
      dispatch(setProductList(updatedProductList));
      dispatch(setCurrentProduct(selectedProduct));
      dispatch(addChosenProduct(selectedProduct));
    },
    [dispatch, productList]
  );

  const filterProductsByNutritionalValue = useCallback(
    (value: NutritionalCharacteristic) => {
      const filteredProductList = productList.filter((product: Product) =>
        product.mainCharacteristic.includes(value)
      );
      dispatch(setProductList(filteredProductList));
    },
    [dispatch, productList]
  );

  const changePortionSize = useCallback(
    (value: string): void => {
      if (!currentProduct) return;

      const updatedProduct = {
        ...currentProduct,
        portionSize: Number(value) || 0,
      };

      const updatedChosenProducts = chosenProducts.map((product: Product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );

      dispatch(setCurrentProduct(updatedProduct));
      dispatch(setChosenProducts(updatedChosenProducts));
    },
    [dispatch, chosenProducts, currentProduct]
  );

  const handleInputFocus = useCallback(
    (product: Product) => {
      dispatch(setCurrentProduct(product));
    },
    [dispatch]
  );

  return (
    <div className={styles.plate}>
      <Sidebar mod="left">
        <ProductList
          products={productList}
          onProductSelect={handleProductSelect}
        />

        <ChosenProductList
          products={chosenProducts}
          onInputFocus={handleInputFocus}
          onRemove={removeProduct}
          onPortionChange={changePortionSize}
        />
      </Sidebar>

      <Switcher config={mealTimeSwitcherConfig} />
      <PlateRoundel onFilter={filterProductsByNutritionalValue} />
      <Measurement userValues={USER_DATA_MOCK} chosenValues={mealSummary} />

      <Sidebar mod="right">
        <ProductCharacteristics product={currentProduct} />
      </Sidebar>
    </div>
  );
};
