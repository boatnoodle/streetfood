import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  makeStyles
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTypography-h6": {
        fontSize: "1rem"
      },
      "& .MuiDialogContentText-root": {
        fontSize: "0.8rem"
      }
    }
  })
);

export default function DraggableDialog({
  textTitle,
  textContent,
  textConfirm,
  textClose,
  openConfirmDialog,
  setOpenConfirmDialog,
  handleOnEnter
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setOpenConfirmDialog(false);
  };

  useEffect(() => {
    setOpen(openConfirmDialog);
  }, [openConfirmDialog]);

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        {textTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{textContent}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {textClose}
        </Button>
        <Button onClick={handleOnEnter} color="primary">
          {textConfirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
