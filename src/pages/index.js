import { Container } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import LoadingIndicator from '../components/LoadingIndicator';
import SEO from '../components/seo';

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <SEO title={t('Food')} />
      <LoadingIndicator />
    </Container>
  );
};

export default IndexPage;
