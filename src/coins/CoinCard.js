import React, { memo, useCallback } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";

const CoinCard = memo(({ coin }) => {
  const truncate = useCallback((str, n) => {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  }, []);

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
            {truncate(coin.name, 15)}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {truncate(coin.symbol, 20)}
          </Typography>
          {coin.current_price ? (
            <Typography variant="body2">{`Current Price: $${coin.current_price.toLocaleString()}`}</Typography>
          ) : (
            <Typography variant="body2">{`Current Price: Not Available`}</Typography>
          )}
          {coin.market_cap ? (
            <Typography variant="body2">{`Market Cap: $${coin.market_cap.toLocaleString()}`}</Typography>
          ) : (
            <Typography variant="body2">{`Market Cap: Not Available`}</Typography>
          )}
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
});
export default CoinCard;
