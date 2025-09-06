import { memo } from 'react';

import { recalculateProductCharacteristics } from '@/utils/recalculate-product-characteristics';

import { NutrientType, Product } from '../../harvard-plate.types';

import styles from './product-characteristics.module.css';

type ProductCharacteristicsType = {
  product: Product | null;
};

export const ProductCharacteristics = memo(
  ({ product }: ProductCharacteristicsType) => {
    const updatedProduct =
      product && recalculateProductCharacteristics(product);
    return (
      <div className={styles['product-characteristics']}>
        <h3 className={styles['product-characteristics__title']}>
          Характеристики
        </h3>
        {updatedProduct && (
          <>
            <h4 className={styles['product-characteristics__product']}>
              <em>{updatedProduct.name}</em>
            </h4>
            <p className={styles['product-characteristics__item']}>
              <strong>Калорийность:</strong> {updatedProduct.calories} ккал на
              порцию в<strong>{updatedProduct.portionSize}</strong> грамм
            </p>
            <p className={styles['product-characteristics__item']}>
              <strong>Белки:</strong> {updatedProduct.proteins.toFixed(1)} г.
            </p>
            <p className={styles['product-characteristics__item']}>
              <strong>Жиры:</strong> {updatedProduct.fats.toFixed(1)} г.
            </p>
            <p className={styles['product-characteristics__item']}>
              <strong>Углеводы:</strong>
              {updatedProduct.carbohydrates.toFixed(1)} г.
            </p>
            <div className={styles['product-characteristics__column']}>
              <div className={styles['product-characteristics__list-wrap']}>
                <h5 className={styles['product-characteristics__item-title']}>
                  Витамины:
                </h5>
                <ul className={styles['product-characteristics__list']}>
                  {updatedProduct.vitamins.map((vitamin: NutrientType) => {
                    return (
                      <li
                        key={vitamin.name}
                        className={styles['product-characteristics__item']}
                      >
                        <em>{vitamin.name}:</em> {vitamin.value.toFixed(1)} мг
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={styles['product-characteristics__list-wrap']}>
                <h5 className={styles['product-characteristics__item-title']}>
                  Минералы:
                </h5>
                <ul className={styles['product-characteristics__list']}>
                  {updatedProduct.minerals.map((mineral: NutrientType) => {
                    return (
                      <li
                        key={mineral.name}
                        className={styles['product-characteristics__item']}
                      >
                        <em>{mineral.name}:</em> {mineral.value.toFixed(1)} мг
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <p className={styles['product-characteristics__description']}>
              {updatedProduct.description}
            </p>
            <p className={styles['product-characteristics__storage']}>
              {updatedProduct.storage}
            </p>
          </>
        )}
      </div>
    );
  }
);

ProductCharacteristics.displayName = 'ProductCharacteristics';
