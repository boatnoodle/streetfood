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
import TypePrice from "containers/Order/TypePrice";
import AmountOrder from "containers/Order/AmountOrder";
import ActionBar from "containers/Order/ActionBar";
import TopBar from "containers/Order/TopBar";

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
      },
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch"
      },
      "& .MuiFormControlLabel-root": {
        marginRight: "5px"
      },
      // position: "relative",
      flexGrow: 1,
      margin: "35px 0 60px 0",
      hr: {
        margin: "10px 0"
      }
    },
    margin: {
      margin: theme.spacing(1)
    },
    rowSpace: {
      margin: "10px 0"
    },
    topSpace: {
      marginTop: "10px"
    },
    queueNumber: {
      zIndex: 9999,
      position: "fixed",
      top: "0",
      right: "10px"
    },
    orderButton: {
      zIndex: 9999,
      position: "fixed",
      top: "6px",
      left: "20%"
    }
  })
);

const OrderPage: React.FC = () => {
  const [openAmountOrder, setOpenAmountOrder] = useState(false);
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

  // const listenOrders = () => {
  //   firebase.db.collection("orders").onSnapshot(function(querySnapshot) {
  //     const orders = [];

  //     querySnapshot.forEach(doc => {
  //       orders.push(doc.data().name);
  //     });
  //     // console.log(orders, "xxx");
  //     // console.log("Current data: ", result?.data());
  //   });
  // };
  console.log(openAmountOrder, "xx");

  const handleSubmit = () => {
    console.log("handleSubmit");
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, errors, values }) => {
        return (
          <div className={classes.root}>
            <TopBar />
            <Field name="provider">
              {({ field }) => <Provider providers={providers} {...field} />}
            </Field>
            <Field name="typeOrder">
              {({ field }) => <TypeOrder typeOrders={typeOrders} {...field} />}
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
            <Field name="amountOrder">
              {({ field }) => (
                <AmountOrder
                  setOpenAmountOrder={setOpenAmountOrder}
                  openAmountOrder={openAmountOrder}
                  {...field}
                />
              )}
            </Field>
            <TypePrice />
            {/* <Field name="typeOrder">
              {({ field }) => (
                <Grid
                  container
                  alignItems="center"
                  className={classes.rowSpace}
                >
                  <Grid item>
                    <TypeOrder typeOrders={typeOrders} {...field} />
                  </Grid>
                  <Grid item>
                    <Remark presetRemarks={presetRemarks} />
                  </Grid>
                  <Grid item xs>
                  </Grid>
                </Grid>
              )}
            </Field> */}
            <ActionBar setOpenAmountOrder={setOpenAmountOrder} />
          </div>
        );
      }}
    </Formik>
  );
};

export default OrderPage;
