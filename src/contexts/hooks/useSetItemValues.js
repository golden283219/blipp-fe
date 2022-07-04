import { useState, useEffect } from 'react';
export const useSetItemValues = (
  selectedProduct,
  variants,
  allergy,
  quantity,
  setVariantStartValue
) => {
  const [values, setValues] = useState(null);

  useEffect(() => {
    const {
      name,
      description,
      id,
      diet,
      price,
      productGroupId,
      productGroup,
      spicy,
    } = selectedProduct;

    let obj = {};
    let allergies = [];
    let checked = false;
    let startingPrice = price;
    if (variants) {
      variants.forEach(variant => {
        obj[variant.name] = {};
        const options = variant.itemVariantOptions.map(
          (option, i) => {
            const setFirstVariantOption =
              setVariantStartValue &&
              variant?.isRequired &&
              i === 0;
            if (setFirstVariantOption) {
              startingPrice += option.price;
            }
            return {
              ...option,
              checked: setFirstVariantOption
                ? true
                : checked,
            };
          }
        );
        obj[variant.name] = { ...variant, options };
      });
    }

    if (allergies) {
      allergies = allergy.filter(option => {
        return { ...option, checked };
      });
    }

    setValues({
      name,
      description,
      id,
      diet,
      quantity,
      specialRequest: '',
      productGroupId,
      productGroup,
      price,
      totalPrice: startingPrice,
      allergies,
      spicy,
      variants: obj,
    });
  }, [selectedProduct, variants, allergy]);
  return [values, setValues];
};
