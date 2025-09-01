import { memo, useCallback } from 'react';

import {
  type NutritionalCharacteristic,
  ProductType,
} from '../../harvard-plate.types';

import styles from './product-list-item.module.css';

export const ProductListItem = memo(
  ({
    product,
    onSelect,
  }: {
    product: ProductType;
    onSelect: (product: ProductType) => void;
  }) => {
    const handleClick = useCallback(() => {
      onSelect(product);
    }, [onSelect, product]);

    return (
      <li
        key={product.id}
        className={styles['product-list__item']}
        onClick={handleClick}
      >
        <div className={styles['product-list__markers']}>
          {product.mainCharacteristic.map(
            (characteristic: NutritionalCharacteristic) => (
              <div
                key={characteristic}
                className={`
              ${styles['product-list__marker']}
              ${styles[`product-list__marker--${characteristic}`]}
            `}
              />
            )
          )}
        </div>
        <strong>{product.name}</strong>
      </li>
    );
  }
);

ProductListItem.displayName = 'ProductListItem';
