'use client';

import clsx from 'clsx';
import { PropsWithChildren, useState } from 'react';

import styles from './dropdown.module.css';

type DropdownProps = {
  title: string;
} & PropsWithChildren;

export const Dropdown = ({ title, children }: DropdownProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const toggleDropdown = () => {
    setIsOpened(!isOpened);
  };

  const classes = clsx('dropdown', isOpened && 'dropdown--opened');

  return (
    <section className={classes}>
      <h5
        className={styles['dropdown__title']}
        role="button"
        onClick={toggleDropdown}
      >
        {title}
      </h5>
      <div className={styles['dropdown__body']}>{children}</div>
    </section>
  );
};
