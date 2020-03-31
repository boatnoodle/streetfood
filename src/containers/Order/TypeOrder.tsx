import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";

const TypeOrder = ({ typeOrders, handleChange }) => {
  return (
    <FormGroup row>
      {typeOrders.map((item, index) => {
        return (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                // checked={true}
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

export default TypeOrder;
