/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import Badge from "@material-ui/core/Badge";
import Chip from "@material-ui/core/Chip";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useFormikContext } from "formik";
import { toppingPork, toppingBeef } from "dbMockup";
import { Z_NEED_DICT } from "zlib";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topSpace: {
      marginTop: "10px"
    },
    btnAddTopping: {
      fontSize: "0.6rem",
      fontWeight: "normal",
      color: "#3f51b5",
      textDecoration: "underline",
      marginRight: "10px"
    },
    btnDeleteTopping: {
      fontSize: "0.6rem",
      fontWeight: "normal",
      color: "#c51162",
      textDecoration: "underline"
    },
    textToppingMore: {
      fontSize: "14px",
      color: "#c51162"
    },
    wrapperAddmore: {
      lineHeight: 1
    }
  })
);

const OrderDetail = ({ noodles, toppingPork, toppingBeef }) => {
  const classes = useStyles();
  const { values, setFieldValue } = useFormikContext<any>();
  const checkBoxToppingPork = useRef(null);
  const checkBoxToppingBeef = useRef(null);
  const { typeTopping } = values.orderDetail;

  const handleChangeNoodle = e => {
    const isChecked = e.currentTarget.checked;
    const name = e.currentTarget.name;

    if (isChecked) {
      setFieldValue("orderDetail.noodle", name);
    } else {
      setFieldValue("orderDetail.noodle", "");
    }
  };

  const handleAllTopping = (e, type) => {
    const isChecked = e.currentTarget.checked;

    if (type === "toppingPork" && isChecked) {
      setFieldValue("orderDetail.allToppingBeef", false);
      setFieldValue("orderDetail.allToppingPork", true);
      setFieldValue("orderDetail.topping", [...toppingPork]);
    } else if (type === "toppingPork" && !isChecked) {
      setFieldValue("orderDetail.allToppingPork", false);
      setFieldValue("orderDetail.topping", []);
    } else if (type === "toppingBeef" && isChecked) {
      setFieldValue("orderDetail.allToppingPork", false);
      setFieldValue("orderDetail.allToppingBeef", true);
      setFieldValue("orderDetail.topping", [...toppingBeef]);
    } else if (type === "toppingBeef" && !isChecked) {
      setFieldValue("orderDetail.allToppingBeef", false);
      setFieldValue("orderDetail.topping", []);
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

  const handleAddMoreTopping = (nameTopping, typeTopping, action) => {
    const actionAdd = "add";
    const actionDelete = "delete";
    const target = values.orderDetail?.topping.find(
      item => item.name === nameTopping && item.typeTopping === typeTopping
    );
    const updatedToping = values.orderDetail?.topping.map(item => {
      if (JSON.stringify(item) !== JSON.stringify(target)) return item;
      return {
        ...item,
        amount:
          action === actionAdd
            ? item.amount + 1
            : action === actionDelete && item.amount !== 0
            ? item.amount - 1
            : 0
      };
    });
    setFieldValue("orderDetail.topping", updatedToping);
  };

  const getTotalMoreTopping = item => {
    const moreTopping = values.orderDetail.topping.find(
      current =>
        current.name === item.name && current.typeTopping === item.typeTopping
    );
    if (moreTopping) return moreTopping.amount;
    return 0;
  };

  const handleTopping = typeTopping => {
    if (typeTopping === "toppingPork") {
      setFieldValue("orderDetail.typeTopping", "toppingPork");
    } else {
      setFieldValue("orderDetail.typeTopping", "toppingBeef");
    }
  };

  useEffect(() => {
    const e = {
      currentTarget: {
        checked: true
      }
    };
    if (!typeTopping) {
      setFieldValue("orderDetail.typeTopping", "toppingPork");
      handleAllTopping(e, "toppingPork");
    } else {
      setFieldValue("orderDetail.typeTopping", typeTopping);
      handleAllTopping(e, typeTopping);
    }
  }, [typeTopping]);

  const toppingButton = (item, typeTopping) => {
    return (
      <div className={classes.wrapperAddmore}>
        <a
          onClick={() => handleAddMoreTopping(item.name, typeTopping, "add")}
          className={classes.btnAddTopping}
        >
          เพิ่ม
        </a>
        <a
          onClick={() => handleAddMoreTopping(item.name, typeTopping, "delete")}
          className={classes.btnDeleteTopping}
        >
          ลด
        </a>
      </div>
    );
  };

  return (
    <>
      <FormGroup row>
        <Grid container spacing={2}>
          <Grid item>
            <Chip
              onClick={() => handleTopping("toppingPork")}
              color={typeTopping === "toppingPork" ? "secondary" : "default"}
              label="หมู"
            />
          </Grid>
          <Grid item>
            <Chip
              onClick={() => handleTopping("toppingBeef")}
              color={typeTopping === "toppingBeef" ? "secondary" : "default"}
              label="เนื้อ"
            />
          </Grid>
        </Grid>
      </FormGroup>
      <FormGroup row className={classes.topSpace}>
        <Grid container spacing={2}>
          {typeTopping === "toppingPork" ? (
            <>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      innerRef={checkBoxToppingPork}
                      checked={values.orderDetail.allToppingPork}
                      onChange={e => handleAllTopping(e, "toppingPork")}
                    />
                  }
                  label="หมูรวม"
                />
              </Grid>
              {toppingPork.map((item, index) => {
                return (
                  <Grid item xs={4}>
                    <Badge
                      color="secondary"
                      overlap="circle"
                      badgeContent={getTotalMoreTopping(item)}
                    >
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
                            onChange={e =>
                              handleChangeTopping(e, "toppingPork")
                            }
                            name={item.name}
                          />
                        }
                        label={item.name}
                      />
                    </Badge>
                    {toppingButton(item, "toppingPork")}
                  </Grid>
                );
              })}
            </>
          ) : (
            <>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      innerRef={checkBoxToppingBeef}
                      checked={values.orderDetail.allToppingBeef}
                      onChange={e => handleAllTopping(e, "toppingBeef")}
                    />
                  }
                  label="เนื้อรวม"
                />
              </Grid>
              {toppingBeef.map((item, index) => {
                return (
                  <Grid item xs={4}>
                    <Badge
                      color="secondary"
                      overlap="circle"
                      badgeContent={getTotalMoreTopping(item)}
                    >
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
                            onChange={e =>
                              handleChangeTopping(e, "toppingBeef")
                            }
                            name={item.name}
                          />
                        }
                        label={item.name}
                      />
                    </Badge>
                    {toppingButton(item, "toppingBeef")}
                  </Grid>
                );
              })}
            </>
          )}
        </Grid>
      </FormGroup>
      <Grid xs>
        <hr />
      </Grid>
      <FormGroup row>
        <Grid container spacing={2}>
          {noodles.map((item, index) => {
            return (
              <Grid item xs>
                <div key={index}>
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={
                          values.orderDetail.noodle === item.name ? true : false
                        }
                        onChange={handleChangeNoodle}
                        name={item.name}
                      />
                    }
                    label={item.name}
                  />
                </div>
              </Grid>
            );
          })}
        </Grid>
      </FormGroup>
    </>
  );
};

export default OrderDetail;
