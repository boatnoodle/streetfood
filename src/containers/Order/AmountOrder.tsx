import React from "react";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";

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
  return (
    <FormGroup className={classes.topSpace}>
      <Grid container spacing={2}>
        <Grid xs={2}>
          <h5>จำนวน</h5>
        </Grid>
        <Grid xs={1}>
          <h5>1</h5>
        </Grid>
        <Grid xs>
          <Button size="small" variant="contained" className={classes.margin}>
            <AddRoundedIcon />
          </Button>
          <Button size="small" variant="contained" className={classes.margin}>
            <RemoveRoundedIcon />
          </Button>
        </Grid>
      </Grid>
    </FormGroup>
  );
};

export default AmountOrder;
