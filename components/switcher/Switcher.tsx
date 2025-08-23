import { SwitcherConfigType } from '@/types/switcher';

import Button from '../button';

import styles from './switcher.module.css';

type SwitcherProps = {
  config: SwitcherConfigType;
};

export const Switcher = ({ config }: SwitcherProps) => {
  return (
    <ul className={styles.switcher}>
      {config.switcherItems.map((item) => (
        <li
          key={item.value}
          className={styles['switcher__item']}
          style={{ width: `${100 / config.switcherItems.length}%` }}
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
};
