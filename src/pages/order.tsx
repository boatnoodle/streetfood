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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import StarIcon from "@material-ui/icons/Star";
import Provider from "containers/Order/Provider";
import TypeMenu from "containers/Order/TypeMenu";
import TypeNoodle from "containers/Order/TypeNoodle";
import FoodDetail from "containers/Order/FoodDetail";
import TypeOrder from "containers/Order/TypeOrder";
import AmountOrder from "containers/Order/AmountOrder";
import Remark from "containers/Order/Remark";
import TypePrice from "containers/Order/TypePrice";
import ActionButton from "containers/Order/ActionButton";
import {
  typeMenus,
  typeOrders,
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
      position: "relative",
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
    },
    queueNumber: {
      position: "absolute",
      top: "0",
      right: "0"
    },
    colorPrimary: {
      color: "#3f51b5"
    },
    colorSecondary: {
      color: "#f50057"
    },
    textRemark: {
      color: "red"
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
      <div className={classes.queueNumber}>
        <Chip label="คิวที่ 1" color="secondary" />
      </div>
      <Provider providers={providers} handleChange={handleChange} />
      <hr />
      <TypeMenu typeMenus={typeMenus} />

      <TypeNoodle typeNoodles={typeNoodles} handleChange={handleChange} />
      <hr />
      <FoodDetail
        noodles={noodles}
        toppingPork={toppingPork}
        toppingBeef={toppingBeef}
        handleChange={handleChange}
      />
      <hr />
      <TypeOrder typeOrders={typeOrders} handleChange={handleChange} />
      <Grid container>
        <Grid xs={8}>
          <AmountOrder />
          <Remark
            handleChangeRemarks={handleChangeRemarks}
            openDialogRemarks={openDialogRemarks}
            setOpenDialogRemarks={setOpenDialogRemarks}
            presetRemarks={presetRemarks}
          />
          <TypePrice handleChange={handleChange} />
        </Grid>
        <Grid xs={4}>
          <ActionButton />
        </Grid>
      </Grid>
    </form>
  );
};

export default OrderPage;
