import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './sidebar.module.css';
import { getMod } from '@/utils/get-mod';

type SidebarProps = {
	title?: string;
	mods?: string | string[]; // Теперь принимает и строку, и массив
} & PropsWithChildren;

export const Sidebar = ({ title, mods, children }: SidebarProps) => {
	return (
		<aside className={clsx(styles.sidebar, getMod(styles, 'sidebar', mods))}>
			{title && (
				<header className={styles.sidebar__header}>
					<h3 className={styles.sidebar__title}>{title}</h3>
				</header>
			)}
			<div className={styles.sidebar__body}>{children}</div>
		</aside>
	);
};
