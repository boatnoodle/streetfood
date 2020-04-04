import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import { useFormikContext } from "formik";

const TypeMenu = ({ typeMenus, value }) => {
  const { setFieldValue } = useFormikContext();

  const handleOnClick = value => {
    setFieldValue("orderDetail.typeMenu", value);
  };

  return (
    <FormGroup row>
      <Grid container spacing={2}>
        {typeMenus.map((item, index) => {
          return (
            <Grid item key={index}>
              <Chip
                onClick={() => handleOnClick(item.name)}
                color={value === item.name ? "secondary" : "default"}
                label={item.name}
              />
            </Grid>
          );
        })}
      </Grid>
    </FormGroup>
  );
};

export default TypeMenu;
