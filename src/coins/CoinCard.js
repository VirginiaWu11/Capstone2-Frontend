import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

const CoinCard = ({ coin }) => {
  return (
    <Card
      sx={{ minWidth: 275, display: "flex", justifyContent: "space-between" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {coin.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {coin.symbol}
          </Typography>
          <Typography variant="body2">{`Current Price: $${coin.current_price.toLocaleString()}`}</Typography>
          <Typography variant="body2">{`Market Cap: $${coin.market_cap.toLocaleString()}`}</Typography>
        </CardContent>
      </Box>
      {coin.image && (
        <CardMedia
          component="img"
          sx={{
            objectFit: "contain",
            width: "5em",
            display: { sm: "block" },
            mr: 2,
          }}
          image={coin.image}
          alt={`${coin.name} logo`}
        />
      )}
    </Card>
  );
};
export default CoinCard;
