import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { func, number } from 'prop-types';

const AddSubtract = ({ quantity, onChange }) => {
  const [amount, setAmount] = useState(quantity);

  const handleAdd = () => {
    setAmount(amount + 1);
    onChange(amount + 1);
  };
  const handleSubtract = () => {
    setAmount(amount - 1);
    onChange(amount - 1);
  };
  return (
    <Box display="flex" alignItems="center">
      <IconButton
        onClick={handleSubtract}
        color="primary"
        disabled={amount === 0}
      >
        <RemoveIcon />
      </IconButton>
      <Typography>{amount}</Typography>
      <IconButton onClick={handleAdd} color="primary">
        <AddIcon />
      </IconButton>
    </Box>
  );
};

AddSubtract.propTypes = {
  onChange: func.isRequired,
  quantity: number,
};

AddSubtract.defaultProps = {
  quantity: 1,
};

export default AddSubtract;
