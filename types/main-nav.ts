import { ROUTES } from '@/constants/routes';

export type MainNavRoute = (typeof ROUTES)[keyof typeof ROUTES];

export type MainNavLink = {
  text: string;
  url: MainNavRoute;
};
