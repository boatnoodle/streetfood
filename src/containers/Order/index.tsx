import React, { useEffect, useState } from "react";
import { Field, useFormikContext } from "formik";
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
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Provider from "containers/Order/Provider";
import TypeMenu from "containers/Order/TypeMenu";
import TypeNoodle from "containers/Order/TypeNoodle";
import OrderDetail from "containers/Order/OrderDetail";
import TypeOrder from "containers/Order/TypeOrder";
import TypePrice from "containers/Order/TypePrice";
import AmountOrder from "containers/Order/AmountOrder";
import Remark from "containers/Order/Remark";
import ActionBar from "containers/Order/ActionBar";
import TopBar from "containers/Order/TopBar";
import OrderList from "containers/Order/components/OrderList/OrderList";

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
const Order = ({ handleSubmit }) => {
  const [openAmountOrder, setOpenAmountOrder] = useState(false);
  const [openDialogRemark, setOpenDialogRemark] = useState(false);
  const [openDialogOrderList, setOpenDialogOrderList] = useState(false);
  const classes = useStyles();
  const { values, setFieldValue, initialValues } = useFormikContext<any>();

  const handleAddOrder = () => {
    const orders = values.orders;
    const order = values.orderDetail;
    setFieldValue("orders", [...orders, order]);
    setFieldValue("orderDetail", initialValues.orderDetail);
    setFieldValue("provider", initialValues.provider);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={classes.root}>
      <TopBar
        setOpenDialogRemark={setOpenDialogRemark}
        setOpenDialogOrderList={setOpenDialogOrderList}
      />
      <Field name="provider">
        {({ field }) => <Provider providers={providers} {...field} />}
      </Field>
      <Field name="orderDetail.typeOrder">
        {({ field }) => <TypeOrder typeOrders={typeOrders} {...field} />}
      </Field>
      <div>
        <hr />
      </div>
      <Field name="orderDetail.typeMenu">
        {({ field }) => <TypeMenu typeMenus={typeMenus} {...field} />}
      </Field>
      <Field name="orderDetail.typeNoodle">
        {({ field }) => <TypeNoodle typeNoodles={typeNoodles} {...field} />}
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
      <Remark
        openDialogRemark={openDialogRemark}
        setOpenDialogRemark={setOpenDialogRemark}
        presetRemarks={presetRemarks}
      />
      <OrderList
        openDialogOrderList={openDialogOrderList}
        setOpenDialogOrderList={setOpenDialogOrderList}
      />
      <ActionBar
        openAmountOrder={openAmountOrder}
        setOpenAmountOrder={setOpenAmountOrder}
        handleAddOrder={handleAddOrder}
      />
    </div>
  );
};

export default Order;
