'use client';

import { MeasurementDataType } from '@/types/measurement';

import styles from './measurement.module.css';

type MeasurementProps = {
  userValues: MeasurementDataType;
  chosenValues: MeasurementDataType;
};

export const Measurement = ({ userValues, chosenValues }: MeasurementProps) => {
  const getChosenHeight = (key: keyof MeasurementDataType): string => {
    const user = userValues[key];
    const chosen = chosenValues[key];

    const getPercentage = (): number => {
      if (user <= chosen) {
        return 95;
      }

      return (chosen / user) * 95;
    };

    return `${chosen > 0 ? Math.max(5, Math.min(getPercentage(), 100)) : 0}%`;
  };

  const getPercentage = (chosenValue: number, userValue: number): number => {
    if (chosenValue >= userValue) {
      return (userValue / chosenValue) * 100;
    }
    return 100;
  };

  const getUserHeight = (key: keyof MeasurementDataType): string => {
    const userValue = userValues[key];
    const chosenValue = chosenValues[key];

    return `
      ${Math.max(0, Math.min(getPercentage(chosenValue, userValue), 100))}%
    `;
  };

  const shouldHighlightRed = (key: keyof MeasurementDataType): boolean => {
    return chosenValues[key] > userValues[key];
  };

  const shouldHighlightGreen = (key: keyof MeasurementDataType): boolean => {
    return chosenValues[key] > userValues[key];
  };

  return (
    <div className={styles.measurement}>
      <ul className={styles['measurement__graph-titles']}>
        {Object.keys(userValues).map((title) => (
          <li
            key={title}
            className={`
              ${styles['measurement__graph-titles-item']}
              ${styles['measurement__graph-titles-item' + '--' + title]}
            `}
          >
            {title}
          </li>
        ))}
      </ul>

      <ul className={styles['measurement__user-graph']}>
        {Object.entries(userValues).map(([key, value]) => {
          const height = getUserHeight(key as keyof MeasurementDataType);
          const isOver = shouldHighlightRed(key as keyof MeasurementDataType);
          return (
            <li
              key={key}
              className={`${styles['measurement__user-graph-item']} ${
                isOver ? styles['measurement__user-graph-item--over'] : ''
              }`}
              style={{ height: height }}
            >
              {value}
            </li>
          );
        })}
      </ul>

      <ul className={styles['measurement__chosen-graph']}>
        {Object.entries(chosenValues).map(([key, value]) => {
          const height = getChosenHeight(key as keyof MeasurementDataType);
          const isOver = shouldHighlightRed(key as keyof MeasurementDataType);
          const isEnough = shouldHighlightGreen(
            key as keyof MeasurementDataType
          );

          return (
            <li
              key={key}
              className={`
                ${styles['measurement__chosen-graph-item']}
                ${isOver ? styles['measurement__chosen-graph-item--over'] : ''}
                ${
                  isEnough ? styles['measurement__chosen-graph--enough'] : ''
                }}`}
              style={{ height: height }}
            >
              <b className={styles['measurement__chosen-graph-item-value']}>
                {value || ''}
              </b>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
