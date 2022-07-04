import { Container } from '@material-ui/core';
import React from 'react';
// import HeroBanner from '../components/HeroBanner';
import { useTranslation } from 'react-i18next';
import { ItemCategory } from '~types';
import BaseCategories from '../../../components/BaseCategories';
import SEO from '../../../components/seo';
import { Routes } from '../../../types/routes';
import { dynamicPath } from '../../../utils/routeHelper';

const FoodPage = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <SEO title={t('Food')} />
      <BaseCategories
        categoryType={ItemCategory.FOOD}
        path={dynamicPath(Routes.FOOD)}
        route={dynamicPath(Routes.FOOD)}
      />
    </Container>
  );
};

export default FoodPage;
