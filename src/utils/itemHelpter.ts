import { Item } from '~types';

export const addQuantityToItem = (
  items: Item[],
  orderedItems: Item[]
) => {
  return items.map(item => {
    const index = orderedItems.findIndex(
      orderedItem => orderedItem.id === item.id
    );
    if (index === -1) return item;
    return {
      ...item,
      quantity: orderedItems[index].quantity,
    };
  });
};
