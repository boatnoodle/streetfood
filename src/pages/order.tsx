import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import { useFirebase } from "components/Firebase/useFirebase";
import { Formik, Field } from "formik";
import Provider from "containers/Order/Provider";
import TypeMenu from "containers/Order/TypeMenu";
import TypeNoodle from "containers/Order/TypeNoodle";
import OrderDetail from "containers/Order/OrderDetail";
import TypeOrder from "containers/Order/TypeOrder";
import AmountOrder from "containers/Order/AmountOrder";
import Remark from "containers/Order/Remark";
import TypePrice from "containers/Order/TypePrice";
import ActionButton from "containers/Order/ActionButton";
import {
  typeMenus,
  typeOrders,
  noodles,
  presetRemarks,
  providers,
  toppingBeef,
  toppingPork,
  typeNoodles
} from "dbMockup";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      margin: "20px 0",
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch"
      },
      flexGrow: 1
    },
    margin: {
      margin: theme.spacing(1)
    },
    topSpace: {
      marginTop: "20px"
    },
    queueNumber: {
      position: "absolute",
      top: "0",
      right: "0"
    }
  })
);

const OrderPage: React.FC = () => {
  const classes = useStyles();
  const firebase = useFirebase();
  const initialValues = {
    tableNo: null,
    queueNo: 1,
    provider: "ร้านโกเอ",
    typeMenu: "ก๋วยเตี๋ยว",
    typeOrder: "ใส่ถุง",
    orders: [],
    orderDetail: {
      typeNoodle: "เรือ",
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

  const addData = () => {
    firebase.db
      .collection("orders")
      .add({
        name: "เส้นเล็กน้ำ"
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  };

  const listenOrders = () => {
    firebase.db.collection("orders").onSnapshot(function(querySnapshot) {
      const orders = [];

      querySnapshot.forEach(doc => {
        orders.push(doc.data().name);
      });
      // console.log(orders, "xxx");
      // console.log("Current data: ", result?.data());
    });
  };

  const handleChange = value => {
    console.log("change");
  };

  const handleSubmit = () => {
    console.log("handleSubmit");
  };

  useEffect(() => {
    listenOrders();
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, errors, values }) => {
        console.log(values, "values");
        return (
          <div className={classes.root}>
            <div className={classes.queueNumber}>
              <Chip label="คิวที่ 1" color="secondary" />
            </div>
            <Field name="provider">
              {({ field }) => <Provider providers={providers} {...field} />}
            </Field>
            <div>
              <hr />
            </div>
            <Field name="typeMenu">
              {({ field }) => <TypeMenu typeMenus={typeMenus} {...field} />}
            </Field>
            <Field name="orderDetail.typeNoodle">
              {({ field }) => (
                <TypeNoodle typeNoodles={typeNoodles} {...field} />
              )}
            </Field>
            <div>
              <hr />
            </div>
            <OrderDetail
              noodles={noodles}
              toppingPork={toppingPork}
              toppingBeef={toppingBeef}
            />
            <div>
              <hr />
            </div>
            <Field name="typeOrder">
              {({ field }) => (
                <Grid container>
                  <Grid>
                    <TypeOrder typeOrders={typeOrders} {...field} />
                  </Grid>
                  <Grid xs>
                    <Remark presetRemarks={presetRemarks} />
                  </Grid>
                </Grid>
              )}
            </Field>
            <Grid container>
              <Grid xs={8}>
                <Field name="amountOrder">
                  {({ field }) => <AmountOrder {...field} />}
                </Field>
                <TypePrice />
              </Grid>
              <Grid xs={4}>
                <ActionButton />
              </Grid>
            </Grid>
          </div>
        );
      }}
    </Formik>
  );
};

export default OrderPage;
