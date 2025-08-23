import { ProductType } from '@/types/common';

export function recalculateProductCharacteristics(product: ProductType) {
  const ratio = product.portionSize / product.unitValue;

  const calories = (product.calories * ratio).toFixed(1);
  const proteins = (product.proteins * ratio).toFixed(1);
  const fats = (product.fats * ratio).toFixed(1);
  const carbohydrates = (product.carbohydrates * ratio).toFixed(1);
  const fiber = (product.fiber * ratio).toFixed(1);
  const sugars = (product.sugars * ratio).toFixed(1);
  const sodium = (product.sodium * ratio).toFixed(1);
  const cholesterol = (product.cholesterol * ratio).toFixed(1);

  const vitamins = product.vitamins.map((item) => ({
    name: item.name,
    value: item.value * ratio,
  }));

  const minerals = product.minerals.map((item) => ({
    name: item.name,
    value: item.value * ratio,
  }));

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
    vitamins,
    minerals,
  };
}
