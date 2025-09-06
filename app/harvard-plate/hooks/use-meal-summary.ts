import { useEffect, useState } from 'react';

import { initialMealSummary } from '../harvard-plate.constants';
import {
  type Product,
  type NutritionField,
  type MeasurementDataType,
} from '../harvard-plate.types';

export const useMealSummary = (
  chosenProducts: Product[]
): MeasurementDataType => {
  const [summary, setSummary] =
    useState<MeasurementDataType>(initialMealSummary);

  useEffect(() => {
    const calculate = (field: NutritionField) =>
      Math.round(
        chosenProducts.reduce(
          (acc, product) =>
            acc +
            ((product[field] || 0) / product.unitValue) * product.portionSize,
          0
        )
      );

    setSummary({
      calories: calculate('calories'),
      proteins: calculate('proteins'),
      fats: calculate('fats'),
      carbohydrates: calculate('carbohydrates'),
    });
  }, [chosenProducts]);

  return summary;
};
