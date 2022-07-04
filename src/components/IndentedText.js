import React from 'react';
import { string, node } from 'prop-types';
import { Typography } from '@material-ui/core';

const IndentedText = ({
  title,
  subtitle,
  className,
  ...props
}) => {
  return (
    <div className={className}>
      <Typography {...props}>{title}</Typography>
      <Typography style={{ textIndent: 8 }} {...props}>
        {subtitle}
      </Typography>
    </div>
  );
};

IndentedText.propTypes = {
  title: node,
  subtitle: node,
  className: string,
};

IndentedText.defaultProps = {
  title: '',
  subtitle: '',
  className: '',
};

export default IndentedText;
