import { SwitcherConfigType } from '@/types/switcher';

import Button from '../button';

import styles from './switcher.module.css';

type SwitcherProps = {
  config: SwitcherConfigType;
};

export const Switcher = ({ config }: SwitcherProps) => {
  return (
    <menu className={styles.switcher}>
      {config.switcherItems.map((item) => (
        <li key={item.value}>
          <Button
            onClick={() => {
              item.handler(item.value);
            }}
          >
            {item.text}
          </Button>
        </li>
      ))}
    </menu>
  );
};
