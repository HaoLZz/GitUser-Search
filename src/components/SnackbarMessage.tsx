import React from "react";
import MuiAlert, { AlertProps, AlertColor } from "@mui/material/Alert";
import Snackbar, {
  SnackbarProps,
  SnackbarCloseReason,
} from "@mui/material/Snackbar";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackbarMessageProps extends SnackbarProps {
  text: string;
  severity: AlertColor;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SnackbarMessage({
  open,
  setOpen,
  text,
  severity,
  anchorOrigin,
}: SnackbarMessageProps) {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleAlertClose = (e: React.SyntheticEvent<Element, Event>) => {
    setOpen(false);
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert
        onClose={handleAlertClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
}
