import React from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import { useFormikContext } from "formik";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      top: "auto",
      bottom: 0,
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr ",
      "& button": {
        borderRadius: 0,
        width: "100%",
        height: "46px"
      },
      "& button:first-child": {
        background: "#8e5353"
      },
      "& button:nth-child(2)": {
        background: "#975ca9"
      },
      "& button:last-child": {
        background: "#2778d0"
      }
    },
    nonWhiteSpace: {
      lineHeight: 0
    }
  })
);

const ActionButton = ({
  openAmountOrder,
  setOpenAmountOrder,
  handleAddOrder,
  setOpenDialogRemark
}) => {
  const classes = useStyles();
  const { values } = useFormikContext<any>();

  return (
    <AppBar position="fixed" color="primary" className={classes.root}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpenDialogRemark(true)}
      >
        <Badge
          badgeContent={values.orderDetail.remarks.length}
          color="secondary"
        >
          หมายเหตุ
        </Badge>
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpenAmountOrder(!openAmountOrder)}
      >
        <Badge badgeContent={values.orderDetail.amountOrder} color="secondary">
          จำนวน
        </Badge>
      </Button>
      <Button variant="contained" color="secondary" onClick={handleAddOrder}>
        เสร็จ
      </Button>
    </AppBar>
  );
};

export default ActionButton;
