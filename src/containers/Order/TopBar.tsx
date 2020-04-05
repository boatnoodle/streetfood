import React from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import { useFormikContext } from "formik";
import ListAltIcon from "@material-ui/icons/ListAlt";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      top: "0",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      boxShadow: "none",
      "& button": {
        borderRadius: 0,
        width: "100%",
        height: "46px"
      },
      "& button:first-child": {
        background: "#383838"
      },
      "& button:nth-child(2)": {
        background: "#d23a3a"
      },
      "& button:last-child": {
        background: "#21a08a"
      },
      "& .MuiButton-contained": {
        boxShadow: "none"
      },
      "& .MuiButton-label": {
        whiteSpace: "nowrap"
      }
    },
    nonWhiteSpace: {
      lineHeight: 0
    }
  })
);

const TopBar = ({ setOpenDialogOrderList }) => {
  const { values, setFieldValue, resetForm } = useFormikContext<any>();
  const classes = useStyles();

  const handleAmountOrder = value => {
    setFieldValue("orderDetail.amountOrder", value);
  };

  const handleResetForm = () => {
    resetForm();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AppBar position="fixed" color="primary" className={classes.root}>
      <Button
        variant="contained"
        color="secondary"
        onClick={setOpenDialogOrderList}
      >
        <Badge badgeContent={values.orders.length} color="secondary">
          <ListAltIcon />
        </Badge>
      </Button>
      <Button variant="contained" color="secondary" onClick={handleResetForm}>
        ล้าง
      </Button>
      <Button variant="contained" color="secondary">
        คิวที่ 1
      </Button>
    </AppBar>
  );
};

export default TopBar;
