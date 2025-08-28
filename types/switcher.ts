export type SwitcherConfigItemType = {
  value: string;
  text: string;
  switchHandler: (value: string) => void;
};

export type SwitcherConfigType = SwitcherConfigItemType[];
