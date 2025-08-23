import { ProductType } from '@/types/common';

import styles from './product-list.module.css';

type ProductListProps = {
  products: ProductType[];
  choseProductHandler: (chosenProduct: ProductType) => void;
};

export const ProductList = ({
  products,
  choseProductHandler,
}: ProductListProps) => {
  return (
    <ul className={styles['product-list']}>
      {products.map((product) => (
        <li
          key={product.id}
          className={styles['product-list__item']}
          onClick={() => choseProductHandler(product)}
        >
          <div className={styles['product-list__markers']}>
            {product.mainCharacteristic.map((characteristic) => (
              <div
                key={characteristic}
                className={`
                  ${styles['product-list__marker']}
                  ${styles[`product-list__marker--${characteristic}`]}`}
              ></div>
            ))}
          </div>
          <strong>{product.name}</strong>
        </li>
      ))}
    </ul>
  );
};
