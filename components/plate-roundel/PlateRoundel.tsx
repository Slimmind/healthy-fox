import CarbohydratesIcon from '@/icons/carbohydrates-icon';
import FatsIcon from '@/icons/fats-icon';
import ProteinsIcon from '@/icons/proteins-icon';
import VegetablesIcon from '@/icons/vegetables-icon';

import styles from './plate-roundel.module.css';

type PlateRoundelProps = {
  filterHandler: (type: string) => void;
};

export const PlateRoundel = ({ filterHandler }: PlateRoundelProps) => {
  return (
    <div className={styles['plate__roundel']}>
      <div className={styles['plate__roundel-section-wrap']}>
        <div
          className={`
            ${styles['plate__roundel-section']}
            ${styles['plate__roundel-section--vegetables']}
          `}
          onClick={() => filterHandler('fiber')}
        >
          <div className={styles['plate__roundel-section-content']}>
            <VegetablesIcon />
            <strong className={styles['plate__roundel-section-content-value']}>
              50%
            </strong>
            <span
              className={styles['plate__roundel-section-content-description']}
            >
              Vegetables and fruits
            </span>
          </div>
        </div>
      </div>
      <div className={styles['plate__roundel-section-wrap']}>
        <div
          className={`
            ${styles['plate__roundel-section']}
            ${styles['plate__roundel-section--proteins']}
          `}
          onClick={() => filterHandler('proteins')}
        >
          <div className={styles['plate__roundel-section-content']}>
            <ProteinsIcon />
            <strong className={styles['plate__roundel-section-content-value']}>
              25%
            </strong>
            <span
              className={styles['plate__roundel-section-content-description']}
            >
              Protein
            </span>
          </div>
        </div>
        <div
          className={`
            ${styles['plate__roundel-section']}
            ${styles['plate__roundel-section--carbohydrates']}
          `}
          onClick={() => filterHandler('carbohydrates')}
        >
          <div className={styles['plate__roundel-section-content']}>
            <CarbohydratesIcon />
            <strong className={styles['plate__roundel-section-content-value']}>
              25%
            </strong>
            <span
              className={styles['plate__roundel-section-content-description']}
            >
              Carbohydrates
            </span>
          </div>
        </div>
      </div>
      <div
        className={`
          ${styles['plate__roundel-section']}
          ${styles['plate__roundel-section--fats']}
        `}
      >
        <div
          className={styles['plate__roundel-section-content']}
          onClick={() => filterHandler('fats')}
        >
          <FatsIcon />
          <strong className={styles['plate__roundel-section-content-value']}>
            Fats
          </strong>
        </div>
      </div>
    </div>
  );
};
