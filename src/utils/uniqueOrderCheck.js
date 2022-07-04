const variantIsEqual = (a, b) => {
  return !a.some(
    (el, i) => JSON.stringify(el) !== JSON.stringify(b[i])
  );
};

const orderIsEqual = (product, existingOrder) => {
  if (existingOrder.id !== product.id) {
    return false;
  }

  if (Object.keys(product.variants).length === 0) {
    return true;
  }

  return !Object.keys(product.variants).some(
    variant =>
      !variantIsEqual(
        product.variants[variant].options,
        existingOrder.variants[variant].options
      )
  );
};

export const getExistingItem = (localItems, product) => {
  return localItems.find(item =>
    orderIsEqual(product, item)
  );
};
