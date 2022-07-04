import React from 'react';
import {
  ListItem,
  Typography,
  CardContent,
  TextField,
  Button,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import DefaultCard from './DefaultCard';
import { func } from 'prop-types';

const useStyles = makeStyles(() => ({
  topContainer: {
    width: '100%',
    height: '100%',
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: 16,
  },
  contentHeight: {
    height: 40,
  },
  bottomContainer: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

const PromoContainer = ({ onSubmit }) => {
  const styles = useStyles();
  const { t } = useTranslation();
  return (
    <>
      <DefaultCard style={{ marginTop: 10 }}>
        <CardContent>
          <ListItem className={styles.topContainer} dense>
            <Typography
              variant="body2"
              className={styles.promoCodeLabel}
            >
              {t('PromoCodeDesc')}
            </Typography>
          </ListItem>
          <ListItem
            dense
            className={styles.bottomContainer}
          >
            <Grid
              container
              spacing={1}
              alignItems="flex-start"
            >
              <Grid item xs={9}>
                <TextField
                  label={t('PromoCode')}
                  variant="outlined"
                  size="small"
                  className={styles.contentHeight}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={onSubmit}
                  fullWidth
                  className={styles.contentHeight}
                >
                  {t('Submit')}
                </Button>
              </Grid>
            </Grid>
          </ListItem>
        </CardContent>
      </DefaultCard>
    </>
  );
};

PromoContainer.propTypes = {
  onSubmit: func,
};

PromoContainer.defaultProps = {
  onSubmit: null,
};

export default PromoContainer;
