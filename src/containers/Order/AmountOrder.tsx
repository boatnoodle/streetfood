import React, { useState, useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import { useFormikContext } from "formik";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import MenuList from "@material-ui/core/MenuList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      top: "45px !important",
      left: "0px !important",
      maxHeight: "80vh",
      overflowY: "auto",
      width: "150px",
      zIndex: 999,
      position: "fixed !important " as any,
      "& .MuiList-root": {
        background: "#21a08a",
        color: "white"
      }
    }
  })
);

const AmountOrder = ({ openAmountOrder, setOpenAmountOrder }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { setFieldValue } = useFormikContext<any>();

  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
    setOpenAmountOrder(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  };

  const handleAmountOrder = value => {
    setFieldValue("orderDetail.amountOrder", value);
    setOpen(false);
    setOpenAmountOrder(false);
  };

  useEffect(() => {
    setOpen(openAmountOrder);
  }, [openAmountOrder]);

  return (
    <Popper
      className={classes.root}
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom" ? "center top" : "center bottom"
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={open}
                id="menu-list-grow"
                onKeyDown={handleListKeyDown}
              >
                {[...Array(20).keys()].map(i => (
                  <MenuItem onClick={() => handleAmountOrder(i + 1)}>
                    {i + 1}
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default AmountOrder;
