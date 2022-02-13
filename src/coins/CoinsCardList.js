import React, { memo } from "react";
import Grid from "@mui/material/Grid";
import CoinCard from "./CoinCard";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";

const CoinsCardList = memo(
  ({
    coins,
    handleCoinModalOpen,
    isPinned,
    handlePin,
    handleUnpin,
    isOnPortfolio,
    removeFromPortfolio,
    handlePortfolioModalOpen,
  }) => {
    console.debug("CoinsCardList rendered");
    return (
      <div>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
          justifyContent="center"
          p={2}
        >
          {coins.map((coin) => (
            <Grid key={coin.id} item xs={3} sm={3} md={3} lg={3}>
              <CardActionArea
                component={Button}
                onClick={() => {
                  handleCoinModalOpen(coin);
                }}
              >
                <CoinCard
                  key={coin.id}
                  coin={coin}
                  isPinned={isPinned}
                  handlePin={handlePin}
                  handleUnpin={handleUnpin}
                  isOnPortfolio={isOnPortfolio}
                  removeFromPortfolio={removeFromPortfolio}
                  handlePortfolioModalOpen={handlePortfolioModalOpen}
                />{" "}
              </CardActionArea>
            </Grid>
          ))}{" "}
        </Grid>
      </div>
    );
  }
);

export default CoinsCardList;
