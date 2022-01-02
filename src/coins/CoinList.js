import { useEffect, useState } from "react";
import CoinGeckoApi from "../CoinGeckoApi";
import CoinsCardList from "./CoinsCardList";
import Grid from "@mui/material/Grid";
import SearchForm from "../common/SearchForm";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CoinTable from "./CoinTable";
import { useListModuleToggleButtonsContext } from "./ListModuleToggleButtonsContext";
import { useNumberOfItemsSelectContext } from "./NumberOfItemsSelectContext";

const CoinList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const { ListModuleToggleButtons, view } = useListModuleToggleButtonsContext();
  const { NumberOfItemsSelect, itemsPerPage } = useNumberOfItemsSelectContext();

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
        <ListModuleToggleButtons />
        <Grid container spacing={1} justifyContent="center" pt={2}>
          {view === "module" ? (
            coins.length ? (
              <CoinsCardList coins={coins} />
            ) : (
              <Grid item xs={3}>
                <p>No coins found</p>
              </Grid>
            )
          ) : (
            <CoinTable coins={coins} />
          )}
          <NumberOfItemsSelect />
          <PaginationOutlined />
        </Grid>
      </Container>
    </div>
  );
};

export default CoinList;
