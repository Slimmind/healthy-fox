'use client';

import { MeasurementDataType } from '@/types/measurement';

import styles from './measurement.module.css';

type MeasurementProps = {
  userValues: MeasurementDataType;
  chosenValues: MeasurementDataType;
};

export const Measurement = ({ userValues, chosenValues }: MeasurementProps) => {
  // const normalValue = 60;
  const getChosenHeight = (key: keyof MeasurementDataType): string => {
    const user = userValues[key];
    const chosen = chosenValues[key];

    const getPercentage = (): number => {
      if (user <= chosen) {
        return 100;
      }

      return (chosen / user) * 100;
    };

    return `${Math.max(0, Math.min(getPercentage(), 100))}%`;
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
      <ul className={styles.graphTitles}>
        {Object.keys(userValues).map((title) => (
          <li key={title} className={styles.graphTitlesColumn}>
            {title}
          </li>
        ))}
      </ul>

      <ul className={styles.userGraph}>
        {Object.entries(userValues).map(([key, value]) => {
          const height = getUserHeight(key as keyof MeasurementDataType);
          const isOver = shouldHighlightRed(key as keyof MeasurementDataType);
          return (
            <li
              key={key}
              className={`${styles.userGraphColumn} ${
                isOver ? styles.userGraphColumnOver : ''
              }`}
              style={{ height: height }}
            >
              {value}
            </li>
          );
        })}
      </ul>

      <ul className={styles.chosenGraph}>
        {Object.entries(chosenValues).map(([key, value]) => {
          const height = getChosenHeight(key as keyof MeasurementDataType);
          const isOver = shouldHighlightRed(key as keyof MeasurementDataType);
          const isEnough = shouldHighlightGreen(
            key as keyof MeasurementDataType
          );

          return (
            <li
              key={key}
              className={`${styles.chosenGraphColumn} ${
                isOver ? styles.chosenGraphColumnOver : ''
              } ${isEnough ? styles.chosenGraphColumnEnough : ''}}`}
              style={{ height: height }}
            >
              <b className={styles.choseGraphColumnValue}>{value || ''}</b>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
