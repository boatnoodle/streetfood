import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import { useFormikContext } from "formik";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topSpace: {
      marginTop: "20px"
    }
  })
);

const TypeOrder = ({ typeOrders }) => {
  const classes = useStyles();
  const { values, setFieldValue } = useFormikContext<any>();

  const handleChange = e => {
    const name = e.currentTarget.name;

    setFieldValue("typeOrder", name);
  };

  return (
    <FormGroup row className={classes.topSpace}>
      <Grid container spacing={2}>
        {typeOrders.map((item, index) => {
          return (
            <Grid item>
              <RadioGroup
                aria-label="typeOrder"
                name="typeOrder"
                value={values.typeOrder}
                onChange={handleChange}
              >
                <FormControlLabel
                  key={index}
                  value={item.name}
                  control={<Radio onChange={handleChange} name={item.name} />}
                  label={item.name}
                />
              </RadioGroup>
            </Grid>
          );
        })}
      </Grid>
    </FormGroup>
  );
};

export default TypeOrder;
