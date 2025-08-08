'use client';

import { MeasurementDataType } from '@/utils/constants';
import styles from './measurement.module.css';

type MeasurementProps = {
	userValues: MeasurementDataType;
	chosenValues: MeasurementDataType;
};

export const Measurement = ({ userValues, chosenValues }: MeasurementProps) => {
	const getColumnHeight = (key: keyof MeasurementDataType): string => {
		const userValue = userValues[key];
		const chosenValue = chosenValues[key];

		const percentage = userValue > 0 ? (chosenValue / userValue) * 100 : 0;

		return `${percentage}%`;
	};

	return (
		<div className={styles.measurement}>
			<ul className={styles.graphTitles}>
				{Object.keys(userValues).map((title: string) => (
					<li key={title} className={styles.graphTitlesColumn}>
						{title}
					</li>
				))}
			</ul>
			<ul className={styles.userGraph}>
				{Object.entries(userValues).map(([key, value]) => (
					<li key={key} className={styles.userGraphColumn}>
						{value}
					</li>
				))}
			</ul>
			<ul className={styles.chosenGraph}>
				{Object.entries(chosenValues).map(([key, value]) => (
					<li
						key={key}
						className={styles.chosenGraphColumn}
						style={{
							height: getColumnHeight(key as keyof MeasurementDataType),
						}}
					>
						{value}
					</li>
				))}
			</ul>
		</div>
	);
};
