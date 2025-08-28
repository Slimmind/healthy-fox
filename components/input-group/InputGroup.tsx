import clsx from 'clsx';
import { lazy, PropsWithChildren } from 'react';

import styles from './input-group.module.css';

const WarningIcon = lazy(() => import('../../icons/warning-icon'));

type InputGroupProps = {
  title?: string;
  description?: string;
  errorMessage?: string;
} & PropsWithChildren;

export const InputGroup = ({
  title,
  children,
  description,
  errorMessage,
}: InputGroupProps) => {
  const classes = clsx(
    styles['input-group'],
    description && styles['input-group--with-description'],
    errorMessage && styles['input-group--invalid']
  );
  return (
    <div className={classes}>
      <h5 className={styles['input-group__title']}>{title}</h5>
      <div className={styles['input-group__body']}>{children}</div>
      {description && (
        <p className={styles['input__description"']}>{description}</p>
      )}
      {errorMessage && (
        <p className={styles['input__error-message']}>
          <WarningIcon />
          {errorMessage}
        </p>
      )}
    </div>
  );
};
