import { Nutrient, ProductType } from '@/types/common';

import styles from './product-characteristics.module.css';

type ProductCharacteristicsType = {
  product: ProductType;
};

export const ProductCharacteristics = ({
  product,
}: ProductCharacteristicsType) => {
  return (
    <div className={styles['product-characteristics']}>
      {product && (
        <>
          <h4 className={styles['product-characteristics__title']}>
            <em>{product.name}</em>
          </h4>
          <p className={styles['product-characteristics__item']}>
            <strong>Калорийность:</strong> {product.calories} ккал на порцию в
            <strong>{product.portionSize}</strong> грамм
          </p>
          <p className={styles['product-characteristics__item']}>
            <strong>Белки:</strong> {product.proteins} г.
          </p>
          <p className={styles['product-characteristics__item']}>
            <strong>Жиры:</strong> {product.fats} г.
          </p>
          <p className={styles['product-characteristics__item']}>
            <strong>Углеводы:</strong> {product.carbohydrates} г.
          </p>
          <div className={styles['product-characteristics__column']}>
            <div className={styles['product-characteristics__list-wrap']}>
              <h5 className={styles['product-characteristics__item-title']}>
                <strong>Витамины:</strong>
              </h5>
              <ul className={styles['product-characteristics__list']}>
                {product.vitamins.map((vitamin: Nutrient) => {
                  return (
                    <li
                      key={vitamin.name}
                      className={styles['product-characteristics__item']}
                    >
                      <em>{vitamin.name}:</em> {vitamin.value} мг
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={styles['product-characteristics__list-wrap']}>
              <h5 className={styles['product-characteristics__item-title']}>
                <strong>Минералы:</strong>
              </h5>
              <ul className={styles['product-characteristics__list']}>
                {product.minerals.map((mineral: Nutrient) => {
                  return (
                    <li
                      key={mineral.name}
                      className={styles['product-characteristics__item']}
                    >
                      <em>{mineral.name}:</em> {mineral.value} мг
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
        </>
      )}
    </div>
  );
};
