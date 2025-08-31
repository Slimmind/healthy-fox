import OpenAI from 'openai';

import { ProductSetItem } from '@/app/healthy-recipes/healthy-recipes.types';
import { RecipeTextPrompt } from '@/constants/prompts';

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.NEXT_PUBLIC_RECIPE_TEXT_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function genRecipeText(productSet: ProductSetItem[]) {
  const products = productSet
    .map(
      (productSetItem: ProductSetItem) =>
        `${productSetItem.name} - ${productSetItem.quantity} грамм`
    )
    .join(', ');

  const completion = await client.chat.completions.create({
    model: 'deepseek/deepseek-chat-v3.1:free',
    messages: [
      {
        role: 'user',
        content: RecipeTextPrompt(products),
      },
    ],
  });

  const recipe = completion.choices[0].message;

  console.log('RECIPE: ', recipe);

  return recipe;
}
