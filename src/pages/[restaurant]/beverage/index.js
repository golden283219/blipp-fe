import { Container } from '@material-ui/core';
import React from 'react';
// import HeroBanner from '../components/HeroBanner';
import { useTranslation } from 'react-i18next';
import { ItemCategory } from '~types';
import BaseCategories from '../../../components/BaseCategories';
import SEO from '../../../components/seo';
import { Routes } from '../../../types/routes';
import { dynamicNavigate } from '../../../utils/routeHelper';

const BeveragePage = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <SEO title={t('Beverage')} />
      <BaseCategories
        categoryType={ItemCategory.DRINK}
        path={dynamicNavigate(Routes.BEVERAGE)}
        route={dynamicNavigate(Routes.BEVERAGE)}
      />
    </Container>
  );
};

export default BeveragePage;
