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
    margin: {
      margin: theme.spacing(1)
    },
    topSpace: {
      marginTop: "20px"
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
    <FormGroup className={classes.topSpace}>
      <Grid container spacing={2}>
        <Grid xs={2}>
          <h5>จำนวน</h5>
        </Grid>
        <Grid xs={1}>
          <h5>{values.orderDetail.amountOrder}</h5>
        </Grid>
        <Grid xs>
          <Button
            onClick={() => handleAmountOrder("add")}
            size="small"
            variant="contained"
            className={classes.margin}
          >
            <AddRoundedIcon />
          </Button>
          <Button
            onClick={() => handleAmountOrder("delete")}
            size="small"
            variant="contained"
            className={classes.margin}
          >
            <RemoveRoundedIcon />
          </Button>
        </Grid>
      </Grid>
    </FormGroup>
  );
};

export default AmountOrder;
