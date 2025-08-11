import { ProductType } from '@/types/common';

import ChosenProductListItem from '../chosen-product-list-item';

import styles from './chosen-product-list.module.css';

type ChosenProductListProps = {
  products: ProductType[];
  removeHandler: (productId: string) => void;
};

export const ChosenProductList = ({
  products = [],
  removeHandler,
}: ChosenProductListProps) => {
  return (
    <ul className={styles['chosen-product-list']}>
      {products.map((product) => (
        <ChosenProductListItem
          key={product.id}
          product={product}
          removeHandler={() => removeHandler(product.id)}
        />
      ))}
    </ul>
  );
};
