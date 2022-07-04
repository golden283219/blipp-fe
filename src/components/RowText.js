import { string, number } from 'prop-types';
import React from 'react';
import { Typography, Grid } from '@material-ui/core';

const RowText = ({
  leftText,
  rightText,
  variant,
  className,
  leftGridSize,
  rightGridSize,
}) => {
  return (
    <Grid container>
      <Grid xs={leftGridSize} item>
        <Typography
          className={className}
          variant={variant}
          align="left"
        >
          {leftText}
        </Typography>
      </Grid>
      <Grid xs={rightGridSize} item>
        <Typography
          className={className}
          variant={variant}
          align="right"
        >
          {rightText}
        </Typography>
      </Grid>
    </Grid>
  );
};

RowText.propTypes = {
  leftText: string,
  rightText: string,
  variant: string,
  className: string,
  leftGridSize: number,
  rightGridSize: number,
};

RowText.defaultProps = {
  leftText: '',
  rightText: '',
  variant: 'body2',
  className: '',
  leftGridSize: 6,
  rightGridSize: 6,
};

export default RowText;
