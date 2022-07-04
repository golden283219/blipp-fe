import React from 'react';
import { Routes } from '../../types/routes';
import { dynamicNavigate } from '../../utils/routeHelper';

const IndexPage = () => {
  dynamicNavigate(Routes.FOOD);

  return <></>;
};

export default IndexPage;
