import React, { Fragment } from "react";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { useFormikContext } from "formik";
import Chip from "@material-ui/core/Chip";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  makeStyles
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "0 10px",
      background: "beige",
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
    }
  })
);
const OrderListItem = () => {
  const classes = useStyles();
  // provider: "ร้านโกเอ",
  //   typeMenu: "ก๋วยเตี๋ยว",
  //   typeOrder: "ใส่ถุง",
  //   orders: [],
  //   orderDetail: {
  //     typeNoodle: "เรือ",
  //     noodle: "",
  //     allToppingPork: false,
  //     allToppingBeef: false,
  //     topping: [],
  //     price: {
  //       typePrice: "ธรรมดา",
  //       price: 40
  //     },
  //     amountOrder: 1,
  //     remarks: []
  //   }

  // typeNoodle: "เรือ"
  // noodle: "หมี่"
  // allToppingPork: false
  // allToppingBeef: false
  // topping: Array(3)
  // 0: {name: "ลูกชิ้นหมู", price: 10, addMore: false, amount: 0, typeTopping: "toppingPork"}
  // 1: {name: "ตับ", price: 10, addMore: false, amount: 2, typeTopping: "toppingPork"}
  // 2: {name: "ม้ามหมู", price: 10, addMore: false, amount: 0, typeTopping: "toppingPork"}
  // length: 3
  // __proto__: Array(0)
  // price: {typePrice: "ธรรมดา", price: 40}
  // amountOrder: 1
  // remarks: (2) ["ไม่ผักบุ้ง", "ไม่งอก"]
  const sortTopping = (a, b) => {
    if (a.amount > b.amount) return 1;
    if (b.amount > a.amount) return -1;

    return 0;
  };
  const { values, setFieldValue } = useFormikContext<any>();
  console.log(values, "xx");
  return (
    <div className={classes.root}>
      <Grid container>
        {values.orders.map((item, index) => {
          return (
            <Fragment key={index}>
              <Grid item xs={12}>
                <span className={classes.text}>No. {index + 1} </span>
                <Chip label={item.typeOrder} color="secondary" />
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
                        <div>{item.allToppingPork ? "รวมหมู" : "รวมเนื้อ"}</div>
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
                <div className={classes.amountOrder}>x {item.amountOrder}</div>
              </Grid>
              <Grid item xs={12}>
                <hr />
              </Grid>
            </Fragment>
          );
        })}
      </Grid>
    </div>
  );
};

export default OrderListItem;
