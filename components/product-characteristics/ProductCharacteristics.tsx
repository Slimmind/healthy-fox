import { NutrientType, ProductType } from '@/types/common';
// TODO: Nadiia, please fix
// eslint-disable-next-line max-len
import { recalculateProductCharacteristics } from '@/utils/recalculate-product-characteristics';

import styles from './product-characteristics.module.css';

type ProductCharacteristicsType = {
  product: ProductType;
};

export const ProductCharacteristics = ({
  product,
}: ProductCharacteristicsType) => {
  const updatedProduct = recalculateProductCharacteristics(product);
  return (
    <div className={styles['product-characteristics']}>
      {updatedProduct && (
        <>
          <h4 className={styles['product-characteristics__title']}>
            <em>{updatedProduct.name}</em>
          </h4>
          <p className={styles['product-characteristics__item']}>
            <strong>Калорийность:</strong> {updatedProduct.calories} ккал на
            порцию в<strong>{updatedProduct.portionSize}</strong> грамм
          </p>
          <p className={styles['product-characteristics__item']}>
            <strong>Белки:</strong> {updatedProduct.proteins} г.
          </p>
          <p className={styles['product-characteristics__item']}>
            <strong>Жиры:</strong> {updatedProduct.fats} г.
          </p>
          <p className={styles['product-characteristics__item']}>
            <strong>Углеводы:</strong> {updatedProduct.carbohydrates} г.
          </p>
          <div className={styles['product-characteristics__column']}>
            <div className={styles['product-characteristics__list-wrap']}>
              <h5 className={styles['product-characteristics__item-title']}>
                <strong>Витамины:</strong>
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
                <strong>Минералы:</strong>
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
};
