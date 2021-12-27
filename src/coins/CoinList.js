import { useEffect, useState } from "react";
import CoinGeckoApi from "../CoinGeckoApi";
import CoinsCardList from "./CoinsCardList";
import Grid from "@mui/material/Grid";
import SearchForm from "../common/SearchForm";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const CoinList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    const getCoins = async (page, itemsPerPage) => {
      const resp = await CoinGeckoApi.getCoins(page, itemsPerPage);
      setCoins(resp);
    };
    getCoins(page, itemsPerPage);
    setIsLoading(false);
  }, [page, itemsPerPage]);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  const BasicSelect = () => {
    const handleChange = (event) => {
      setItemsPerPage(event.target.value);
    };

    return (
      <Box sx={{ minWidth: 150, mx: 2, mb: 1 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="items-per-page">Items Per Page</InputLabel>
          <Select
            labelId="items-per-page"
            id="items-per-page"
            value={itemsPerPage}
            label="items per page"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  };

  const PaginationOutlined = () => {
    const handleChange = (event, value) => {
      setPage(value);
    };

    return (
      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(11995 / itemsPerPage)}
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
          <BasicSelect />
          <PaginationOutlined />
        </Grid>
      </Container>
    </div>
  );
};

export default CoinList;
