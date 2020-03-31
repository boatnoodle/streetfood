import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import Badge from "@material-ui/core/Badge";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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

const FoodDetail = ({ noodles, toppingPork, toppingBeef, handleChange }) => {
  const classes = useStyles();

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
                  // checked={}
                  onChange={handleChange}
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
                        // checked={}
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
                  onChange={handleChange}
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

export default FoodDetail;
