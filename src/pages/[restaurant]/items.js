import { useQuery } from '@apollo/client';
import { array, shape, string } from 'prop-types';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { addQuantityToItem } from '~utils/itemHelpter';
import ItemList from '../../components/ItemList';
import SEO from '../../components/seo';
import AppContext from '../../contexts/AppContext';
import { GET_ITEMS_BY_SUBCATEGORY } from '../../graphql/queries';

const SubCategoryPage = ({ location }) => {
  const {
    state: {
      items: { localItems },
    },
  } = useContext(AppContext);

  const pathQuery = location.search.replace('?id=', '');
  const subcategoryId = Number(pathQuery);
  const { t } = useTranslation();

  const { data: itemsData, loading } = useQuery(
    GET_ITEMS_BY_SUBCATEGORY,
    {
      variables: { subcategoryId: subcategoryId },
    }
  );

  if (loading) return null;

  let items = itemsData?.itemSubcategoryItems ?? [];

  if (localItems && items.length > 0) {
    items = addQuantityToItem(items, localItems);
  }
  return (
    <>
      <SEO title={t('Subcategory')} />
      <ItemList items={items} />
    </>
  );
};

SubCategoryPage.propTypes = {
  location: shape({
    search: string,
  }),
  order: array,
};

SubCategoryPage.defaultProps = {
  location: { search: '' },
  order: [],
};

export default SubCategoryPage;
