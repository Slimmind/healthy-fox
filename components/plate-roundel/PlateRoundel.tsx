import styles from './plate-roundel.module.css';

export const PlateRoundel = () => {
	return (
		<div className={styles.plateRoundel}>
			<div className={styles.plateSection}>
				<div className={styles.plateVegetables}></div>
				<div className={styles.plateFruits}></div>
			</div>
			<div className={styles.plateSection}>
				<div className={styles.plateProteins}></div>
				<div className={styles.plateCarbohydrates}></div>
			</div>
		</div>
	);
};
