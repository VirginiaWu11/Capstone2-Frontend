import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const NumberOfItemsSelectContext = React.createContext();

export const NumberOfItemsSelectProvider = ({ children }) => {
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const NumberOfItemsSelect = () => {
    const handleChange = (event) => {
      setItemsPerPage(event.target.value);
    };

    return (
      <Box sx={{ minWidth: 150, mx: 2, mb: 1 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="items-per-page">Items Per Page</InputLabel>
          <Select
            labelId="items-per-page"
            id="items-per-page"
            value={itemsPerPage}
            label="items per page"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  };

  const value = {
    NumberOfItemsSelect,
    itemsPerPage,
    setItemsPerPage,
  };
  return (
    <NumberOfItemsSelectContext.Provider value={value}>
      {children}
    </NumberOfItemsSelectContext.Provider>
  );
};

export const useNumberOfItemsSelectContext = () =>
  useContext(NumberOfItemsSelectContext);
