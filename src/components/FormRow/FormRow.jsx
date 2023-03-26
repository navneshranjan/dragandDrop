import React from "react";
import { Autocomplete, Box, Stack, TextField, Button } from "@mui/material";

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];

const FormRow = () => {
  return (
    <Box>
      <Stack direction={"row"}>
        {/* <Autocomplete /> */}
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
        <TextField>test</TextField>
        <TextField></TextField>
        <Button>Add</Button>
      </Stack>
    </Box>
  );
};

export default FormRow;
