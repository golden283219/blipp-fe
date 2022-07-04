export const ItemCategory = {
  FOOD: 'FOOD',
  DRINK: 'DRINK',
};

export enum CategoryTypes {
  'FOOD',
  'DRINK',
}

export type CategoryStructure = {
  category: CategoryTypes;
  id: number;
  name: string;
  subCategoryIds: number[] | [];
};
