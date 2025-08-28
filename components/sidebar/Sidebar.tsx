import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import getMod from '@/utils/get-mod';

import styles from './sidebar.module.css';

type SidebarProps = {
  title?: string;
  mod?: string | string[];
} & PropsWithChildren;

export const Sidebar = ({ title, mod, children }: SidebarProps) => {
  return (
    <aside className={clsx(styles.sidebar, getMod(styles, 'sidebar', mod))}>
      {title && (
        <header className={styles['sidebar__header']}>
          <h3 className={styles['sidebar__title']}>{title}</h3>
        </header>
      )}
      <div className={styles['sidebar__body']}>{children}</div>
    </aside>
  );
};
