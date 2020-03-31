import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
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

const Provider = ({ providers, value, onChange }) => {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();

  const handleChange = e => {
    setFieldValue("provider", e.currentTarget.name);
  };

  return (
    <FormGroup row className={classes.topSpace}>
      {providers.map((item, index) => {
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
    </FormGroup>
  );
};

export default Provider;
