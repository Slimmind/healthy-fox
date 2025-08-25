type MainNavLink = {
  text: string;
  url: string;
};

export const mainNavConfig: MainNavLink[] = [
  {
    text: 'Тарелочька',
    url: '/harvard-plate',
  },
  {
    text: 'Водичька',
    url: '/water-tracker',
  },
  {
    text: 'Дневник питания',
    url: '/food-diary',
  },
  {
    text: 'Здоровые рецепты',
    url: '/healthy-recipes',
  },
  {
    text: 'База знаний',
    url: '/knowledge-base',
  },
];
