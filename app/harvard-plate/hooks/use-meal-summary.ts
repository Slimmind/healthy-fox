import { useEffect, useState } from 'react';

import { initialProductSummary } from '../harvard-plate.constants';
import {
  type Product,
  type NutritionField,
  type MeasurementDataType,
} from '../harvard-plate.types';

export const useProductSummary = (
  chosenProducts: Product[]
): MeasurementDataType => {
  const [summary, setSummary] = useState<MeasurementDataType>(
    initialProductSummary
  );

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
