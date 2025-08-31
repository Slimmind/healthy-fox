export type ProductSetItem = {
  id: string;
  name: string;
  quantity: number;
};

export type Recipe = {
  id: string;
  image: string;
  text: string;
};

export type RecipePart = {
  [key: string]: number;
};
