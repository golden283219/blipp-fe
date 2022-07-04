import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  makeStyles,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import OrderTimeDialog from './OrderTimeDialog';
import { DeliveryType } from '~types';
import { toTimeFormat } from '~utils/formatHelper';

interface OrderTimeButtonProps {
  preparationTime: number;
  onPrepTimeChange: (time: string) => void;
  deliveryType: string;
}

const useStyles = makeStyles({
  subTitle: {
    textTransform: 'lowercase',
    color: 'grey',
    fontWeight: 'normal',
  },
});

const OrderTimeButton: React.FC<OrderTimeButtonProps> = ({
  preparationTime,
  onPrepTimeChange,
  deliveryType,
}) => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState<boolean>(
    false
  );
  const classes = useStyles();
  const [buttonTitle, setButtonTitle] = useState<string>(
    ''
  );
  const [buttonSubTitle, setButtonSubTitle] = useState<
    string
  >('');

  useEffect(() => {
    let prefix =
      deliveryType === DeliveryType.DELIVERY
        ? t('DeliveryTime')
        : t('TakeawayTime');
    setButtonTitle(
      `${prefix} ${toTimeFormat(preparationTime)}`
    );
    setButtonSubTitle(t('ChangeTime'));
  }, [setButtonTitle, setButtonSubTitle, preparationTime]);

  const toggleDialog = () => {
    setModalOpen(!modalOpen);
  };

  const handlePrepTimeSubmit = (time: string) => {
    setModalOpen(!modalOpen);
    onPrepTimeChange(time);
  };

  return (
    <>
      <Box marginTop={5} marginBottom={2}>
        <Button
          fullWidth={true}
          variant="outlined"
          color="primary"
          onClick={toggleDialog}
        >
          <Grid
            container
            direction="column"
            justify="center"
          >
            <Grid item>{buttonTitle}</Grid>
            <Grid item>
              <span className={classes.subTitle}>
                {buttonSubTitle}
              </span>
            </Grid>
          </Grid>
        </Button>
      </Box>
      <OrderTimeDialog
        isOpen={modalOpen}
        preparationTime={preparationTime}
        onSubmit={handlePrepTimeSubmit}
        onClose={toggleDialog}
      />
    </>
  );
};

export default OrderTimeButton;
