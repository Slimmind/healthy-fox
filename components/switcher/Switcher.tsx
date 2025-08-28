import { memo } from 'react';

import { SwitcherConfigType } from '@/types/switcher';

import Button from '../button';

import styles from './switcher.module.css';

type SwitcherProps = {
  config: SwitcherConfigType;
};

export const Switcher = memo(({ config }: SwitcherProps) => {
  const itemWidth = `${100 / config.length}%`;
  return (
    <ul className={styles.switcher}>
      {config.map((item) => (
        <li
          key={item.value}
          className={styles['switcher__item']}
          style={{ width: itemWidth }}
        >
          <Button
            mod={['wide', 'secondary']}
            onClick={() => {
              item.switchHandler(item.value);
            }}
          >
            {item.text}
          </Button>
        </li>
      ))}
    </ul>
  );
});

Switcher.displayName = 'Switcher';
