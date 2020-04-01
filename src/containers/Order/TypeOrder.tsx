import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import { useFormikContext } from "formik";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

const TypeOrder = ({ typeOrders }) => {
  const { values, setFieldValue } = useFormikContext<any>();

  const handleChange = e => {
    const name = e.currentTarget.name;

    setFieldValue("typeOrder", name);
  };

  return (
    <FormGroup row>
      {typeOrders.map((item, index) => {
        return (
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
        );
      })}
    </FormGroup>
  );
};

export default TypeOrder;
