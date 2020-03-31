import React from "react";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { RemarksDialog } from "containers/Order/RemarksDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1)
    },
    topSpace: {
      marginTop: "20px"
    },
    textRemark: {
      color: "red"
    }
  })
);

const Remark = ({
  handleChangeRemarks,
  openDialogRemarks,
  setOpenDialogRemarks,
  presetRemarks
}) => {
  const classes = useStyles();
  return (
    <FormGroup>
      <RemarksDialog
        isOpen={openDialogRemarks}
        setOpenDialogRemarks={setOpenDialogRemarks}
        datas={presetRemarks}
      />
      <FormControlLabel
        className={classes.textRemark}
        control={
          <Checkbox
            // checked={}
            onChange={handleChangeRemarks}
            name="checkedA"
          />
        }
        label="หมายเหตุ"
      />
    </FormGroup>
  );
};

export default Remark;
