import { useEffect, useState, memo, useCallback } from "react";
import CoinGeckoApi from "../CoinGeckoApi";
import CoinsCardList from "./CoinsCardList";
import Grid from "@mui/material/Grid";
// import SearchForm from "../common/SearchForm";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CoinTable from "./CoinTable";
import { useListModuleToggleButtonsContext } from "./ListModuleToggleButtonsContext";
import { useNumberOfItemsSelectContext } from "./NumberOfItemsSelectContext";
import { usePaginationOutlinedContext } from "./PaginationOutlinedContext";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useUserWatchlistContext } from "../watchlist/UserWatchlistContext";

const CoinList = memo(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const { ListModuleToggleButtons, view } = useListModuleToggleButtonsContext();
  const { NumberOfItemsSelect, itemsPerPage } = useNumberOfItemsSelectContext();
  const { PaginationOutlined, page } = usePaginationOutlinedContext();
  const { watchlistIds } = useUserWatchlistContext();
  const [coinsToggleView, setCoinsToggleView] = useState("allcoins");

  const getCoins = useCallback(async (page, itemsPerPage) => {
    const resp = await CoinGeckoApi.getCoins(page, itemsPerPage);
    setCoins(resp);
  }, []);

  const getCoinInfoCoinGecko = useCallback(async (page, itemsPerPage) => {
    const resp = await CoinGeckoApi.getCoins(page, itemsPerPage, watchlistIds);
    setCoins(resp);
  }, []);

  useEffect(() => {
    getCoins(page, itemsPerPage);
    setIsLoading(false);
  }, [page, itemsPerPage, getCoins]);
  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  const FilterCoinsToggleButtons = memo(() => {
    const handleChange = (event, nextView) => {
      if (nextView === "allcoins") {
        getCoins(page, itemsPerPage);
      } else {
        getCoinInfoCoinGecko(page, itemsPerPage);
      }
      setCoinsToggleView(nextView);
    };

    return (
      <ToggleButtonGroup
        value={coinsToggleView}
        exclusive
        onChange={handleChange}
        sx={{ mr: 2, mt: 2 }}
      >
        <ToggleButton value="allcoins" aria-label="all coins">
          All Coins
        </ToggleButton>
        <ToggleButton value="watchlist" aria-label="watchllist">
          Watchlist
        </ToggleButton>
      </ToggleButtonGroup>
    );
  });

  return (
    <div>
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <ListModuleToggleButtons />
          <FilterCoinsToggleButtons />
        </Box>

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
          <PaginationOutlined
            itemsPerPage={itemsPerPage}
            totalItems={
              coinsToggleView === "watchlist" ? watchlistIds?.length : 11995
            }
          />
        </Grid>
      </Container>
    </div>
  );
});

export default CoinList;
