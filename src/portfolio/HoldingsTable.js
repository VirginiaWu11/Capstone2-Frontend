import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import CardMedia from "@mui/material/CardMedia";
import { CardHeader } from "@mui/material";
import { Card } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 130 },
  {
    field: "logo",
    headerName: "Logo",
    width: 90,
    renderCell: (params) => (
      <CardMedia
        component="img"
        sx={{
          objectFit: "contain",
          width: "2em",
          display: { sm: "block" },
          mr: 2,
        }}
        image={params.value}
        alt={`logo`}
      />
    ),
  },
  { field: "name", headerName: "Name", flex: 1 },
  {
    field: "currentPrice",
    headerName: "Current Price",
    type: "number",
    flex: 1,
  },
  {
    field: "quantity",
    headerName: "quantity",
    type: "number",
    flex: 1,
  },
  {
    field: "value",
    headerName: "Portfolio Value",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    type: "number",
    flex: 1,
    valueGetter: (params) =>
      (params.row.currentPrice || 0) * (params.row.quantity || 0),
  },
];

export default function HoldingsTable({ portfolioCoinsObj, coins }) {
  const rows = [];
  if (portfolioCoinsObj && coins) {
    for (let coin of coins) {
      const obj = {};
      obj["id"] = coin.id;
      obj["logo"] = coin.image;
      obj["name"] = coin.name;
      obj["currentPrice"] = coin.current_price;
      obj["quantity"] = portfolioCoinsObj[coin.id];
      rows.push(obj);
    }
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Card>
        <CardHeader title="Holdings" />
      </Card>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
