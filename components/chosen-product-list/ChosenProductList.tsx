import { ProductType } from '@/types/common';

import ChosenProductItem from '../chosen-product-item';

import styles from './chosen-product-list.module.css';

type ChosenProductListProps = {
  products: ProductType[];
};

export const ChosenProductList = ({
  products = [],
}: ChosenProductListProps) => {
  return (
    <ul className={styles['chosen-product-list']}>
      {products.map((product) => (
        <ChosenProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
};
