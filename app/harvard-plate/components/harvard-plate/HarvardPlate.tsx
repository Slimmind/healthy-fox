'use client';

import { useCallback, useMemo, useState } from 'react';

import Sidebar from '@/components/sidebar';
import Switcher from '@/components/switcher';
import { SwitcherConfigItemType } from '@/types/switcher';
import { filterProductsByMealTime } from '@/utils/filter-products';

import { MealTimesTitle } from '../../harvard-plate.constants';
import {
  MealTime,
  NutritionalCharacteristic,
  ProductType,
} from '../../harvard-plate.types';
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
  const [productsList, setProductsList] = useState<ProductType[]>([]);
  const [currentProduct, setCurrentProduct] = useState<ProductType | null>(
    null
  );
  const [chosenProducts, setChosenProducts] = useState<ProductType[]>([]);

  const mealSummary = useMealSummary(chosenProducts);

  const mealTimeSwitcherConfig: SwitcherConfigItemType[] = useMemo(
    () =>
      Object.values(MealTime).map((mealTime) => ({
        value: mealTime,
        text: MealTimesTitle[mealTime],
        switchHandler: () =>
          filterProductsByMealTime(mealTime, setProductsList),
      })),
    []
  );

  const removeProduct = useCallback((productId: string): void => {
    setChosenProducts((prevChosen) => {
      const productToRemove = prevChosen.find(({ id }) => id === productId);
      if (!productToRemove) return prevChosen;

      setProductsList((prevList) => {
        const isAlreadyExists = prevList.some(
          (product) => product.id === productId
        );
        if (!isAlreadyExists) {
          return [productToRemove, ...prevList];
        }
        return prevList;
      });

      return prevChosen.filter((product) => product.id !== productId);
    });
  }, []);

  const handleProductSelect = useCallback(
    (selectedProduct: ProductType): void => {
      setProductsList((prevList) =>
        prevList.filter((product) => product.id !== selectedProduct.id)
      );

      setCurrentProduct(selectedProduct);
      setChosenProducts((prevChosen) => [...prevChosen, selectedProduct]);
    },
    []
  );

  const filterProductsByNutritionalValue = useCallback(
    (value: NutritionalCharacteristic) => {
      setProductsList((prevList) =>
        prevList.filter((product) => product.mainCharacteristic.includes(value))
      );
    },
    []
  );

  const changePortionSize = useCallback(
    (value: string): void => {
      if (!currentProduct) return;

      const updatedProduct = {
        ...currentProduct,
        portionSize: Number(value) || 0,
      };

      setCurrentProduct(updatedProduct);

      setChosenProducts((prevChosen) =>
        prevChosen.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
    },
    [currentProduct]
  );

  const handleInputFocus = useCallback((product: ProductType) => {
    setCurrentProduct(product);
  }, []);

  return (
    <div className={styles.plate}>
      <Sidebar mod="left">
        <ProductList
          products={productsList}
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
      <Measurement userValues={MOCK_USER_DATA} chosenValues={mealSummary} />

      <Sidebar mod="right">
        <ProductCharacteristics product={currentProduct} />
      </Sidebar>
    </div>
  );
};
