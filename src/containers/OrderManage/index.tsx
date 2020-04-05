import React, { useState, useEffect, Fragment } from "react";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import OrderAll from "./components/OrderAll";
import OrderCurrent from "./components/OrderCurrent";
import OrderDetail from "./components/OrderDetail";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "80px",
      padding: "0 10px",
      "& .MuiChip-root": {
        height: "25px"
      }
    },
    topSpace: {
      marginTop: "15px"
    },
    bottomSpace: {
      marginBottom: "15px"
    },
    card: {
      margin: "20px 0"
    },
    text: {
      fontSize: "1rem"
    },
    typePrice: {
      fontSize: "1.5rem",
      color: "#f50057"
    },
    amountOrder: {
      fontSize: "1.8rem",
      textAlign: "right",
      color: "#f50057"
    },
    toppingList: {
      fontSize: "1rem",
      lineHeight: "1.4",
      marginLeft: "15px",
      color: "#f50057"
    },
    remarks: {
      marginTop: "10px",
      fontSize: "0.7rem",
      color: "#f50057"
    },
    btnDelete: {
      textAlign: "right",
      "& .MuiButton-containedSizeSmall": {
        padding: "0",
        "& .MuiButton-label": {
          fontSize: "0.7rem"
        }
      }
    },
    noOrder: {
      display: "grid",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      marginTop: "-50px"
    }
  })
);

const OrderManage: React.FC<any> = ({
  orderWait,
  orderDoing,
  setOrderDoing
}) => {
  const classes = useStyles();

  useEffect(() => {
    // window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <OrderDetail orderDoing={orderDoing} />
        </Grid>
        <Grid item xs={3}>
          <OrderCurrent orderDoing={orderDoing} setOrderDoing={setOrderDoing} />
        </Grid>
        <Grid item xs={3}>
          <OrderAll orderWait={orderWait} />
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderManage;
