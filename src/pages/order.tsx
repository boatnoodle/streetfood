import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Badge from "@material-ui/core/Badge";
import { RemarksDialog } from "containers/Order/RemarksDialog";

import { useFirebase } from "components/Firebase/useFirebase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "20px 0",
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch"
      },
      flexGrow: 1
    },
    control: {
      padding: theme.spacing(2)
    },
    "#outlined-basic": {
      margin: "0"
    }
  })
);

const OrderPage: React.FC = () => {
  const [openDialogRemarks, setOpenDialogRemarks] = useState(false);
  const classes = useStyles();
  const firebase = useFirebase();

  const handleChangeRemarks = e => {
    const checked = e.currentTarget.checked;
    if (checked) setOpenDialogRemarks(true);
    else setOpenDialogRemarks(false);
  };
  const addData = () => {
    firebase.db
      .collection("orders")
      .add({
        name: "เส้นเล็กน้ำ"
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  };

  const listenOrders = () => {
    firebase.db.collection("orders").onSnapshot(function(querySnapshot) {
      const orders = [];

      querySnapshot.forEach(doc => {
        orders.push(doc.data().name);
      });
      console.log(orders, "xxx");
      // console.log("Current data: ", result?.data());
    });
  };

  const handleChange = value => {
    console.log("change");
  };

  useEffect(() => {
    listenOrders();
  }, []);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <FormGroup row>
        <Grid container>
          <Grid xs>
            <TextField id="outlined-basic" label="ชื่อผู้สั่ง(Optional)" />
          </Grid>
          <Grid xs style={{ textAlign: "right" }}>
            <Chip label="คิวที่ 1" color="secondary" />
          </Grid>
        </Grid>
      </FormGroup>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox checked={true} onChange={handleChange} name="checkedA" />
          }
          label="ร้านโกเอ"
        />
        <FormControlLabel
          control={
            <Checkbox
              // checked={}
              onChange={handleChange}
              name="checkedA"
            />
          }
          label="FOOD PANDA"
        />
        <FormControlLabel
          control={
            <Checkbox
              // checked={}
              onChange={handleChange}
              name="checkedA"
            />
          }
          label="GRAB"
        />
        <FormControlLabel
          control={
            <Checkbox
              // checked={}
              onChange={handleChange}
              name="checkedA"
            />
          }
          label="LINE MAN"
        />
      </FormGroup>
      <hr />
      <FormGroup row>
        <Grid container spacing={2}>
          <Grid item>
            <Chip label="เมนูก๋วยเตี๋ยว" />
          </Grid>
          <Grid item>
            <Chip label="เมนูข้าว" />
          </Grid>
          <Grid item>
            <Chip label="ลวกจิ้ม" />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs>
            <FormControlLabel
              control={
                <Checkbox
                  // checked={}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="เรือ"
            />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="น้ำตก"
            />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="ต้มยำหมูสับ"
            />
          </Grid>
          <Grid item xs>
            <FormControlLabel
              control={
                <Checkbox
                  // checked={}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="หมี่ขาว"
            />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="เล็ก"
            />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="ใหญ่"
            />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="บะหมี่"
            />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="วุ้นเส้น"
            />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="มาม่า"
            />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="เกาเหลา"
            />
          </Grid>
          <Grid item xs>
            <FormControlLabel
              control={
                <Checkbox
                  // checked={}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="หมู"
            />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="ลูกชิ้นหมู"
            />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="หมูสด"
            />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="หมูเปื่อย(ตุ๋น)"
            />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="ตับ"
            />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="หัวใจ"
            />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="ม้ามหมู"
            />
          </Grid>
          <Grid item xs>
            <FormControlLabel
              control={
                <Checkbox
                  // checked={}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="เนื้อ"
            />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="ลูกชิ้นเนื้อ"
            />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="เนื้อสด"
            />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="เนื้อเปื่อย(ตุ๋น)"
            />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="ตับ"
            />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="ผ้าขี้ริ้ว"
            />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="ม้ามเนื้อ"
            />
          </Grid>
        </Grid>
      </FormGroup>
      <FormGroup>
        <RemarksDialog
          isOpen={openDialogRemarks}
          setOpenDialogRemarks={setOpenDialogRemarks}
        />
        <FormControlLabel
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
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              // checked={}
              onChange={handleChange}
              name="checkedA"
            />
          }
          label="ธรรมดา 40 Panda (50)"
        />
        <FormControlLabel
          control={
            <Checkbox
              // checked={}
              onChange={handleChange}
              name="checkedA"
            />
          }
          label="พิเศษ 50 Panda (60)"
        />
      </FormGroup>
    </form>
  );
};

export default OrderPage;
