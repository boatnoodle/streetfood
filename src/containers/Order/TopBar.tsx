import React from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import ListAltIcon from "@material-ui/icons/ListAlt";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      top: "0",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      boxShadow: "none",
      "& button": {
        borderRadius: 0,
        width: "100%",
        height: "46px"
      },
      "& button:first-child": {
        background: "#2778d0"
      },
      "& button:nth-child(2)": {
        background: "#975ca9"
      },
      "& button:last-child": {
        background: "#21a08a"
      },
      "& .MuiButton-contained": {
        boxShadow: "none"
      },
      "& .MuiButton-label": {
        whiteSpace: "nowrap"
      }
    },
    nonWhiteSpace: {
      lineHeight: 0
    }
  })
);

const TopBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="primary" className={classes.root}>
      <Button variant="contained" color="secondary">
        จำนวน
      </Button>
      <Button variant="contained" color="secondary">
        หมายเหตุ
      </Button>
      <Button variant="contained" color="secondary">
        คิวที่ 1
      </Button>
    </AppBar>
  );
};

export default TopBar;
