import { Nutrient, ProductType } from '@/types/common';

export function recalculateProductCharacteristics(product: ProductType) {
  const calories = (product.calories / product.unitValue) * product.portionSize;
  const proteins = (product.proteins / product.unitValue) * product.portionSize;
  const fats = (product.fats / product.unitValue) * product.portionSize;
  const carbohydrates =
    (product.carbohydrates / product.unitValue) * product.portionSize;
  const fiber = (product.fiber / product.unitValue) * product.portionSize;
  const sugars = (product.sugars / product.unitValue) * product.portionSize;
  const sodium = (product.sodium / product.unitValue) * product.portionSize;
  const cholesterol =
    (product.cholesterol / product.unitValue) * product.portionSize;
  const glycemicIndex =
    (product.glycemicIndex / product.unitValue) * product.portionSize;
  const vitamins = product.vitamins.map((item: Nutrient) => {
    const [key, value] = Object.entries(item)[0] as [string, number];
    return { [key]: (value / product.unitValue) * product.portionSize };
  });
  const minerals = product.minerals.map((item: Nutrient) => {
    const [key, value] = Object.entries(item)[0] as [string, number];
    return { [key]: (value / product.unitValue) * product.portionSize };
  });

  return {
    ...product,
    calories,
    proteins,
    fats,
    carbohydrates,
    fiber,
    sugars,
    sodium,
    cholesterol,
    glycemicIndex,
    vitamins,
    minerals,
  };
}
