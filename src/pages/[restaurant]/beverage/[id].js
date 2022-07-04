import { Container } from '@material-ui/core';
import React from 'react';
// import HeroBanner from '../components/HeroBanner';
import { useTranslation } from 'react-i18next';
import { ItemCategory } from '~types';
import SEO from '../../../components/seo';
import SubCategory from '../../../components/SubCategory';

const SubCategoriesBeverages = ({ location }) => {
  const id = location.pathname.substr(-1, 1);
  const { t } = useTranslation();

  return (
    <Container>
      <SEO title={t('Food')} />
      <SubCategory
        categoryType={ItemCategory.FOOD}
        id={id}
      />
    </Container>
  );
};

export default SubCategoriesBeverages;
