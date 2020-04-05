import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  container: {
    height: "80vh"
  },
  table: {
    "& .MuiTableCell-root": {
      fontSize: "0.7rem"
    }
  }
});

const OrderAll = ({ orderWait }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6">ออเดอร์ทั้งหมด</Typography>
      <TableContainer className={classes.container} component={Paper}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label="table all order waiting"
        >
          <TableHead>
            <TableRow>
              <TableCell>คิวที่</TableCell>
              <TableCell>ประเภทออเดอร์</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderWait.map((item, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {item.queueNo}
                </TableCell>
                <TableCell>{item.provider}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrderAll;
