import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import { ErrorMessage, Field } from 'formik';

export const FormTextField = props => (
  <>
    <Field
      as={TextField}
      fullWidth
      variant="outlined"
      size="small"
      {...props}
    />
    <ErrorMessage
      name={props.name}
      render={msg => (
        <Typography variant="caption" color="primary">
          {msg}
        </Typography>
      )}
    />
  </>
);

export default FormTextField;
