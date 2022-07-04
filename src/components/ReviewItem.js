import React from 'react';
import {
  Typography,
  Grid,
  ListItem,
} from '@material-ui/core';
import { dateConverter } from '../utils/formatHelper';
import StarRateIcon from '@material-ui/icons/StarRate';
import { string, number } from 'prop-types';

const ReviewItem = ({
  id,
  user,
  rating,
  date,
  comment,
}) => {
  return (
    <ListItem key={id} divider>
      <Grid container direction="column">
        <Grid item container>
          <Grid item xs>
            <Typography variant="body2">{user}</Typography>
          </Grid>
          <Grid item>
            <StarRateIcon fontSize="small" />
          </Grid>
          <Grid item xs={1}>
            <Typography variant="caption">
              {rating}/5
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            {dateConverter(date)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="caption">
            {comment}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
};

ReviewItem.propTypes = {
  id: number.isRequired,
  user: string.isRequired,
  rating: number.isRequired,
  date: number.isRequired,
  comment: string,
};

ReviewItem.defaultProps = {
  comment: '',
};

export default ReviewItem;
