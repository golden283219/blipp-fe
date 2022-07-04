import {
  Card,
  Container,
  Divider,
  Grid,
} from '@material-ui/core';
import { RoomService } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { func, string } from 'prop-types';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeliveryType } from '~types';
import AppContext from '../contexts/AppContext';
import ActionDialog from './ActionDialog';
import SearchTextField from './SearchTextField';

const useStyles = makeStyles(() => ({
  container: {
    zIndex: 999,
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
    height: 50,
  },
  card: {
    borderRadius: 12,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
}));

const Header = ({
  value,
  onChange,
  onDeleteClick,
  onCallRoomService,
  deliveryType,
}) => {
  const { tableId } = useContext(AppContext);
  const styles = useStyles();
  const { t } = useTranslation();

  const [
    showConfirmDialog,
    setShowConfirmDialog,
  ] = useState(false);

  const toggleConfirmDialog = () =>
    setShowConfirmDialog(!showConfirmDialog);

  const ConfirmDialog = () => (
    <ActionDialog
      open={showConfirmDialog}
      title={t('ServiceCall')}
      description={t('ServiceCallDesc')}
      firstActionText={t('No')}
      secondActionText={t('Yes')}
      handleFirstAction={toggleConfirmDialog}
      handleSecondAction={() => {
        onCallRoomService(tableId);
        toggleConfirmDialog();
      }}
      onBackdropClick={toggleConfirmDialog}
    />
  );
  return (
    <Container className={styles.container}>
      <Card className={styles.card} raised elevation={5}>
        <ConfirmDialog />
        <Grid
          container
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item xs={10}>
            <SearchTextField
              fullWidth
              onDeleteClick={onDeleteClick}
              placeholder={t('SearchPlaceholder')}
              onChange={onChange}
              value={value}
            />
          </Grid>
          {deliveryType === DeliveryType.RESERVATION &&
            tableId && (
              <>
                <Divider
                  light
                  orientation="vertical"
                  flexItem
                />
                <Grid item xs="auto">
                  <RoomService
                    color="primary"
                    onClick={toggleConfirmDialog}
                    cursor="pointer"
                  />
                </Grid>
              </>
            )}
        </Grid>
      </Card>
    </Container>
  );
};

Header.propTypes = {
  value: string,
  onChange: func,
  onDeleteClick: func,
  onCallRoomService: func,
  deliveryType: string,
};

Header.defaultProps = {
  value: '',
  onChange: () => {},
  onDeleteClick: () => {},
  onCallRoomService: () => {},
};

export default Header;
