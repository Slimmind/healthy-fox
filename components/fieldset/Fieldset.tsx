import { PropsWithChildren } from 'react';

import styles from './fieldset.module.css';

type FieldsetProps = {
  title?: string;
} & PropsWithChildren;

export const Fieldset = ({ children, title }: FieldsetProps) => {
  return (
    <fieldset className={styles.fieldset}>
      {title && <legend>{title}</legend>}
      <div className={styles['fieldset__content']}>{children}</div>
    </fieldset>
  );
};
