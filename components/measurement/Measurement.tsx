'use client';

import { MeasurementDataType } from '@/utils/constants';
import styles from './measurement.module.css';

type MeasurementProps = {
	userValues: MeasurementDataType;
	chosenValues: MeasurementDataType;
};

export const Measurement = ({ userValues, chosenValues }: MeasurementProps) => {
	const getChosenColumnHeight = (key: keyof MeasurementDataType): string => {
		const userValue = userValues[key];
		const chosenValue = chosenValues[key];

		const percentage =
			chosenValue > 0
				? Math.max(5, Math.min((chosenValue / userValue) * 95, 95))
				: 0;

		return chosenValue ? `${percentage}%` : '';
	};

	const getUserColumnHeight = (key: keyof MeasurementDataType): string => {
		const userValue = userValues[key];
		const chosenValue = chosenValues[key];
		const percentage =
			chosenValue > userValue
				? Math.max(5, Math.min((userValue / chosenValue) * 95, 95))
				: 0;

		return !!percentage ? `${percentage}%` : '';
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
					<li
						key={key}
						className={styles.userGraphColumn}
						style={{
							height: getUserColumnHeight(key as keyof MeasurementDataType),
						}}
					>
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
							height: getChosenColumnHeight(key as keyof MeasurementDataType),
						}}
					>
						<b className={styles.choseGraphColumnValue}>{value || ''}</b>
					</li>
				))}
			</ul>
		</div>
	);
};
