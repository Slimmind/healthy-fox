import clsx from 'clsx';
import Link from 'next/link';
import { memo, useCallback } from 'react';

import Button from '@/components/button';
import { ROUTES } from '@/constants/routes';

import { ProductType } from '../../harvard-plate.types';
import ChosenProductListItem from '../chosen-product-list-item';

import styles from './chosen-product-list.module.css';

type ChosenProductListProps = {
  products: ProductType[];
  onInputFocus: (product: ProductType) => void;
  onRemove: (productId: string) => void;
  onPortionChange: (value: string) => void;
};

export const ChosenProductList = memo(
  ({
    products,
    onInputFocus,
    onRemove,
    onPortionChange,
  }: ChosenProductListProps) => {
    const isListEmpty = products.length === 0;
    const createInputFocusHandler = useCallback(
      (product: ProductType) => () => {
        onInputFocus(product);
      },
      [onInputFocus]
    );

    const createRemoveHandler = useCallback(
      (productId: string) => () => {
        onRemove(productId);
      },
      [onRemove]
    );

    return (
      <div
        className={clsx(styles['chosen-product-list'], {
          [styles['chosen-product-list--empty']]: isListEmpty,
        })}
        data-products-quantity={products.length}
      >
        <h3 className={styles['chosen-product-list__title']}>Мой выбор</h3>
        <ul className={styles['chosen-product-list__list']}>
          {products.map((product) => (
            <ChosenProductListItem
              key={product.id}
              product={product}
              onInputFocus={createInputFocusHandler(product)}
              onRemove={createRemoveHandler(product.id)}
              onPortionChange={onPortionChange}
            />
          ))}
          {!isListEmpty && (
            <li className={styles['chosen-product-list__redirect']}>
              <Link href={ROUTES.HEALTHY_RECIPES}>
                <Button mod={['wide', 'secondary']}>Перейти к рецептам</Button>
              </Link>
            </li>
          )}
        </ul>
      </div>
    );
  }
);

ChosenProductList.displayName = 'ChosenProductList';
