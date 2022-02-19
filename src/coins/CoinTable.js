import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CardMedia from "@mui/material/CardMedia";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

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
  {
    id: "symbol",
    label: "Symbol",
    minWidth: 100,
    format: (value) => value.toUpperCase(),
  },
  {
    id: "current_price",
    label: "Current Price",
    minWidth: 170,
    align: "center",
    format: (value) => "$" + value.toLocaleString("en-US"),
  },
  {
    id: "market_cap",
    label: "Market Cap",
    minWidth: 170,
    align: "center",
    format: (value) => "$" + value.toLocaleString("en-US"),
  },
  {
    id: "total_volume",
    label: "24Hr Volume",
    minWidth: 170,
    align: "center",
    format: (value) => "$" + value.toLocaleString("en-US"),
  },
  {
    id: "fully_diluted_valuation",
    label: "Fully Diluted Valuation",
    minWidth: 170,
    align: "center",
    format: (value) => "$" + value.toLocaleString("en-US"),
  },
  {
    id: "circulating_supply",
    label: "Circulating Supply",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "total_supply",
    label: "Total Supply",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "max_supply",
    label: "Max Supply",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const CoinTable = ({
  coins,
  handleCoinModalOpen,
  isPinned,
  handlePin,
  handleUnpin,
  isOnPortfolio,
  removeFromPortfolio,
  handlePortfolioModalOpen,
}) => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", margin: 2 }}>
      <TableContainer sx={{ maxHeight: 665 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {coins.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    handleCoinModalOpen(row);
                  }}
                >
                  {/* <PushPinOutlinedIcon /> */}
                  <TableCell>
                    {isPinned(row.id) ? (
                      <IconButton
                        onMouseDown={(event) => event.stopPropagation()}
                        onClick={(event) => {
                          event.stopPropagation();
                          event.preventDefault();
                          handleUnpin(row.id);
                        }}
                      >
                        <Tooltip title="Unpin from Watchlist">
                          <PushPinIcon color="primary" />
                        </Tooltip>
                      </IconButton>
                    ) : (
                      <IconButton
                        onMouseDown={(event) => event.stopPropagation()}
                        onClick={(event) => {
                          event.stopPropagation();
                          event.preventDefault();
                          handlePin(row.id);
                        }}
                      >
                        <Tooltip title="Pin to Watchlist">
                          <PushPinOutlinedIcon
                            sx={{ transform: "rotate(0.20turn)" }}
                          />
                        </Tooltip>
                      </IconButton>
                    )}
                    {isOnPortfolio(row.id) ? (
                      <IconButton
                        onMouseDown={(event) => event.stopPropagation()}
                        onClick={(event) => {
                          event.stopPropagation();
                          event.preventDefault();
                          removeFromPortfolio(row.id);
                        }}
                      >
                        <Tooltip title="Remove from Portfolio">
                          <AccountBalanceWalletIcon color="primary" />
                        </Tooltip>
                      </IconButton>
                    ) : (
                      <IconButton
                        onMouseDown={(event) => event.stopPropagation()}
                        onClick={(event) => {
                          event.stopPropagation();
                          event.preventDefault();
                          handlePortfolioModalOpen(row);
                        }}
                      >
                        <Tooltip title="Add to Portfolio">
                          <AccountBalanceWalletIcon />
                        </Tooltip>
                      </IconButton>
                    )}
                  </TableCell>
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
                        {column.id === "symbol" ? column.format(value) : null}
                        {!column.format ? value : null}
                        {!value ? "N/A" : null}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CoinTable;
