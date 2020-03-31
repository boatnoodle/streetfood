import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

const TypeMenu = ({ typeMenus }) => {
  return (
    <FormGroup row>
      <Grid container spacing={2}>
        {typeMenus.map((item, index) => {
          return (
            <Grid item key={index}>
              <Chip label={item.name} />
            </Grid>
          );
        })}
      </Grid>
    </FormGroup>
  );
};

export default TypeMenu;
