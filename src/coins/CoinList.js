import { useEffect, useState } from "react";
import CoinGeckoApi from "../CoinGeckoApi";
import CoinsCardList from "./CoinsCardList";
import Grid from "@mui/material/Grid";
import SearchForm from "../common/SearchForm";

const CoinList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const getCoins = async () => {
      const resp = await CoinGeckoApi.getCoins();
      setCoins(resp);
    };
    getCoins();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div>
      <Grid container spacing={1} justifyContent="center" pt={2}>
        {coins.length ? (
          <CoinsCardList coins={coins} />
        ) : (
          <Grid item xs={3}>
            <p>No coins found</p>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default CoinList;
