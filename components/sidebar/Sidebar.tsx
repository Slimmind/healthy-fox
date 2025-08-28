import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import getMod from '@/utils/get-mod';

import styles from './sidebar.module.css';

type SidebarProps = {
  mod?: string | string[];
} & PropsWithChildren;

export const Sidebar = ({ mod, children }: SidebarProps) => {
  const classes = clsx(styles.sidebar, getMod(styles, 'sidebar', mod));
  return <aside className={classes}>{children}</aside>;
};
