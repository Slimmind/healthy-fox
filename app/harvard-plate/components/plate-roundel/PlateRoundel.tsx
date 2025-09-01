import { memo } from 'react';

import CarbohydratesIcon from '@/icons/carbohydrates-icon';
import FatsIcon from '@/icons/fats-icon';
import ProteinsIcon from '@/icons/proteins-icon';
import VegetablesIcon from '@/icons/vegetables-icon';

import { NutritionalCharacteristic } from '../../harvard-plate.types';

import styles from './plate-roundel.module.css';

type PlateRoundelProps = {
  onFilter: (type: NutritionalCharacteristic) => void;
};

export const PlateRoundel = memo(({ onFilter }: PlateRoundelProps) => {
  return (
    <div className={styles['plate__roundel']}>
      <div className={styles['plate__roundel-section-wrap']}>
        <div
          className={`
            ${styles['plate__roundel-section']}
            ${styles['plate__roundel-section--vegetables']}
          `}
          onClick={() => onFilter(NutritionalCharacteristic.Fiber)}
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
          onClick={() => onFilter(NutritionalCharacteristic.Proteins)}
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
          onClick={() => onFilter(NutritionalCharacteristic.Carbohydrates)}
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
          onClick={() => onFilter(NutritionalCharacteristic.Fats)}
        >
          <FatsIcon />
          <strong className={styles['plate__roundel-section-content-value']}>
            Fats
          </strong>
        </div>
      </div>
    </div>
  );
});

PlateRoundel.displayName = 'PlateRoundel';
