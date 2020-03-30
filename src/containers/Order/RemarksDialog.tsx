import React, { useEffect } from "react";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

const RemarksDialog = ({ isOpen = false, setOpenDialogRemarks }) => {
  const handleClose = () => {
    console.log(!isOpen);
    setOpenDialogRemarks(!isOpen);
  };
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          หมายเหตุ
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    // checked={}
                    // onChange={handleChange}
                    name="checkedA"
                  />
                }
                label="ไม่กระเทียม"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    // checked={}
                    // onChange={handleChange}
                    name="checkedA"
                  />
                }
                label="ไม่ผัก"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    // checked={}
                    // onChange={handleChange}
                    name="checkedA"
                  />
                }
                label="ไม่งอก"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    // checked={}
                    // onChange={handleChange}
                    name="checkedA"
                  />
                }
                label="ไม่ผักโรย"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    // checked={}
                    // onChange={handleChange}
                    name="checkedA"
                  />
                }
                label="ไม่บุ้ง"
              />
            </Grid>
            <Grid item xs={6}>
            <FormControlLabel
                control={
                  <Checkbox
                    // checked={}
                    // onChange={handleChange}
                    name="checkedA"
                  />
                }
                label="น้ำซุปมาก"
              />
            <FormControlLabel
                control={
                  <Checkbox
                    // checked={}
                    // onChange={handleChange}
                    name="checkedA"
                  />
                }
                label="น้ำซุปมาก"
              />
            <FormControlLabel
                control={
                  <Checkbox
                    // checked={}
                    // onChange={handleChange}
                    name="checkedA"
                  />
                }
                label="น้ำซุปมาก"
              />
            <FormControlLabel
                control={
                  <Checkbox
                    // checked={}
                    // onChange={handleChange}
                    name="checkedA"
                  />
                }
                label="น้ำซุปมาก"
              />
            <FormControlLabel
                control={
                  <Checkbox
                    // checked={}
                    // onChange={handleChange}
                    name="checkedA"
                  />
                }
                label="น้ำซุปมาก"
              />
            <FormControlLabel
                control={
                  <Checkbox
                    // checked={}
                    // onChange={handleChange}
                    name="checkedA"
                  />
                }
                label="น้ำซุปมาก"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            ตกลง
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export { RemarksDialog };
