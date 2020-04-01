import React, { useEffect } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import Badge from "@material-ui/core/Badge";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useFormikContext } from "formik";
import { toppingPork, toppingBeef } from "dbMockup";
import { Z_NEED_DICT } from "zlib";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btnAddTopping: {
      width: "30px",
      height: "30px",
      background: "#3f51b5",
      padding: "0",
      color: "white",
      marginRight: "5px"
    },
    btnDeleteTopping: {
      width: "30px",
      height: "30px",
      background: "#c51162",
      padding: "0",
      color: "white"
    },
    textToppingMore: {
      fontSize: "14px",
      color: "#c51162"
    }
  })
);

const OrderDetail = ({ noodles, toppingPork, toppingBeef, handleChange }) => {
  const { values, setFieldValue } = useFormikContext<any>();
  const classes = useStyles();

  const allTopping = (e, type) => {
    const restToppingPork = values.orderDetail.topping.filter(
      item => item.typeTopping === "toppingPork"
    );
    const restToppingBeef = values.orderDetail.topping.filter(
      item => item.typeTopping === "toppingBeef"
    );
    const isChecked = e.currentTarget.checked;

    if (type === "toppingPork" && isChecked) {
      setFieldValue("orderDetail.allToppingPork", true);
      setFieldValue("orderDetail.topping", [
        ...values.orderDetail.topping,
        ...toppingPork
      ]);
    } else if (type === "toppingPork" && !isChecked) {
      setFieldValue("orderDetail.allToppingPork", false);
      if (values.orderDetail.allToppingBeef) {
        setFieldValue("orderDetail.topping", [...toppingBeef]);
      } else {
        console.log(values.orderDetail.topping, " xxx");
        setFieldValue("orderDetail.topping", [...restToppingBeef]);
      }
    } else if (type === "toppingBeef" && isChecked) {
      setFieldValue("orderDetail.allToppingBeef", true);
      setFieldValue("orderDetail.topping", [
        ...values.orderDetail.topping,
        ...toppingBeef
      ]);
    } else if (type === "toppingBeef" && !isChecked) {
      setFieldValue("orderDetail.allToppingBeef", false);
      if (values.orderDetail.allToppingPork) {
        setFieldValue("orderDetail.topping", [...toppingPork]);
      } else {
        setFieldValue("orderDetail.topping", [...restToppingPork]);
      }
    }
  };

  const handleChangeTopping = (e, type) => {
    const isChecked = e.currentTarget.checked;
    const name = e.currentTarget.name;
    const object =
      type === "toppingPork"
        ? toppingPork.find(item => item.name === name)
        : toppingBeef.find(item => item.name === name);

    if (isChecked) {
      let totalTopping;
      if (type === "toppingPork") {
        const restTopping = values.orderDetail.topping.filter(
          item => item.typeTopping === "toppingPork"
        );
        totalTopping = [...restTopping, object];
        if (totalTopping.length === toppingPork.length) {
          setFieldValue("orderDetail.allToppingPork", true);
        }
      } else {
        const restTopping = values.orderDetail.topping.filter(
          item => item.typeTopping === "toppingBeef"
        );
        totalTopping = [...restTopping, object];
        if (totalTopping.length === toppingBeef.length) {
          setFieldValue("orderDetail.allToppingBeef", true);
        }
      }

      setFieldValue("orderDetail.topping", [
        ...values.orderDetail.topping,
        object
      ]);
    } else {
      if (type === "toppingPork") {
        setFieldValue("orderDetail.allToppingPork", false);
      } else {
        setFieldValue("orderDetail.allToppingBeef", false);
      }
      const toppingNotInvoled = values.orderDetail.topping.filter(
        item => item.typeTopping !== type
      );

      const toppingFilter = values.orderDetail.topping.filter(
        item => item.typeTopping === type && item.name !== name
      );
      setFieldValue("orderDetail.topping", [
        ...toppingNotInvoled,
        ...toppingFilter
      ]);
    }
  };

  return (
    <FormGroup row>
      <Grid container spacing={2}>
        <Grid xs={4}>
          {noodles.map((item, index) => {
            return (
              <div key={index}>
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      // checked={}
                      onChange={handleChange}
                      name={item.name}
                    />
                  }
                  label={item.name}
                />
              </div>
            );
          })}
        </Grid>
        <Grid xs={4}>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.orderDetail.allToppingPork}
                  onChange={e => allTopping(e, "toppingPork")}
                  name="checkedA"
                />
              }
              label="หมูรวม"
            />
          </div>
          {toppingPork.map((item, index) => {
            return (
              <Grid container key={index}>
                <Grid xs>
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={
                          !!values.orderDetail.topping.find(
                            item2 =>
                              item2.name === item.name &&
                              item2.typeTopping === "toppingPork"
                          )
                            ? true
                            : false
                        }
                        onChange={e => handleChangeTopping(e, "toppingPork")}
                        name={item.name}
                      />
                    }
                    label={item.name}
                  />
                </Grid>
                <Grid xs={4}>
                  <button type="button" className={classes.btnAddTopping}>
                    เพิ่ม
                  </button>
                  <button type="button" className={classes.btnDeleteTopping}>
                    ลด
                  </button>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <Grid xs={4}>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.orderDetail.allToppingBeef}
                  onChange={e => allTopping(e, "toppingBeef")}
                  name="checkedA"
                />
              }
              label="เนื้อรวม"
            />
          </div>
          {toppingBeef.map((item, index) => {
            return (
              <Grid container key={index}>
                <Grid xs>
                  <Badge color="secondary" overlap="circle" badgeContent={0}>
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={
                            !!values.orderDetail.topping.find(
                              item2 =>
                                item2.name === item.name &&
                                item2.typeTopping === "toppingBeef"
                            )
                              ? true
                              : false
                          }
                          onChange={e => handleChangeTopping(e, "toppingBeef")}
                          name={item.name}
                        />
                      }
                      label={item.name}
                    />
                  </Badge>
                </Grid>
                <Grid>
                  <button type="button" className={classes.btnAddTopping}>
                    เพิ่ม
                  </button>
                  <button type="button" className={classes.btnDeleteTopping}>
                    ลด
                  </button>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </FormGroup>
  );
};

export default OrderDetail;