import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CardMedia from "@mui/material/CardMedia";
import { useModalContext } from "./ModalContext";

const columns = [
  {
    id: "image",
    label: "",
    minWidth: 10,
    format: (coin) => (
      <CardMedia
        component="img"
        sx={{
          objectFit: "contain",
          width: "2em",
          display: { sm: "block" },
          mr: 2,
        }}
        image={coin.image}
        alt={`${coin.name} logo`}
      />
    ),
  },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "symbol", label: "Symbol", minWidth: 100 },
  {
    id: "current_price",
    label: "Current Price",
    minWidth: 170,
    align: "right",
    format: (value) => "$" + value.toLocaleString("en-US"),
  },
  {
    id: "market_cap",
    label: "Market Cap",
    minWidth: 170,
    align: "right",
    format: (value) => "$" + value.toLocaleString("en-US"),
  },
];

const CoinTable = ({ coins }) => {
  const { CoinModal, handleOpen, clickedCoin, setClickedCoin } =
    useModalContext();
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", margin: 2 }}>
      <TableContainer sx={{ maxHeight: 900 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {coins.map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.code}
                  onClick={() => {
                    handleOpen();
                    setClickedCoin(row);
                  }}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : null}
                        {column.format &&
                        typeof value === "string" &&
                        value.match(/^https?:\/\/.+\/.+$/)
                          ? column.format(row)
                          : null}
                        {!column.format ? value : null}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <CoinModal clickedCoin={clickedCoin}></CoinModal>
    </Paper>
  );
};

export default CoinTable;
