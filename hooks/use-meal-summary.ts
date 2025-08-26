import { useEffect, useState } from 'react';

import { initialMealSummary } from '@/constants/harvard-plate';
import { ProductType } from '@/types/common';
import { MeasurementDataType } from '@/types/measurement';

export const useMealSummary = (
  chosenProducts: ProductType[]
): MeasurementDataType => {
  const [summary, setSummary] =
    useState<MeasurementDataType>(initialMealSummary);

  useEffect(() => {
    const calculate = (
      field: 'calories' | 'proteins' | 'fats' | 'portionSize' | 'carbohydrates'
    ) =>
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
