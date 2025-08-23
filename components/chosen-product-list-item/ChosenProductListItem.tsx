import DeleteIcon from '@/icons/delete-icon';
import { ProductType } from '@/types/common';

import Button from '../button';
import Input from '../input';

import styles from './chosen-product-list-item.module.css';

type ChosenProductItemProps = {
  product: ProductType;
  inputFocusHandler: (product: ProductType) => void;
  removeHandler: (productId: string) => void;
};

export const ChosenProductListItem = ({
  product,
  inputFocusHandler,
  removeHandler,
}: ChosenProductItemProps) => {
  return (
    <li className={styles['chosen-product-list__item']} id={product.id}>
      <Button
        mod={['icon', 'delete']}
        aria-label={`удалить ${product.name} из списка`}
        onClick={() => removeHandler(product.id)}
      >
        <DeleteIcon />
      </Button>
      <span className={styles['chosen-product-list__item-name']}>
        {product.name}
      </span>
      <Input
        className={styles['chosen-product-list__item-input']}
        type="text"
        name={product.name}
        value={product.portionSize}
        onFocus={() => inputFocusHandler(product)}
        pattern="[0-9]*"
      />
    </li>
  );
};
