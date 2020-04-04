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
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import OrderListItem from "./OrderListItem";

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
    },
    title: {
      fontSize: "1rem",
      marginLeft: theme.spacing(2),
      flex: 1
    }
  })
);

const OrderList = ({ setOpenDialogOrderList, openDialogOrderList }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { values, setFieldValue } = useFormikContext<any>();

  const handleClose = () => {
    setOpenDialogOrderList(!open);
    setOpen(!open);
  };

  const handleChange = e => {
    const checked = e.currentTarget.checked;
    const name = e.currentTarget.name;
  };

  useEffect(() => {
    setOpen(openDialogOrderList);
  }, [openDialogOrderList]);

  return (
    <Dialog
      fullScreen
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      className={classes.root}
    >
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            รายการ
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            x
          </Button>
        </Toolbar>
      </AppBar>
      <OrderListItem />
    </Dialog>
  );
};

export default OrderList;
