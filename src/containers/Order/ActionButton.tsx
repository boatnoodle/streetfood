import React from "react";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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

const ActionButton = () => {
  const classes = useStyles();

  return (
    <FormGroup className={classes.topSpace}>
      <Button variant="contained" className={classes.margin}>
        ตรวจสอบออเดอร์
      </Button>
      <Button variant="contained" color="primary" className={classes.margin}>
        เพิ่มออเดอร์
      </Button>
      <Button variant="contained" color="secondary" className={classes.margin}>
        เสร็จสิ้น
      </Button>
      <Button variant="outlined" color="secondary" className={classes.margin}>
        ยกเลิก
      </Button>
    </FormGroup>
  );
};

export default ActionButton;
