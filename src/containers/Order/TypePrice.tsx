import React from "react";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
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
    },
    colorPrimary: {
      color: "#3f51b5"
    },
    colorSecondary: {
      color: "#f50057"
    }
  })
);

const TypePrice = ({ handleChange }) => {
  const classes = useStyles();

  return (
    <FormGroup>
      <RadioGroup
        aria-label="gender"
        name="typePrice"
        value="ธรรมดา"
        onChange={handleChange}
      >
        <Grid container>
          <Grid xs={7}>
            <FormControlLabel
              className={classes.colorPrimary}
              value="ธรรมดา"
              control={
                <Radio checked={true} onChange={handleChange} name="checkedA" />
              }
              label="ธรรมดา 40 Panda (50)"
            />
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

        <Grid container>
          <Grid xs={7}>
            <FormControlLabel
              className={classes.colorSecondary}
              value="พิเศษ"
              control={
                <Radio
                  checked={false}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="พิเศษ 50 Panda (60)"
            />
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
      </RadioGroup>
    </FormGroup>
  );
};

export default TypePrice;
