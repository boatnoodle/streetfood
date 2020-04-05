import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import { useFormikContext } from "formik";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr"
      // marginTop: "25px"
    },
    margin: {
      margin: theme.spacing(1)
    },
    topSpace: {
      marginTop: "20px"
    },
    colorPrimary: {
      color: "#3f51b5"
    },
    colorSecondary: {
      color: "#f50057"
    }
  })
);

const TypePrice = () => {
  const classes = useStyles();
  const { values, setFieldValue } = useFormikContext<any>();
  const [informationPrice, setInformationPrice] = useState({
    labelNormal: null,
    priceNormal: 0,
    labelSpecial: null,
    priceSpecial: 0
  });
  const myShop = "ร้านโกเอ";
  const panda = "PANDA";
  const normalPrice = "ธรรมดา";
  const specialPrice = "พิเศษ";

  const handleChange = e => {
    const name = e.currentTarget.name;
    let price;
    if (name === normalPrice) {
      price = informationPrice.priceNormal;
    } else if (name === specialPrice) {
      price = informationPrice.priceSpecial;
    }

    setFieldValue("orderDetail.price.typePrice", name);
    setFieldValue("orderDetail.price.price", price);
  };

  const handlePrice = (action, typePrice) => {
    const actionAdd = "add";
    const myShopPriceNormal = 40;
    const myShopPriceSpecial = 50;
    const pandaPriceNormal = 50;
    const pandaPriceSpecial = 60;

    if (action === actionAdd) {
      if (typePrice === normalPrice) {
        setInformationPrice({
          ...informationPrice,
          priceNormal: informationPrice.priceNormal + 10
        });
      }
      if (typePrice === specialPrice) {
        setInformationPrice({
          ...informationPrice,
          priceSpecial: informationPrice.priceSpecial + 10
        });
      }
      setFieldValue(
        "orderDetail.price.price",
        values.orderDetail.price.price + 10
      );
      setFieldValue("orderDetail.price.typePrice", typePrice);
    } else {
      let minPrice;
      if (values.provider === myShop && typePrice === normalPrice) {
        minPrice = myShopPriceNormal;
      } else if (values.provider === myShop && typePrice === specialPrice) {
        minPrice = myShopPriceSpecial;
      } else if (values.provider === panda && typePrice === normalPrice) {
        minPrice = pandaPriceNormal;
      } else if (values.provider === panda && typePrice === specialPrice) {
        minPrice = pandaPriceSpecial;
      }

      let latestPrice;
      if (typePrice === normalPrice) {
        latestPrice = informationPrice.priceNormal - 10;

        setInformationPrice({
          ...informationPrice,
          priceNormal:
            latestPrice >= minPrice ? latestPrice : informationPrice.priceNormal
        });
      } else {
        latestPrice = informationPrice.priceSpecial - 10;
        setInformationPrice({
          ...informationPrice,
          priceSpecial:
            latestPrice >= minPrice
              ? latestPrice
              : informationPrice.priceSpecial
        });
      }
      setFieldValue("orderDetail.price.price", latestPrice);
    }
  };

  useEffect(() => {
    getPriceFromProvider();
  }, [values.provider]);

  const getPriceFromProvider = () => {
    const provider = values.provider;
    const typePrice = values.orderDetail.price.typePrice;
    const informationPrice = {
      labelNormal: null,
      priceNormal: 0,
      labelSpecial: null,
      priceSpecial: 0
    };

    if (provider === myShop) {
      informationPrice.labelNormal = "ธรรมดา";
      informationPrice.priceNormal = 40;
      informationPrice.labelSpecial = "พิเศษ";
      informationPrice.priceSpecial = 50;
    } else if (provider === panda) {
      informationPrice.labelNormal = "Panda ธด.";
      informationPrice.priceNormal = 50;
      informationPrice.labelSpecial = "Panda พศ.";
      informationPrice.priceSpecial = 60;
    }

    if (typePrice === normalPrice) {
      setFieldValue("orderDetail.price.price", informationPrice.priceNormal);
    }
    if (typePrice === specialPrice) {
      setFieldValue("orderDetail.price.price", informationPrice.priceSpecial);
    }

    return setInformationPrice(informationPrice);
  };

  return (
    <RadioGroup
      value={values.orderDetail.price.typePrice}
      onChange={handleChange}
      className={classes.root}
    >
      <FormControlLabel
        className={classes.colorPrimary}
        value="ธรรมดา"
        control={<Radio onChange={handleChange} name="ธรรมดา" />}
        label={
          informationPrice.labelNormal + " " + informationPrice.priceNormal
        }
      />
      <Button
        onClick={() => handlePrice("add", "ธรรมดา")}
        size="small"
        variant="contained"
        className={classes.margin}
        color="primary"
      >
        <AddRoundedIcon />
      </Button>
      <Button
        onClick={() => handlePrice("delete", "ธรรมดา")}
        size="small"
        variant="contained"
        className={classes.margin}
        color="secondary"
      >
        <RemoveRoundedIcon />
      </Button>
      <FormControlLabel
        className={classes.colorSecondary}
        value="พิเศษ"
        control={<Radio onChange={handleChange} name="พิเศษ" />}
        label={
          informationPrice.labelSpecial + " " + informationPrice.priceSpecial
        }
      />
      <Button
        onClick={() => handlePrice("add", "พิเศษ")}
        size="small"
        variant="contained"
        className={classes.margin}
        color="primary"
      >
        <AddRoundedIcon />
      </Button>
      <Button
        onClick={() => handlePrice("delete", "พิเศษ")}
        size="small"
        variant="contained"
        className={classes.margin}
        color="secondary"
      >
        <RemoveRoundedIcon />
      </Button>
    </RadioGroup>
  );
};

export default TypePrice;
