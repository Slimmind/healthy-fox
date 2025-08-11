import styles from './plate-roundel.module.css';

export const PlateRoundel = () => {
  return (
    <div className={styles['plate__roundel']}>
      <div className={styles['plate__roundel-section']}>
        <div className={styles['plate__roundel-vegetables']}></div>
      </div>
      <div className={styles['plate__roundel-section']}>
        <div className={styles['plate__roundel-proteins']}></div>
        <div className={styles['plate__roundel-carbohydrates']}></div>
      </div>
    </div>
  );
};
