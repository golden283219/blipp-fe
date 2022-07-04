import React, { SyntheticEvent } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {
  AlertProps,
  Color,
} from '@material-ui/lab/Alert';

interface PaymentSnackbarProps {
  open: boolean;
  message: string;
  type: Color;
  handleClose: (
    event?: SyntheticEvent,
    reason?: string
  ) => void;
  handleOnClick?: () => void;
}

function Alert(props: AlertProps) {
  return (
    <MuiAlert elevation={6} variant="filled" {...props} />
  );
}

const PaymentSnackbar: React.FC<PaymentSnackbarProps> = ({
  open,
  message,
  type,
  handleClose,
  handleOnClick,
}) => {
  return (
    <Snackbar
      onClick={handleOnClick}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default PaymentSnackbar;
