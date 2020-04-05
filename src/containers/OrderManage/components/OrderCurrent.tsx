import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useFirebase } from "components/Firebase/useFirebase";
import { orderStatus } from "pages/orderManage";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  root: {
    "& .MuiButton-root": {
      width: "100%"
    }
  },
  container: {
    height: "72vh",
    position: "relative",
    "& .MuiTableFooter-root": {
      bottom: "0px",
      position: "absolute",
      width: "100%"
    }
  },
  table: {
    "& .MuiTableCell-root": {
      fontSize: "0.7rem"
    }
  },
  rowSpace: {
    // margin: "5px 0"
  }
});

const OrderCurrent = ({ orderDoing, setOrderDoing }) => {
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const firebase = useFirebase();
  const classes = useStyles();
  const typeTopping = {
    toppingPork: "หมู",
    toppingBeef: "เนื้อ"
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const handleFinishOrder = () => {
    if (orderDoing.length === 0) return false;
    const orderRef = firebase.db.collection("orders").doc(orderDoing[0].id);

    // Set the "capital" field of the city 'DC'
    return orderRef
      .update({
        orderStatus: orderStatus.DONE
      })
      .then(function() {
        setOpenSnackBar(true);
        // setOrderDoing([]);
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={1000}
        onClose={handleClose}
        message="อาหารพร้อมส่ง"
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
      <Grid container spacing={3}>
        <Grid item xs>
          <Typography variant="h6">
            กำลังทำคิวที่ {orderDoing[0]?.queueNo}
          </Typography>
        </Grid>
      </Grid>
      <TableContainer className={classes.container} component={Paper}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label="table all order waiting"
        >
          <TableHead>
            <TableRow>
              <TableCell>รายการ</TableCell>
              <TableCell>จำนวน</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderDoing[0]?.orders.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div>
                    {`${item.typeMenu}${item.typeNoodle}${
                      typeTopping[item.typeTopping]
                    } ${item.noodle} `}
                    <span>{item.price.typePrice}</span>
                  </div>
                </TableCell>
                <TableCell>{item.amountOrder}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={handleFinishOrder}>
        เสร็จแล้ว
      </Button>
    </div>
  );
};

export default OrderCurrent;
