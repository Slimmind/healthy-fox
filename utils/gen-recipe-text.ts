import OpenAI from 'openai';

import { RecipeTextPrompt } from '@/constants/prompts';
import { ProductSetItem } from '@/types/common';

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
    model: 'openai/gpt-oss-120b:free',
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
