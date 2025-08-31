'use client';

import { nanoid } from 'nanoid';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { genRecipeImage } from '@/utils/gen-recipe-image';
import { genRecipeText } from '@/utils/gen-recipe-text';

import { type ProductSetItem, type Recipe } from '../../healthy-recipes.types';

import styles from './healthy-recipes.module.css';

export const HealthyRecipes = () => {
  const [products, setProducts] = useState<ProductSetItem[]>();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe>();
  const [recipeText, setRecipeText] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('productSet');
    const storedRecipes = localStorage.getItem('recipes');
    if (data) {
      setProducts(JSON.parse(data));
    }

    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  useEffect(() => {
    if (!products || products.length === 0) return;

    const generate = async () => {
      setLoading(true);
      try {
        const result = await genRecipeText(products);
        setRecipeText(result.content || '');
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    generate();
  }, [products]);

  useEffect(() => {
    if (!recipeText) return;

    const generate = async () => {
      setLoading(true);
      try {
        const imageUrl = await genRecipeImage(recipeText);

        const stored = localStorage.getItem('recipes');
        const recipes: Recipe[] = stored ? JSON.parse(stored) : [];

        const newRecipeText = {
          id: nanoid(),
          image: imageUrl,
          text: recipeText,
        };

        setCurrentRecipe(newRecipeText);
        const updatedRecipesList = [...recipes, newRecipeText];

        setRecipes(updatedRecipesList);

        localStorage.setItem('recipes', JSON.stringify(updatedRecipesList));
        localStorage.setItem('productSet', '');
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    generate();
  }, [recipeText]);

  const chooseRecipe = (chosenRecipe: Recipe) => {
    setCurrentRecipe(chosenRecipe);
  };

  return (
    <div className={styles['healthy-recipes']}>
      <div className={styles['healthy-recipes__current']}>
        {loading && <p>Генерация рецепта...</p>}

        {currentRecipe && (
          <div className={styles['recipe-text']}>
            <figure
              className={styles['healthy-recipes__current-image']}
              style={{ backgroundImage: `url(${currentRecipe.image})` }}
            >
              <Image
                src={currentRecipe.image}
                alt="Generated recipe"
                width={1024}
                height={1024}
              />
            </figure>
            <ReactMarkdown>{currentRecipe.text}</ReactMarkdown>
          </div>
        )}
      </div>
      <ul className={styles['healthy-recipes__list']}>
        {recipes &&
          recipes.map((recipe: Recipe) => (
            <li
              key={recipe.id}
              className={styles['healthy-recipes__list-item']}
              onClick={() => chooseRecipe(recipe)}
            >
              <Image
                src={recipe.image}
                alt="Generated recipe"
                width={240}
                height={240}
                className={styles['healthy-recipes__list-item-image']}
              />
              <div className={styles['healthy-recipes__list-item-text']}>
                <ReactMarkdown>{recipe.text}</ReactMarkdown>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};
