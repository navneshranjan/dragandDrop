import React from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Dialog,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  AppBar,
  Toolbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Receipt = (props) => {
  const formatAmount = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  const handleClose = () => {
    props.setOpenModal(false);
  };
  return (
    <Dialog
      open={props.openModal}
      fullWidth
      maxWidth="md"
      onClose={handleClose}
      padding={"2em"}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Receipt
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            save
          </Button>
        </Toolbar>
      </AppBar>

      <Box width={"100%"} justifyContent="center" alignItems={"center"}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "700" }}>
                  Status
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "700" }}>
                  Name
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "700" }}>
                  Description
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "700" }}>
                  Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.inputFields.map((row) => (
                <>
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {row.row_status === false ? "In Active" : "Active"}
                    </TableCell>
                    <TableCell align="center">{row.item_name}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">
                      {formatAmount(row.price)}
                    </TableCell>
                  </TableRow>
                </>
              ))}
              <TableRow
                key={"key"}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                ></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center" sx={{ fontWeight: "700" }}>
                  {"Total"}
                </TableCell>
                <TableCell align="center">
                  {formatAmount(props.newValue)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Dialog>
  );
};

export default Receipt;
