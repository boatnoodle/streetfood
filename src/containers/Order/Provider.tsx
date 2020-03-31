import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";

const Provider = ({ providers, handleChange }) => {
  return (
    <FormGroup row>
      {providers.map((item, index) => {
        return (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={true}
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
