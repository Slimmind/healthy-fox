import { ElementType, PropsWithChildren } from 'react';

import styles from './block.module.css';

type BlockProps = {
	tag?: ElementType;
	title?: string;
} & PropsWithChildren;

export const Block = ({ tag: Tag = 'div', title, children }: BlockProps) => {
	return (
		<Tag className={styles.block}>
			{title && <h3 className={styles.block__title}>{title}</h3>}
			{children}
		</Tag>
	);
};
