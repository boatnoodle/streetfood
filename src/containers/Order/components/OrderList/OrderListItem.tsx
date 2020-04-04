import React, { Fragment, useState } from "react";
import { useFormikContext } from "formik";
import Chip from "@material-ui/core/Chip";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  makeStyles
} from "@material-ui/core/styles";
import ConfirmDialog from "components/ConfirmDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "0 10px",
      minHeight: "100vh",
      marginTop: "55px",
      "& .MuiChip-root": {
        height: "25px"
      }
    },
    topSpace: {
      marginTop: "15px"
    },
    text: {
      fontSize: "0.7rem"
    },
    typePrice: {
      fontSize: "0.8rem",
      color: "#f50057"
    },
    amountOrder: {
      fontSize: "1.5rem",
      textAlign: "right",
      color: "#f50057"
    },
    toppingList: {
      fontSize: "0.7rem",
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
const OrderListItem = () => {
  const classes = useStyles();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [targetDelete, setTargetDelete] = useState();
  const { values, setFieldValue } = useFormikContext<any>();

  const sortTopping = (a, b) => {
    if (a.amount > b.amount) return 1;
    if (b.amount > a.amount) return -1;

    return 0;
  };

  const toggleDialog = index => {
    setOpenConfirmDialog(!openConfirmDialog);
    setTargetDelete(index);
  };

  const handleDeleteOrder = value => {
    const orders = values.orders.filter((_, index) => index !== targetDelete);
    setFieldValue("orders", orders);
    setOpenConfirmDialog(!openConfirmDialog);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        {values.orders.length > 0 ? (
          values.orders.map((item, index) => {
            return (
              <Fragment key={index}>
                <Grid item xs={12}>
                  <span className={classes.text}>No. {index + 1} </span>
                  <Chip label={item.typeOrder} color="secondary" />{" "}
                  <Chip label={item.provider} color="primary" />
                </Grid>
                <Grid item xs={10}>
                  {/* เส้น */}
                  <Grid item xs={12} className={classes.topSpace}>
                    <div className={classes.text}>
                      {`${item.typeMenu} ${item.typeNoodle} ${item.noodle} `}
                      <span className={classes.typePrice}>
                        {item.price.typePrice}
                      </span>
                    </div>
                  </Grid>
                  {/* Toppping */}
                  <Grid item xs={12}>
                    <div className={classes.toppingList}>
                      {item.allToppingPork || item.allToppingBeef ? (
                        <Fragment>
                          <div>
                            {item.allToppingPork ? "รวมหมู" : "รวมเนื้อ"}
                          </div>
                          {item.topping.map(topping => {
                            if (topping.amount > 0)
                              return (
                                <Grid item>
                                  {topping.name}{" "}
                                  {topping.amount > 0 &&
                                    `x ${topping.amount * item.amountOrder}`}
                                </Grid>
                              );
                          })}
                        </Fragment>
                      ) : (
                        item.topping
                          .sort(sortTopping)
                          .map((topping, toppingIndex) => (
                            <Grid item key={toppingIndex}>
                              {topping.name}{" "}
                              {topping.amount > 0 &&
                                `x ${topping.amount * item.amountOrder}`}
                            </Grid>
                          ))
                      )}
                    </div>
                  </Grid>
                  {/* หมายเหตุ */}
                  {item.remarks.length > 0 && (
                    <Grid item xs={12}>
                      <div className={classes.remarks}>
                        หมายเหตุ :{" "}
                        {item.remarks.map((remark, index) => {
                          return index !== item.remarks?.length - 1
                            ? `${remark}, `
                            : remark;
                        })}
                      </div>
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={2}>
                  <div className={classes.amountOrder}>
                    x {item.amountOrder}
                  </div>
                </Grid>
                {/* // ลบ */}
                <Grid item xs={12}>
                  <div className={classes.btnDelete}>
                    <ConfirmDialog
                      textTitle="ยืนยันการลบออเดอร์"
                      textContent="คุณยืนยันที่จะลบออเดอร์นี้หรือไม่ ?"
                      textConfirm="ยืนยัน"
                      textClose="ยกเลิก"
                      openConfirmDialog={openConfirmDialog}
                      setOpenConfirmDialog={setOpenConfirmDialog}
                      handleOnEnter={handleDeleteOrder}
                    />
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={() => toggleDialog(index)}
                    >
                      ลบ
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <hr />
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

export default OrderListItem;
