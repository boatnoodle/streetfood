import React, { useState, useEffect } from "react";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  makeStyles
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
import { useFormikContext } from "formik";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .PrivateSwitchBase-input-181, & .PrivateSwitchBase-root-178": {
        padding: "0 4px"
      },
      "& .MuiGrid-spacing-xs-2 > .MuiGrid-item": {
        padding: "0px 4px"
      },
      "& .MuiTypography-body1": {
        fontSize: "0.8rem",
        whiteSpace: "nowrap"
      },
      "& .MuiSvgIcon-root": {
        width: "0.7em",
        height: "0.7em"
      },
      "& .MuiChip-label": {
        fontSize: "0.7rem"
      }
    },
    margin: {
      margin: theme.spacing(1)
    },
    topSpace: {
      marginTop: "20px"
    },
    textRemark: {
      color: "red"
    }
  })
);

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

const Remark = ({ openDialogRemark, setOpenDialogRemark, presetRemarks }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { values, setFieldValue } = useFormikContext<any>();

  const handleClose = () => {
    setOpenDialogRemark(!open);
    setOpen(!open);
  };

  const handleChange = e => {
    const checked = e.currentTarget.checked;
    const name = e.currentTarget.name;

    if (checked) {
      setFieldValue("orderDetail.remarks", [
        ...values.orderDetail.remarks,
        name
      ]);
    } else {
      const deleteWord = values.orderDetail.remarks.filter(
        item => item !== name
      );
      setFieldValue("orderDetail.remarks", [...deleteWord]);
    }
  };

  useEffect(() => {
    setOpen(openDialogRemark);
  }, [openDialogRemark]);

  return (
    <Dialog
      fullScreen
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      className={classes.root}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        หมายเหตุ
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {presetRemarks.map((item, index) => {
            return (
              <Grid item xs={6} key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        values.orderDetail.remarks.indexOf(item.name) !== -1
                          ? true
                          : false
                      }
                      key={index}
                      onChange={handleChange}
                      name={item.name}
                    />
                  }
                  label={item.name}
                />
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          ตกลง
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Remark;
