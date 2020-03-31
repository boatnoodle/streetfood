import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useFormikContext } from "formik";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topSpace: {
      marginTop: "20px"
    }
  })
);

const TypeNoodle = ({ typeNoodles, value }) => {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();

  const handleChange = e => {
    setFieldValue("orderDetail.typeNoodle", e.currentTarget.name);
  };

  return (
    <FormGroup row className={classes.topSpace}>
      <Grid container spacing={2}>
        <Grid item xs>
          {typeNoodles.map((item, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={item.name === value ? true : false}
                    onChange={handleChange}
                    name={item.name}
                  />
                }
                label={item.name}
              />
            );
          })}
        </Grid>
      </Grid>
    </FormGroup>
  );
};

export default TypeNoodle;
