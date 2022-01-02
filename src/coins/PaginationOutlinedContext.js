import React, { useContext, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export const PaginationOutlinedContext = React.createContext();

export const PaginationOutlinedProvider = ({ children }) => {
  const [page, setPage] = useState(1);

  const PaginationOutlined = ({ itemsPerPage, totalItems = 11995 }) => {
    const handleChange = (event, value) => {
      setPage(value);
    };

    return (
      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(totalItems / itemsPerPage)}
          page={page}
          onChange={handleChange}
          variant="outlined"
          color="primary"
        />
      </Stack>
    );
  };
  const value = {
    PaginationOutlined,
    page,
  };
  return (
    <PaginationOutlinedContext.Provider value={value}>
      {children}
    </PaginationOutlinedContext.Provider>
  );
};

export const usePaginationOutlinedContext = () =>
  useContext(PaginationOutlinedContext);
