import { useEffect, useState, memo, useCallback } from "react";
import CoinGeckoApi from "../CoinGeckoApi";
import CoinsCardList from "./CoinsCardList";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CoinTable from "./CoinTable";
import { useNumberOfItemsSelectContext } from "./NumberOfItemsSelectContext";
import { usePaginationOutlinedContext } from "./PaginationOutlinedContext";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useUserWatchlistContext } from "../watchlist/UserWatchlistContext";

import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

const CoinList = memo(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const { NumberOfItemsSelect, itemsPerPage } = useNumberOfItemsSelectContext();
  const { PaginationOutlined, page, setPage } = usePaginationOutlinedContext();
  const { watchlistIds } = useUserWatchlistContext();
  const [coinsToggleView, setCoinsToggleView] = useState("allcoins");

  const [listModuleView, setlistModuleView] = useState("module");
  const ListModuleToggleButtons = memo(() => {
    const handleChange = (event, nextView) => {
      setlistModuleView(nextView);
    };

    return (
      <ToggleButtonGroup
        value={listModuleView}
        exclusive
        onChange={handleChange}
        sx={{ ml: 2, mt: 2 }}
      >
        <ToggleButton value="list" aria-label="list">
          <ViewListIcon />
        </ToggleButton>
        <ToggleButton value="module" aria-label="module">
          <ViewModuleIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    );
  });

  const getCoins = useCallback(async (page, itemsPerPage) => {
    const resp = await CoinGeckoApi.getCoins(page, itemsPerPage);
    setCoins(resp);
  }, []);

  const getCoinInfoCoinGecko = useCallback(
    async (page, itemsPerPage, watchlistIds) => {
      const resp = await CoinGeckoApi.getCoins(1, 1, watchlistIds);
      let divisor = watchlistIds?.length / itemsPerPage;
      setCoins(
        resp.slice(
          (watchlistIds?.length / divisor) * (page - 1),
          (watchlistIds?.length / divisor) * page
        )
      );
    },
    []
  );
  const handleChange = useCallback(
    (event, nextView) => {
      setPage(1);
      if (nextView === "allcoins") {
        getCoins(1, itemsPerPage);
      } else {
        getCoinInfoCoinGecko(1, itemsPerPage, watchlistIds);
      }
      setCoinsToggleView(nextView);
    },
    [getCoinInfoCoinGecko, getCoins, itemsPerPage, watchlistIds, setPage]
  );

  useEffect(() => {
    if (coinsToggleView === "allcoins") {
      getCoins(page, itemsPerPage);
    } else {
      getCoinInfoCoinGecko(page, itemsPerPage, watchlistIds);
    }
    setIsLoading(false);
  }, [
    coinsToggleView,
    handleChange,
    page,
    getCoinInfoCoinGecko,
    getCoins,
    itemsPerPage,
    watchlistIds,
  ]);
  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  const FilterCoinsToggleButtons = memo(() => {
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
        {listModuleView === "module" ? (
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
        <Grid container spacing={1} justifyContent="center" pt={2}>
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
