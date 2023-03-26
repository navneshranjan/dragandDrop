import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Autocomplete, IconButton, Stack, TextField } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const Home = () => {
  const [productList, setProductList] = useState([]);
  const rowsValues = [
    {
      internalId: Math.round(Math.random() * 10),
      lastName: "Snow",
      firstName: "Jon",
      age: 35,
    },
  ];
  const [rows, setRows] = useState(rowsValues);
  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products`)
      .then((response) => {
        console.log("response:response ", response.data);
        setProductList(response.data.products);
      })
      .catch((error) => {
        console.log("response:error ", error);
      });
  }, []);
  const deleteUser = useCallback(
    (id) => () => {
      setTimeout(() => {
        setRows((prevRows) => {
          console.log("skjfshfsn", { prevRows, id });
          return prevRows.filter((row) => row.internalId !== id);
        });
      });
    },
    []
  );
  const addUser = useCallback(
    (id) => () => {
      setTimeout(() => {
        setRows((prevRows) => console.log({ prevRows, rowsValues }));
      });
    },
    []
  );
  const columns = useMemo(
    () => [
      {
        field: "item",
        headerName: "Item",
        flex: 1,
        editable: true,
        type: "singleSelect",
        valueOptions: productList,
        getOptionValue: (value) => value.brand,
        getOptionLabel: (value) => value.brand,
      },
      {
        field: "decription",
        headerName: "Decription",
        flex: 1,
        renderCell: () => {
          return <TextField size="small" />;
        },
      },
      {
        field: "price",
        headerName: "Price",
        flex: 1,
        renderCell: () => {
          return <TextField size="small" />;
        },
      },
      {
        field: "action",
        type: "actions",
        flex: 1,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<AddBoxOutlinedIcon />}
            label="Add"
            onClick={addUser(params.id)}
          />,
          <GridActionsCellItem
            icon={<DeleteOutlineOutlinedIcon />}
            label="Delete"
            onClick={deleteUser(params.id)}
          />,
        ],
      },
    ],
    [deleteUser, productList]
  );

  return (
    <DataGrid
      rows={rows}
      getRowId={(row) => {
        console.log("check internal Id", row);
        return <></>;
      }}
      autoHeight
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[10, 20, 30]}
      checkboxSelection
      disableSelectionOnClick
      disableRowSelectionOnClick
      disableColumnSelector
    />
  );
};

export default Home;
