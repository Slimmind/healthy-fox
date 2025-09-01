import { Product } from '@/types/common';

export function recalculateProductCharacteristics(product: Product) {
  if (product.portionSize === product.unitValue) {
    return product;
  }

  const ratio = product.portionSize / product.unitValue;

  const calories = product.calories * ratio;
  const proteins = product.proteins * ratio;
  const fats = product.fats * ratio;
  const carbohydrates = product.carbohydrates * ratio;
  const fiber = product.fiber * ratio;
  const sugars = product.sugars * ratio;
  const sodium = product.sodium * ratio;
  const cholesterol = product.cholesterol * ratio;

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
