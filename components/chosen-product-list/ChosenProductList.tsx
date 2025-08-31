import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { memo, useCallback } from 'react';

import { ProductType } from '@/types/common';

import Button from '../button';
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
    const router = useRouter();
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

    const submitHandler = () => {
      const productSet = products.map((product) => ({
        id: product.id,
        name: product.name,
        quantity: product.portionSize,
      }));

      localStorage.setItem('productSet', JSON.stringify(productSet));

      router.push('/healthy-recipes');
    };

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
              <Button mod={['wide', 'secondary']} onClick={submitHandler}>
                Перейти к рецептам
              </Button>
            </li>
          )}
        </ul>
      </div>
    );
  }
);

ChosenProductList.displayName = 'ChosenProductList';
