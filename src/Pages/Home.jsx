import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  Dialog,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { DataGrid } from "@mui/x-data-grid";
import { headers } from "./constant";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [productList, setProductList] = useState([]);
  const [inputFields, setInputFields] = useState([
    {
      id: "",
      row_status: false,
      item_name: "",
      description: "",
      price: "",
    },
  ]);

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: "", row_status: false, item_name: "", description: "", price: "" },
    ]);
  };
  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products`)
      .then((response) => {
        console.log("response:response ", response.data);
        const data = response.data.products.map((item) => {
          return item.brand;
        });
        setProductList(data);
      })
      .catch((error) => {
        console.log("response:error ", error);
      });
  }, []);
  console.log("input", inputFields);

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    if (values.length !== 1) {
      values.splice(index, 1);
      setInputFields(values);
    }
  };
  const values = [...inputFields];
  console.log("val", values);

  const handleStatusChange = (index, status) => {
    console.log("status", index, status);
    values[index]["row_status"] = status;
    setInputFields(values);
  };
  const handleItemChange = (index, item) => {
    console.log("data123", { index, item });
    values[index]["item_name"] = item;
    setInputFields(values);
  };
  const handelDescriptionChange = (index, description) => {
    console.log(index, description);
    values[index]["description"] = description;
    setInputFields(values);
  };
  const handelPriceChange = (index, price) => {
    console.log(index, price);
    values[index]["price"] = price;
    setInputFields(values);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box border="1px solid #000">
        <Grid container>
          <Grid item xs={1} padding="0.3em" border="1px solid">
            IsActive
          </Grid>

          <Grid item xs={3.17} padding="0.3em" border="1px solid">
            Item
          </Grid>

          <Grid item xs={3.17} padding="0.3em" border="1px solid">
            Description
          </Grid>

          <Grid item xs={3.16} padding="0.3em" border="1px solid">
            Price
          </Grid>
          <Grid item xs={1.5} padding="0.3em" border="1px solid"></Grid>
        </Grid>
        {inputFields.map((inputField, index) => {
          return (
            <Grid container>
              <Grid item xs={1} padding="0.3em" border="1px solid">
                <Checkbox
                  onChange={(e) => handleStatusChange(index, e.target.checked)}
                />
              </Grid>
              <Grid item xs={3.16} padding="0.3em" border="1px solid">
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-demo"
                  // onChange={(e) => handleItemChange(index, e.target.value);console.log();}
                  onChange={(e, data) => {
                    console.log("check data", data);
                    handleItemChange(index, data);
                  }}
                  options={productList}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={3.17} padding="0.3em" border="1px solid">
                <TextField
                  onChange={(e) =>
                    handelDescriptionChange(index, e.target.value)
                  }
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={3.17} padding="0.3em" border="1px solid">
                <TextField
                  size="small"
                  onChange={(e) => handelPriceChange(index, e.target.value)}
                  fullWidth
                />
              </Grid>

              <Grid item xs={1.5} padding="0.3em" border="1px solid">
                <Stack direction="row" spacing={1} justifyContent="center">
                  <IconButton size="small" onClick={handleAddFields}>
                    <AddBoxOutlinedIcon />
                  </IconButton>

                  <IconButton size="small" onClick={handleRemoveFields}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
          );
        })}
        <Grid container>
          <Grid item xs={1} padding="0.3em" border="1px solid">
            <Typography alignSelf="center">Total</Typography>
          </Grid>
          <Grid item xs={3.16} padding="0.3em" border="1px solid"></Grid>
          <Grid item xs={3.17} padding="0.3em" border="1px solid"></Grid>
          <Grid item xs={3.17} padding="0.3em" border="1px solid">
            <TextField size="small" fullWidth />
          </Grid>
          <Grid item xs={1.5}></Grid>
        </Grid>
      </Box>
      <Stack alignItems="flex-end">
        <Button
          onClick={() => setOpenModal(true)}
          sx={{ marginTop: "2em" }}
          padding="2em"
          variant="contained"
        >
          Save
        </Button>
      </Stack>
      <Dialog open={openModal} onClose={handleClose}>
        <DataGrid
          rows={inputFields}
          getRowId={(row) => row.id}
          columns={headers}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Dialog>
    </>
  );
};

export default Home;
