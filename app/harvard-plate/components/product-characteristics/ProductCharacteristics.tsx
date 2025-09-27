import { memo } from 'react';

import { recalculateProductCharacteristics } from '@/utils/recalculate-product-characteristics';

import { NutrientType, Product } from '../../harvard-plate.types';

import styles from './product-characteristics.module.css';

type ProductCharacteristicsType = {
  products: Product[];
};

export const ProductCharacteristics = memo(
  ({ products }: ProductCharacteristicsType) => {
    const updatedProducts = products.map((product: Product) =>
      recalculateProductCharacteristics(product)
    );
    return (
      <ul>
        {updatedProducts.map((product: Product) => (
          <li key={product.id}>
            <div className={styles['product-characteristics']}>
              <h4 className={styles['product-characteristics__product']}>
                <em>{product.name}</em>
              </h4>
              <p className={styles['product-characteristics__item']}>
                <strong>Калорийность:</strong> {product.calories} ккал на порцию
                в<strong>{product.portionSize}</strong> грамм
              </p>
              <p className={styles['product-characteristics__item']}>
                <strong>Белки:</strong> {product.proteins.toFixed(1)} г.
              </p>
              <p className={styles['product-characteristics__item']}>
                <strong>Жиры:</strong> {product.fats.toFixed(1)} г.
              </p>
              <p className={styles['product-characteristics__item']}>
                <strong>Углеводы:</strong>
                {product.carbohydrates.toFixed(1)} г.
              </p>
              <div className={styles['product-characteristics__column']}>
                <div className={styles['product-characteristics__list-wrap']}>
                  <h5 className={styles['product-characteristics__item-title']}>
                    Витамины:
                  </h5>
                  <ul className={styles['product-characteristics__list']}>
                    {product.vitamins.map((vitamin: NutrientType) => {
                      return (
                        <li
                          key={vitamin.name}
                          className={styles['product-characteristics__item']}
                        >
                          <em>{vitamin.name}:</em>
                          {vitamin.value.toFixed(1)} мг
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
                    {product.minerals.map((mineral: NutrientType) => {
                      return (
                        <li
                          key={mineral.name}
                          className={styles['product-characteristics__item']}
                        >
                          <em>{mineral.name}:</em>
                          {mineral.value.toFixed(1)} мг
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <p className={styles['product-characteristics__description']}>
                {product.description}
              </p>
              <p className={styles['product-characteristics__storage']}>
                {product.storage}
              </p>
            </div>
          </li>
        ))}
      </ul>
    );
  }
);

ProductCharacteristics.displayName = 'ProductCharacteristics';
