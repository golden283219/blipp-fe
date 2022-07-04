import React from 'react';
import { string } from 'prop-types';

const NoContentView = ({ title }) => {
  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>{title}</p>
    </div>
  );
};

NoContentView.propTypes = {
  title: string.isRequired,
};
export default NoContentView;
