import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { RemarksDialog } from "containers/Order/RemarksDialog";
import Badge from "@material-ui/core/Badge";
import { useFormikContext } from "formik";

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

const Remark = ({ presetRemarks }) => {
  const classes = useStyles();
  const { values } = useFormikContext<any>();
  const [openDialogRemarks, setOpenDialogRemarks] = useState(false);

  const toggleDialog = () => {
    setOpenDialogRemarks(!openDialogRemarks);
  };
  return (
    <Grid container>
      <Grid>
        <FormGroup>
          <RemarksDialog
            isOpen={openDialogRemarks}
            setOpenDialogRemarks={setOpenDialogRemarks}
            datas={presetRemarks}
          />
          <Badge badgeContent={values.orderDetail.remarks.length} color="error">
            <Button onClick={toggleDialog} variant="outlined" color="secondary">
              หมายเหตุ
            </Button>
          </Badge>
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default Remark;
