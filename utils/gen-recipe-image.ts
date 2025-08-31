import OpenAI from 'openai';

import { RecipeImagePrompt } from '@/constants/prompts';

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.NEXT_PUBLIC_RECIPE_IMAGE_API_KEY,
  dangerouslyAllowBrowser: true,
});

interface GeminiMessage {
  role: string;
  content: string;
  images?: { type: 'image_url'; image_url: { url: string }; index: number }[];
}

export async function genRecipeImage(recipe: string): Promise<string> {
  try {
    const prompt = RecipeImagePrompt(recipe);

    const completion = await client.chat.completions.create({
      model: 'google/gemini-2.0-flash-exp:free',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const message = completion.choices[0].message as GeminiMessage;

    if (!message.images || message.images.length === 0) {
      throw new Error('No image returned from OpenAI');
    }

    const imageUrl = message.images[0].image_url?.url;

    if (!imageUrl) {
      throw new Error('No image URL found in response');
    }

    return imageUrl;
  } catch (err) {
    console.error('Error generating image:', err);
    throw err;
  }
}
