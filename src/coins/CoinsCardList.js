import React, { useState, memo } from "react";
import Grid from "@mui/material/Grid";
import CoinCard from "./CoinCard";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import { useModalContext } from "./ModalContext";

const CoinsCardList = memo(({ coins }) => {
  console.debug("CoinsCardList rendered");
  const { CoinModal, handleOpen, clickedCoin, setClickedCoin } =
    useModalContext();
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
                handleOpen();
                setClickedCoin(coin);
              }}
            >
              <CoinCard key={coin.id} coin={coin} />{" "}
            </CardActionArea>
          </Grid>
        ))}{" "}
        <CoinModal clickedCoin={clickedCoin}></CoinModal>
      </Grid>
    </div>
  );
});

export default CoinsCardList;
