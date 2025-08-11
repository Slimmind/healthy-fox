import { ProductType } from '@/types/common';

import Button from '../button';
import Input from '../input';

import styles from './chosen-product-item.module.css';

type ChosenProductItemProps = {
  product: ProductType;
};

export const ChosenProductItem = ({ product }: ChosenProductItemProps) => {
  return (
    <li className={styles['chosen-product-list__item']} id={product.id}>
      <Button aria-label={`удалить ${product.name} из списка`} />
      <span className={styles['chosen-product-list__item-name']}>
        {product.name}
      </span>
      <Input type="number" />
    </li>
  );
};
