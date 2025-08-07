import Sidebar from '../sidebar';
import styles from './harvard-plate.module.css';

export const HarvardPlate = () => {
	return (
		<div className={styles.plate}>
			<Sidebar title='Left Sidebar' mods='left'></Sidebar>
			{/* <aside
				className={`${styles.plate__sidebar} ${styles['plate__sidebar--left']}`}
			>
				<h3>Left Sidebar</h3>
			</aside> */}
			<nav className={styles.plate__switcher}>Switcher</nav>
			<div className={styles.plate__roundel}>Plate</div>
			<div className={styles.measurement}>Measurement</div>
      <Sidebar title='Right Sidebar' mods='right'></Sidebar>
		</div>
	);
};
