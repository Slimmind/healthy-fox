import { ProductType } from '@/utils/constants';
import { filterProducts } from '@/utils/filter-products';

export const createSwitcherConfig = (
	products: ProductType[],
	setMealsList: (products: ProductType[]) => void
) => ({
	switcherItems: [
		{
			value: 'breakfast',
			text: 'Завтрак',
			handler: () => filterProducts('breakfast', products, setMealsList),
		},
		{
			value: 'lunch',
			text: 'Обед',
			handler: () => filterProducts('lunch', products, setMealsList),
		},
		{
			value: 'dinner',
			text: 'Ужин',
			handler: () => filterProducts('dinner', products, setMealsList),
		},
		{
			value: 'drink',
			text: 'Напиток',
			handler: () => filterProducts('drink', products, setMealsList),
		},
	],
});
