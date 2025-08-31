import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

import { type Recipe } from '../../healthy-recipes.types';

import styles from './main-recipe.module.css';

type MainRecipeProps = {
  data: Recipe;
};

export const MainRecipe = ({ data }: MainRecipeProps) => {
  return (
    <div className={styles['healthy-recipes__current']}>
      {data && (
        <div className={styles['recipe-text']}>
          <figure
            className={styles['healthy-recipes__current-image']}
            style={{ backgroundImage: `url(${data.image})` }}
          >
            <Image
              src={data.image}
              alt="Generated recipe"
              width={1024}
              height={1024}
            />
          </figure>
          <ReactMarkdown>{data.text}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};
