import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { getMod } from '@/utils/get-mod';

import styles from './sidebar.module.css';

type SidebarProps = {
  title?: string;
  mods?: string | string[]; // Теперь принимает и строку, и массив
} & PropsWithChildren;

export const Sidebar = ({ title, mods, children }: SidebarProps) => {
	const classes = clsx(styles.sidebar, getMod(styles, 'sidebar', mods));
	return (
		<aside className={classes}>
			{title && (
				<header className={styles.sidebar__header}>
					<h3 className={styles.sidebar__title}>{title}</h3>
				</header>
			)}
			<div className={styles.sidebar__body}>{children}</div>
		</aside>
	);
};
