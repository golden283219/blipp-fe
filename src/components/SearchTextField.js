import { string, func } from 'prop-types';
import React from 'react';
import {
  InputAdornment,
  TextField,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import FilterListIcon from '@material-ui/icons/FilterList';

const SearchTextField = ({
  value,
  onDeleteClick,
  onFilterClick,
  ...props
}) => {
  const iconSize = 'small';

  return (
    <TextField
      value={value}
      {...props}
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon
              fontSize={iconSize}
              color="primary"
            />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {value && (
              <CloseIcon
                fontSize={iconSize}
                color="error"
                onClick={onDeleteClick}
              />
            ) /* : (
              <FilterListIcon
                fontSize={iconSize}
                color="primary"
                onClick={onFilterClick}
              />
            ) */}
          </InputAdornment>
        ),
      }}
    />
  );
};

SearchTextField.propTypes = {
  value: string,
  onDeleteClick: func,
  onFilterClick: func,
};

SearchTextField.defaultProps = {
  value: '',
  onDeleteClick: undefined,
  onFilterClick: undefined,
};

export default SearchTextField;
