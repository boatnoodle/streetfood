import React from "react";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import { useFormikContext } from "formik";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "20px",
      "& .MuiGrid-spacing-xs-3 > .MuiGrid-item": {
        padding: "0 5px"
      },
      "& h6": {
        margin: 0
      },
      "& button": {
        margin: "0px"
      }
    },
    margin: {
      margin: theme.spacing(1)
    }
  })
);

const AmountOrder = () => {
  const classes = useStyles();
  const { values, setFieldValue } = useFormikContext<any>();

  const handleAmountOrder = action => {
    const actionAdd = "add";

    if (action === actionAdd) {
      setFieldValue(
        "orderDetail.amountOrder",
        values.orderDetail.amountOrder + 1
      );
    } else {
      if (values.orderDetail.amountOrder > 1)
        setFieldValue(
          "orderDetail.amountOrder",
          values.orderDetail.amountOrder - 1
        );
    }
  };

  return (
    <FormGroup className={classes.root}>
      <Grid container spacing={3}>
        <Grid item>
          <h6>จำนวน</h6>
        </Grid>
        <Grid item>
          <h6>{values.orderDetail.amountOrder}</h6>
        </Grid>
        <Grid item>
          <Button
            onClick={() => handleAmountOrder("add")}
            size="small"
            variant="contained"
            className={classes.margin}
          >
            +{/* <AddRoundedIcon /> */}
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => handleAmountOrder("delete")}
            size="small"
            variant="contained"
            className={classes.margin}
          >
            -{/* <RemoveRoundedIcon /> */}
          </Button>
        </Grid>
      </Grid>
    </FormGroup>
  );
};

export default AmountOrder;
