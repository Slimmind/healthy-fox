export type SwitcherConfigItemType = {
  value: string;
  text: string;
  handler: (value: string) => void;
};

export type SwitcherConfigType = {
  switcherItems: SwitcherConfigItemType[];
};
