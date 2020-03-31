import React from "react";
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
        setFieldValue("orderDetail.topping", []);
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
        setFieldValue("orderDetail.topping", []);
      }
    }
  };

  const handleChangeTopping = (e, type) => {
    const isChecked = e.currentTarget.checked;
    const value = e.currentTarget.name;
    const valueTopping = values.orderDetail.topping.filter(
      item => item.typeTopping === type
    );

    if (type === "toppingPork" && isChecked) {
      //TODO:: handle topping case
      // setFieldValue('topping', [...values.orderDetail.topping,])
      // if(values.orderDetail.topping.filter(iten => item.typeTopping === type ).length === toppingPork.length)  {
      // setFieldValue("orderDetail.allToppingPork", true);
      // }
    }
  };

  return (
    <FormGroup row>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {noodles.map((item, index) => {
            return (
              <div>
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
                  onChange={e => allTopping(e, "toppingPork")}
                  name="checkedA"
                />
              }
              label="หมูรวม"
            />
          </div>
          {toppingPork.map((item, index) => {
            return (
              <Grid container>
                <Grid xs>
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={
                          !!values.orderDetail.topping.find(
                            item2 => item2.name === item.name
                          )
                            ? true
                            : false
                        }
                        onChange={handleChange}
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
        <Grid item xs={4}>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  // checked={}
                  onChange={e => allTopping(e, "toppingBeef")}
                  name="checkedA"
                />
              }
              label="เนื้อรวม"
            />
          </div>
          {toppingBeef.map((item, index) => {
            return (
              <Grid container>
                <Grid xs>
                  <Badge color="secondary" overlap="circle" badgeContent={0}>
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
