import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import { array } from 'prop-types';

const AllergyDesc = ({ allergies }) => {
  const { t } = useTranslation();
  const allergyNames = allergies.map(allergy =>
    t(allergy.name)
  );
  return (
    <Typography variant="subtitle2">
      {`${t('contains')}: ${allergyNames.join(', ')}`}
    </Typography>
  );
};

AllergyDesc.propTypes = {
  allergies: array.isRequired,
};

export default AllergyDesc;
