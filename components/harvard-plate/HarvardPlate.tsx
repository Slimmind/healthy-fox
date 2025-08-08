'use client';

import { useEffect, useState } from 'react';
import { ProductType, MeasurementDataType } from '@/utils/constants';
import Button from '../button';
import Sidebar from '../sidebar';
import Measurement from '../measurement';
import PlateRoundel from '../plate-roundel';
import styles from './harvard-plate.module.css';

import meals from '@/meals.json';

const initialMealSummary = {
	calories: 0,
	proteins: 0,
	fats: 0,
	carbohydrates: 0,
};

const mockUserData = {
	calories: 2000,
	proteins: 240,
	fats: 180,
	carbohydrates: 100,
};

export const HarvardPlate = () => {
	const [mealsList, setMealsList] = useState<ProductType[]>([]);
	const [currenProduct, setCurrenProduct] = useState<ProductType | null>(null);
	const [chosenProducts, setChosenProducts] = useState<ProductType[]>([]);
	const [mealSummary, setMealSummary] =
		useState<MeasurementDataType>(initialMealSummary);

	const filterMeals = (mealTime: string): void => {
		const filteredMeals = meals.filter(
			(meal) =>
				(meal.mealTimes.includes(mealTime) && meal.category === 'food') ||
				meal.category.includes(mealTime)
		);
		setMealsList(filteredMeals);
	};

	const currentProductClickHandler = (product: ProductType): void => {
		setCurrenProduct(product);
		setChosenProducts([...chosenProducts, product]);
	};

	useEffect(() => {
		const totalCalories = Math.round(
			chosenProducts.reduce((acc, product) => acc + product.calories, 0)
		);
		const totalProteins = Math.round(
			chosenProducts.reduce((acc, product) => acc + product.proteins, 0)
		);
		const totalFats = Math.round(
			chosenProducts.reduce((acc, product) => acc + product.fats, 0)
		);
		const totalCarbohydrates = Math.round(
			chosenProducts.reduce((acc, product) => acc + product.carbohydrates, 0)
		);

		setMealSummary({
			calories: totalCalories,
			proteins: totalProteins,
			fats: totalFats,
			carbohydrates: totalCarbohydrates,
		});
	}, [chosenProducts]);

	return (
		<div className={styles.plate}>
			<Sidebar title='Продукты' mods='left'>
				<ul className={styles.mealsList}>
					{mealsList.map((meal: ProductType) => (
						<li
							key={meal.id}
							onClick={() => currentProductClickHandler(meal)}
							className={styles.meal}
						>
							{meal.name}
						</li>
					))}
				</ul>
				<div className={styles.myChoice}>
					<h4 className={styles.myChoiceTitle}>Мой выбор:</h4>
					<ul className={styles.chosenProductsList}>
						{chosenProducts.map((product) => (
							<li key={product.id} className={styles.chosenProduct}>
								{product.name}
							</li>
						))}
					</ul>
				</div>
			</Sidebar>
			<nav className={styles.plate__switcher}>
				<Button onClick={() => filterMeals('breakfast')}>Завтрак</Button>
				<Button onClick={() => filterMeals('lunch')}>Обед</Button>
				<Button onClick={() => filterMeals('dinner')}>Ужин</Button>
				<Button onClick={() => filterMeals('drink')}>Напиток</Button>
			</nav>
			<PlateRoundel />
			<Measurement userValues={mockUserData} chosenValues={mealSummary} />
			{/* <div className={styles.measurement}>
				<p>
					<b>Калории:</b> {mealSummary?.calories} <em>ккал.</em>
				</p>
				<p>
					<b>Белки:</b> {mealSummary?.proteins} <em>г.</em>
				</p>
				<p>
					<b>Жири:</b> {mealSummary?.fats} <em>г.</em>
				</p>
				<p>
					<b>Углеводы:</b> {mealSummary?.carbohydrates} <em>г.</em>
				</p>
			</div> */}
			<Sidebar title='Характеристики' mods='right'>
				{currenProduct && (
					<>
						<p className={styles.characteristicTitle}>
							<strong>
								<em>{currenProduct.name}</em>
							</strong>
						</p>
						<p className={styles.characteristic}>
							<strong>Калорийность:</strong> {currenProduct.calories} ккал{' '}
							{currenProduct.unit}
						</p>
						<p className={styles.characteristic}>
							<strong>Белки:</strong> {currenProduct.proteins} г.
						</p>
						<p className={styles.characteristic}>
							<strong>Жиры:</strong> {currenProduct.fats} г.
						</p>
						<p className={styles.characteristic}>
							<strong>Углеводы:</strong> {currenProduct.carbohydrates} г.
						</p>
						<p className={styles.characteristic}>{currenProduct.description}</p>
						<p className={styles.characteristic}>{currenProduct.storage}</p>
					</>
				)}
			</Sidebar>
		</div>
	);
};
