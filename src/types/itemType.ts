export type Item = {
  __typename?: string;
  id: number;
  name: string;
  price?: number;
  description?: string;
  diet?: string;
  imageUrl?: string;
  upSellIds?: number[] | [];
  quantity?: number;
};

export type ItemVariants = {
  id: number;
  isMultiSelect: boolean;
  isRequired: boolean;
  name: string;
  itemVariantOptions: Option[];
};

export type Option = {
  id: number;
  name: string;
  price: number;
};

export type Allergy = {
  checked?: boolean;
  id: number;
  name: string;
  removable: boolean;
};

export type CrossSellItemType = {
  description: string;
  diet?: string;
  id: number;
  itemVariants: ItemVariants[];
  name: string;
  price: number;
  productGroup: { name: string };
  productGroupId: number;
  upSellIds: number[];
};

export type Values = {
  allergies: Allergy[];
  description: string;
  diet?: string;
  specialRequest: string;
  name: string;
  price: number;
  totalPrice: number;
  quantity: number;
  productGroup: { name: string };
  productGroupId: number;
  variants: { [key: string]: ItemVariants };
};
