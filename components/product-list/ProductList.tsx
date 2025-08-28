import clsx from 'clsx';
import { memo } from 'react';

import { ProductType } from '@/types/common';

import ProductListItem from '../product-list-item';

import styles from './product-list.module.css';

type ProductListProps = {
  products: ProductType[];
  onProductSelect: (chosenProduct: ProductType) => void;
};

export const ProductList = memo(
  ({ products, onProductSelect }: ProductListProps) => {
    const isListEmpty = products.length === 0;
    return (
      <div
        className={clsx(styles['product-list'], {
          [styles['product-list--empty']]: isListEmpty,
        })}
        data-products-quantity={products.length}
      >
        <h3 className={styles['product-list__title']}>Продукты</h3>
        <ul className={styles['product-list__list']}>
          {products.map((product) => (
            <ProductListItem
              key={product.id}
              product={product}
              onSelect={onProductSelect}
            />
          ))}
        </ul>
      </div>
    );
  }
);

ProductList.displayName = 'ProductList';
