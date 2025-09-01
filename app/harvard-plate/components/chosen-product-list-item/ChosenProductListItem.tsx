import { memo, useCallback } from 'react';

import Button from '@/components/button';
import Input from '@/components/input';
import DeleteIcon from '@/icons/delete-icon';

import { ProductType } from '../../harvard-plate.types';

import styles from './chosen-product-list-item.module.css';

type ChosenProductListItemProps = {
  product: ProductType;
  onInputFocus: (product: ProductType) => void;
  onRemove: (productId: string) => void;
  onPortionChange: (value: string) => void;
};

export const ChosenProductListItem = memo(
  ({
    product,
    onInputFocus,
    onRemove,
    onPortionChange,
  }: ChosenProductListItemProps) => {
    const handleRemove = useCallback(() => {
      onRemove(product.id);
    }, [onRemove, product.id]);

    const handleInputFocus = useCallback(() => {
      onInputFocus(product);
    }, [onInputFocus, product]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        onPortionChange(value);
      },
      [onPortionChange]
    );

    return (
      <li className={styles['chosen-product-list__item']} id={product.id}>
        <Button
          mod={['icon', 'delete']}
          aria-label={`удалить ${product.name} из списка`}
          onClick={handleRemove}
        >
          <DeleteIcon />
        </Button>

        <span
          className={styles['chosen-product-list__item-name']}
          title={product.name}
        >
          {product.name}
        </span>

        <Input
          className={styles['chosen-product-list__item-input']}
          type="number"
          name={`portion-${product.id}`}
          value={product.portionSize?.toString() || ''}
          onFocus={handleInputFocus}
          onChange={handleChange}
          min="0"
          step="1"
          inputMode="numeric"
          placeholder="0"
          aria-label={`Размер порции для ${product.name}`}
        />
      </li>
    );
  }
);

ChosenProductListItem.displayName = 'ChosenProductListItem';
