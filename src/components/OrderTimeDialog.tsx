import {
  Dialog,
  Box,
  Button,
  makeStyles,
  DialogActions,
  Typography,
} from '@material-ui/core';
import {
  ErrorMessage,
  Formik,
  FormikHelpers,
} from 'formik';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toTimeFormat } from '~utils/formatHelper';
import { OrderTimeSchema } from '~utils/validationSchemas';

interface IOrderTimeDialogProps {
  isOpen: boolean;
  onSubmit: (time: string) => void;
  preparationTime: number;
  onClose: () => void;
}

const useStyles = makeStyles({
  timeInput: {
    width: '100%',
  },
  paper: { width: '70%', padding: '24px' },
});

const OrderTimeDialog: React.FC<IOrderTimeDialogProps> = ({
  isOpen,
  preparationTime,
  onSubmit,
  onClose,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  const [time, setTime] = useState('');
  const [minTime, setMinTime] = useState('');
  // Todo: add a real maxTime
  const maxTime = '20:00';

  useEffect(() => {
    if (minTime === '' && preparationTime) {
      setMinTime(toTimeFormat(preparationTime));
    }
  }, [preparationTime, minTime]);

  useEffect(() => {
    setTime(toTimeFormat(preparationTime));
  }, [preparationTime]);

  const handleSubmit = (
    values: { time: string },
    actions: FormikHelpers<{ time: string }>
  ) => {
    onSubmit(values.time);
    actions.setSubmitting(false);
  };
  return (
    <Box>
      <Dialog
        open={isOpen}
        classes={{ paper: styles.paper }}
      >
        <Typography variant="body1">
          {t('ChooseOrderTime')}
        </Typography>
        <Formik
          initialValues={{ time }}
          validationSchema={OrderTimeSchema(
            minTime,
            maxTime
          )}
          onSubmit={handleSubmit}
        >
          {props => (
            <form onSubmit={props.handleSubmit} noValidate>
              <Box marginY={3}>
                <input
                  className={styles.timeInput}
                  name="time"
                  type="time"
                  value={props.values.time}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
                <ErrorMessage
                  name="time"
                  render={msg => (
                    <Typography
                      variant="caption"
                      color="primary"
                    >
                      {msg}
                    </Typography>
                  )}
                />
              </Box>
              <DialogActions>
                <Button onClick={onClose} variant="text">
                  {`${t('Close')}`}
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                >{`${t('Done')}`}</Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </Box>
  );
};

export default OrderTimeDialog;
