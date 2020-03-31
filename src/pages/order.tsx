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
import IconButton from "@material-ui/core/IconButton";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import {
  typeMenus,
  noodles,
  presetRemarks,
  providers,
  toppingBeef,
  toppingPork,
  typeNoodles
} from "dbMockup";

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
    margin: {
      margin: theme.spacing(1)
    },
    topSpace: {
      marginTop: "20px"
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
      <hr />
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
        <Grid container spacing={2}>
          <Grid item xs>
            {typeNoodles.map((item, index) => {
              return (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      // checked={}
                      onChange={handleChange}
                      name={item.name}
                    />
                  }
                  label={item.name}
                />
              );
            })}
          </Grid>
          <Grid item xs>
            {noodles.map((item, index) => {
              return (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      // checked={}
                      onChange={handleChange}
                      name={item.name}
                    />
                  }
                  label={item.name}
                />
              );
            })}
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
              label="หมูรวม"
            />
            {toppingPork.map((item, index) => {
              return (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      // checked={}
                      onChange={handleChange}
                      name={item.name}
                    />
                  }
                  label={item.name}
                />
              );
            })}
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
              label="เนื้อรวม"
            />
            {toppingBeef.map((item, index) => {
              return (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      // checked={}
                      onChange={handleChange}
                      name={item.name}
                    />
                  }
                  label={item.name}
                />
              );
            })}
          </Grid>
        </Grid>
      </FormGroup>
      <Grid container>
        <Grid xs={8}>
          <FormGroup className={classes.topSpace}>
            <Grid container spacing={2}>
              <Grid xs={2}>
                <h5>จำนวน</h5>
              </Grid>
              <Grid xs={1}>
                <h5>1</h5>
              </Grid>
              <Grid xs>
                <Button
                  size="small"
                  variant="contained"
                  className={classes.margin}
                >
                  <AddRoundedIcon />
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  className={classes.margin}
                >
                  <RemoveRoundedIcon />
                </Button>
              </Grid>
            </Grid>
          </FormGroup>
          <FormGroup>
            <RemarksDialog
              isOpen={openDialogRemarks}
              setOpenDialogRemarks={setOpenDialogRemarks}
              datas={presetRemarks}
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
        </Grid>
        <Grid xs={4}>
          <FormGroup>
            <Button variant="contained" className={classes.margin}>
              ตรวจสอบออเดอร์
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.margin}
            >
              เพิ่มออเดอร์
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.margin}
            >
              เสร็จสิ้น
            </Button>
          </FormGroup>
        </Grid>
      </Grid>
    </form>
  );
};

export default OrderPage;
