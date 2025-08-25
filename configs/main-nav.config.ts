type MainNavLink = {
  name: string;
  link: string;
};

export const mainNavConfig: MainNavLink[] = [
  {
    name: 'Водичька',
    link: '/water-tracker',
  },
  {
    name: 'Дневник питания',
    link: '/food-diary',
  },
  {
    name: 'Здоровые рецепты',
    link: '/healthy-recipes',
  },
  {
    name: 'База знаний',
    link: '/knowledge-base',
  },
];
