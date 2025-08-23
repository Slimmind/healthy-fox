'use client';

import { useEffect, useState } from 'react';

import meals from '@/meals.json';
import { ProductType } from '@/types/common';
import { MeasurementDataType } from '@/types/measurement';

import Button from '../button';
import ChosenProductList from '../chosen-product-list';
import Measurement from '../measurement';
import PlateRoundel from '../plate-roundel';
import ProductCharacteristics from '../product-characteristics';
import Sidebar from '../sidebar';
// import Switcher from '../switcher';

import styles from './harvard-plate.module.css';

const initialMealSummary = {
  calories: 0,
  proteins: 0,
  fats: 0,
  carbohydrates: 0,
};

const mockUserData = {
  calories: 2000,
  proteins: 240,
  fats: 180,
  carbohydrates: 100,
};

export const HarvardPlate = () => {
  const [productsList, setProductsList] = useState<ProductType[]>([]);
  const [currenProduct, setCurrenProduct] = useState<ProductType | null>(null);
  const [chosenProducts, setChosenProducts] = useState<ProductType[]>([]);
  const [mealSummary, setMealSummary] =
    useState<MeasurementDataType>(initialMealSummary);

  const filterMeals = (mealTime: string): void => {
    const filteredMeals = meals.filter((meal) =>
      meal.mealTimes.includes(mealTime)
    );
    setProductsList(filteredMeals);
  };

  const removeProduct = (productId: string): void => {
    const productToRemove = chosenProducts.find(({ id }) => id === productId);

    if (!productToRemove) return;

    const updatedChosenProduct = chosenProducts.filter(
      (product) => product.id !== productId
    );

    const updatedProductsList = [productToRemove, ...productsList];

    setChosenProducts(updatedChosenProduct);
    setProductsList(updatedProductsList);
  };

  const currentProductClickHandler = (currentProduct: ProductType): void => {
    const updatedProductsList = productsList.filter(
      (productFromList: ProductType) => productFromList.id !== currentProduct.id
    );
    setProductsList(updatedProductsList);
    setCurrenProduct(currentProduct);
    setChosenProducts([...chosenProducts, currentProduct]);
  };

  useEffect(() => {
    const totalCalories = Math.round(
      chosenProducts.reduce(
        (acc, product) =>
          acc + (product.calories / product.unitValue) * product.portionSize,
        0
      )
    );
    const totalProteins = Math.round(
      chosenProducts.reduce(
        (acc, product) =>
          acc + (product.proteins / product.unitValue) * product.portionSize,
        0
      )
    );
    const totalFats = Math.round(
      chosenProducts.reduce(
        (acc, product) =>
          acc + (product.fats / product.unitValue) * product.portionSize,
        0
      )
    );
    const totalCarbohydrates = Math.round(
      chosenProducts.reduce(
        (acc, product) =>
          acc +
          (product.carbohydrates / product.unitValue) * product.portionSize,
        0
      )
    );

    setMealSummary({
      calories: totalCalories,
      proteins: totalProteins,
      fats: totalFats,
      carbohydrates: totalCarbohydrates,
    });
  }, [chosenProducts]);

  return (
    <div className={styles.plate}>
      <Sidebar title="Продукты" mods="left">
        <ul className={styles.productsList}>
          {productsList.map((meal: ProductType) => (
            <li
              key={meal.id}
              onClick={() => currentProductClickHandler(meal)}
              className={styles.meal}
            >
              {meal.name}
            </li>
          ))}
        </ul>
        <div className={styles.myChoice}>
          <h4 className={styles.myChoiceTitle}>Мой выбор:</h4>
          {/* <ul className={styles.chosenProductsList}>
            {chosenProducts.map((product) => (
              <li key={product.id} className={styles.chosenProduct}>
                {product.name}
              </li>
            ))}
          </ul> */}
          <ChosenProductList
            products={chosenProducts}
            removeHandler={removeProduct}
          />
        </div>
      </Sidebar>
      <nav className={styles.plate__switcher}>
        <Button onClick={() => filterMeals('breakfast')}>Завтрак</Button>
        <Button onClick={() => filterMeals('lunch')}>Обед</Button>
        <Button onClick={() => filterMeals('dinner')}>Ужин</Button>
      </nav>
      {/* <Switcher config={} /> */}
      <PlateRoundel />
      <Measurement userValues={mockUserData} chosenValues={mealSummary} />
      <Sidebar title="Характеристики" mods="right">
        {currenProduct && <ProductCharacteristics product={currenProduct} />}
      </Sidebar>
    </div>
  );
};
