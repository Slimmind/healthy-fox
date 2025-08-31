import { ROUTES } from '@/constants/routes';
import { type MainNavLink } from '@/types/main-nav';

export const mainNavConfig: MainNavLink[] = [
  {
    text: 'Тарелочька',
    url: ROUTES.HARVARD_PLATE,
  },
  {
    text: 'Водичька',
    url: ROUTES.WATER_TRACKER,
  },
  {
    text: 'Дневник питания',
    url: ROUTES.FOOD_DIARY,
  },
  {
    text: 'Здоровые рецепты',
    url: ROUTES.HEALTHY_RECIPES,
  },
  {
    text: 'База знаний',
    url: ROUTES.KNOWLEDGE_BASE,
  },
  {
    text: 'Анкета',
    url: ROUTES.QUESTIONNAIRE,
  },
];
