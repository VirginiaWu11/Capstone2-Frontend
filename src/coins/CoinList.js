import { useEffect, useState } from "react";
import CoinGeckoApi from "../CoinGeckoApi";
import CoinsCardList from "./CoinsCardList";
import Grid from "@mui/material/Grid";
import SearchForm from "../common/SearchForm";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const CoinList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getCoins = async (page) => {
      const resp = await CoinGeckoApi.getCoins(page);
      setCoins(resp);
    };
    getCoins(page);
    setIsLoading(false);
  }, [page]);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }
  const PaginationOutlined = () => {
    const handleChange = (event, value) => {
      setPage(value);
    };

    return (
      <Stack spacing={2}>
        <Pagination
          count={600}
          page={page}
          onChange={handleChange}
          variant="outlined"
          color="primary"
        />
      </Stack>
    );
  };

  return (
    <div>
      <Container maxWidth="xl">
        <Grid container spacing={1} justifyContent="center" pt={2}>
          {coins.length ? (
            <CoinsCardList coins={coins} />
          ) : (
            <Grid item xs={3}>
              <p>No coins found</p>
            </Grid>
          )}
          <PaginationOutlined />
        </Grid>
      </Container>
    </div>
  );
};

export default CoinList;
