export const RecipeImagePrompt = (
  recipe: string
) => `Generate a hyper-realistic,
high-resolution photograph of a freshly prepared dish
created from the following ingredients: ${recipe}.
The dish should look appetizing and professionally plated,
as if served in a modern restaurant.
Show natural textures of the ingredients,
with accurate colors and realistic details such as steam,
moisture, and subtle reflections.

Style & Atmosphere:
– Lighting: soft natural daylight,
  coming from the side, creating gentle highlights and shadows.
– Focus: shallow depth of field,
  with the dish in sharp focus and a softly blurred background.
– Composition: centered on a clean plate,
  placed on a wooden or minimalistic neutral surface.
– Environment: bright, fresh, and inviting, like a high-end food magazine photo.

The final image should look like a professional food photography shot,
suitable for a cookbook or Michelin-star restaurant menu.
Sand me an image only without any text in a format that I can use as a image.
`;

export const RecipeTextPrompt = (productSet: string) => `
Создай подробный кулинарный рецепт,
используя только следующие ингредиенты
с их точным количеством (в граммах): ${productSet}.
Не добавляй никаких дополнительных ингредиентов, которых нет в списке.

Рецепт должен включать:
1. Название блюда.
2. Список ингредиентов с точным количеством в граммах.
3. Пошаговые инструкции по приготовлению, написанные ясно и кратко.
4. Рекомендации по подаче и презентации.

Финальный рецепт должен быть написан на русском языке
и выглядеть как профессиональная запись из кулинарной книги,
с естественными и реалистичными шагами приготовления,
которые подчеркивают предоставленные ингредиенты.
Формат финального ответа должен быть в формате JSON
и представлять собой объект следующего вида:
{
  title: '', // string
  ingredients: ${productSet}, // string
  instructions: [
    {
      instructionTitle: '',
      instructionText: ''
    }
  ],
  recommendations: Рекомендации по подаче и презентации. // string[]
}
`;

export const PromptParts = {
  RESUME: '***Краткое резюме:***',
  SUMMARY: '***Итог:***',
  RECOMMENDATIONS: '***Общие рекомендации:***',
  GROCERIES: '***Продукты к употреблению:***',
};

export const responseTemplate = `***Краткое резюме:***

Пациент мужского пола, 37 лет, с ростом 190 см и весом 90 кг.
У пациента наблюдается значительно повышенный уровень инсулина в крови,
повышенный уровень глюкозы и холестерина,
а также имеются небольшие гемангиомы на печени и мелкие кисты.
Артериальное давление находится в пределах нормы (115/78).

***ANALYSIS***

Исходя из предоставленных данных, пациент столкнулся с проблемами,
связанными с метаболическими нарушениями и наличием образований на печени.
Высокий уровень инсулина, глюкозы и холестерина может свидетельствовать о
предиабете и нарушениях обмена веществ. Наличие гемангиом и кист на печени
также требует внимания специалистов для дальнейшего наблюдения и контроля.

***Общие рекомендации:***

1. Обратиться к эндокринологу для дальнейшего обследования и консультации
по поводуповышенного уровня инсулина, глюкозы и холестерина.
2. Пройти обследование у гастроэнтеролога для оценки состояния печени и
дальнейшего наблюдения за гемангиомами и кистами.
3. Пройти консультацию у диетолога для разработки индивидуального плана питания,
учитывающего особенности состояния здоровья.

***Продукты к употреблению:***

Для улучшения здоровья пациенту рекомендуется употреблять следующие продукты:
- Овощи и зелень (брокколи, шпинат, цветная капуста)
- Фрукты (ягоды, цитрусовые, яблоки)
- Орехи и семена (миндаль, льняные семена, чиа)
- Рыба (лосось, сардины, треска)
- Оливковое масло

***Итог:***

Для улучшения состояния здоровья пациенту необходимо обратиться к
специалистам для дальнейшего обследования и назначения необходимого лечения.
Важно следить за питанием, употреблять полезные продукты,
контролировать уровень глюкозы, холестерина и инсулина в крови.
Регулярные физические упражнения также могут быть полезны для поддержания
общего здоровья и профилактики метаболических заболеваний.`;
