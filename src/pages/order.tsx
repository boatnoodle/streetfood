import React, { useEffect, useState } from "react";
import { useFirebase } from "components/Firebase/useFirebase";
import { Formik } from "formik";
import Order from "containers/Order";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import firebaseGlobal from "firebase";
import { getLatestOrderToday } from "services/firebase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff"
    }
  })
);

const OrderPage: React.FC = () => {
  const classes = useStyles();
  const [orderLatest, setOrderLatest] = useState(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const firebase = useFirebase();
  const initialValues = {
    tableNo: null,
    queueNo: null,
    orders: [],
    provider: "PANDA",
    orderStatus: "รอ",
    orderDetail: {
      typeOrder: "ใส่ถุง",
      typeMenu: "ก๋วยเตี๋ยว",
      typeNoodle: "เรือ",
      typeTopping: "",
      noodle: "",
      allToppingPork: false,
      allToppingBeef: false,
      topping: [],
      price: {
        typePrice: "ธรรมดา",
        price: 40
      },
      amountOrder: 1,
      remarks: []
    }
  };

  const addData = payload => {
    firebase.db
      .collection("orders")
      .add(payload)
      .then(function() {
        setOpenBackDrop(false);
        setOpenSnackBar(true);
        getLatestOrderToday(setOrderLatest);
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  };

  const handleSubmit = (value, { resetForm }) => {
    let orders = value.orders;
    const orderDetail = value.orderDetail;

    if (orders.length === 0) {
      orders = [orderDetail];
    }
    const payload = {
      tableNo: value.tableNo,
      queueNo: value.queueNo,
      provider: value.provider,
      orderStatus: value.orderStatus,
      orders: orders,
      created: firebaseGlobal.firestore.FieldValue.serverTimestamp()
    };

    setOpenBackDrop(true);
    addData(payload);
    resetForm();
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  useEffect(() => {
    getLatestOrderToday(setOrderLatest);
  }, []);

  return (
    <>
      <Backdrop
        className={classes.backdrop}
        open={openBackDrop}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleClose}
        message="สั่งออเดอร์สำเร็จ"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => {
          return (
            <Order handleSubmit={handleSubmit} orderLatest={orderLatest} />
          );
        }}
      </Formik>
    </>
  );
};

export default OrderPage;
