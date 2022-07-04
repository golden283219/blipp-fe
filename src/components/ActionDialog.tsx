import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';

interface IActionDialog {
  title?: string;
  description?: string;
  firstActionText?: string;
  secondActionText?: string;
  handleFirstAction?: () => void;
  handleSecondAction?: () => void;
  onClose?: () => void;
  onBackdropClick?: () => void;
  open: boolean;
}

const ActionDialog: React.FC<IActionDialog> = ({
  title,
  description,
  firstActionText,
  secondActionText,
  handleFirstAction,
  handleSecondAction,
  onBackdropClick,
  open,
  children,
}) => {
  return (
    <Dialog open={open} onBackdropClick={onBackdropClick}>
      <DialogContent>
        {title && (
          <DialogContentText variant={'body1'}>
            {title}
          </DialogContentText>
        )}
        {description && (
          <DialogContentText variant={'body2'}>
            {description}
          </DialogContentText>
        )}
        {children}
      </DialogContent>
      <DialogActions>
        {firstActionText && (
          <Button onClick={handleFirstAction}>
            {firstActionText}
          </Button>
        )}
        {secondActionText && (
          <Button
            onClick={handleSecondAction}
            color="primary"
            variant="contained"
          >
            {secondActionText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ActionDialog;
