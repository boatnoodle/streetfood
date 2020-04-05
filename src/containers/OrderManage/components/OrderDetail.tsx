import React, { useState, useEffect, Fragment } from "react";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    padding: "0 10px",
    maxHeight: "80vh",
    overflowY: "auto",
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
    fontSize: "1.2rem"
  },
  typePrice: {
    fontSize: "1.5rem",
    color: "#f50057"
  },
  amountOrder: {
    fontSize: "1.5rem",
    textAlign: "right",
    color: "#f50057"
  },
  toppingList: {
    fontSize: "1.2rem",
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
});

const OrderDetail = ({ orderDoing }) => {
  const classes = useStyles();
  const datas = orderDoing;

  const sortTopping = (a, b) => {
    if (a.amount > b.amount) return 1;
    if (b.amount > a.amount) return -1;

    return 0;
  };

  return (
    <div className={classes.root}>
      <Grid container>
        {datas.length > 0 ? (
          datas.map((item, index) => {
            return (
              <Fragment key={index}>
                <Grid item xs={12}>
                  {item?.orders.map((order, index) => {
                    return (
                      <Fragment key={index}>
                        <Card className={classes.card}>
                          <CardContent>
                            <Grid container spacing={2}>
                              <Grid item xs={10}>
                                {/* เส้น */}
                                <Grid item xs={12} className={classes.topSpace}>
                                  <div className={classes.text}>
                                    {`${order.typeMenu} ${order.typeNoodle} ${order.noodle} `}
                                    <span className={classes.typePrice}>
                                      {order.price.typePrice}
                                    </span>
                                  </div>
                                </Grid>
                                {/* Toppping */}
                                <Grid item xs={12}>
                                  <div className={classes.toppingList}>
                                    {order.allToppingPork ||
                                    order.allToppingBeef ? (
                                      <Fragment>
                                        <div>
                                          {order.allToppingPork
                                            ? "รวมหมู"
                                            : "รวมเนื้อ"}
                                        </div>
                                        {order.topping.map(topping => {
                                          if (topping.amount > 0)
                                            return (
                                              <Grid>
                                                {topping.name}{" "}
                                                {topping.amount > 0 &&
                                                  `x ${topping.amount *
                                                    order.amountOrder}`}
                                              </Grid>
                                            );
                                        })}
                                      </Fragment>
                                    ) : (
                                      order.topping
                                        .sort(sortTopping)
                                        .map((topping, toppingIndex) => (
                                          <Grid item key={toppingIndex}>
                                            {topping.name}{" "}
                                            {topping.amount > 0 &&
                                              `x ${topping.amount *
                                                order.amountOrder}`}
                                          </Grid>
                                        ))
                                    )}
                                  </div>
                                </Grid>
                                {/* หมายเหตุ */}
                                {order.remarks.length > 0 && (
                                  <Grid item xs={12}>
                                    <div className={classes.remarks}>
                                      หมายเหตุ :{" "}
                                      {order.remarks.map((remark, index) => {
                                        return index !==
                                          item.remarks?.length - 1
                                          ? `${remark}, `
                                          : remark;
                                      })}
                                    </div>
                                  </Grid>
                                )}
                              </Grid>
                              <Grid item xs={2}>
                                <div className={classes.amountOrder}>
                                  x {order.amountOrder}
                                </div>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Fragment>
                    );
                  })}
                </Grid>
              </Fragment>
            );
          })
        ) : (
          <div className={classes.noOrder}>ยังไม่มีออเดอร์</div>
        )}
      </Grid>
    </div>
  );
};

export default OrderDetail;
