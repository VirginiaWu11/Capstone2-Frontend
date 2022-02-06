import { useEffect, useState, memo, useCallback } from "react";
import CoinGeckoApi from "../CoinGeckoApi";
import CoinsCardList from "./CoinsCardList";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CoinTable from "./CoinTable";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const CoinList = memo(({ watchlistIds, handleOpen }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [coinsToggleView, setCoinsToggleView] = useState("allcoins");
  const [listModuleView, setlistModuleView] = useState("module");
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [page, setPage] = useState(1);
  console.debug("watchlistIds in CoinList", watchlistIds);

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

  const NumberOfItemsSelect = () => {
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
            <MenuItem value={16}>Sixteen</MenuItem>
            <MenuItem value={24}>TwentyFour</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  };

  const PaginationOutlined = memo(({ itemsPerPage, totalItems = 0 }) => {
    const handleChange = useCallback((event, value) => {
      setPage(value);
    }, []);
    return (
      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(totalItems / itemsPerPage)}
          page={page}
          onChange={handleChange}
          variant="outlined"
          color="primary"
        />
      </Stack>
    );
  });

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
            <CoinsCardList
              coins={coins}
              watchlistIds={watchlistIds}
              handleOpen={handleOpen}
            />
          ) : (
            <Grid item xs={3}>
              <p>No coins found</p>
            </Grid>
          )
        ) : (
          <CoinTable
            coins={coins}
            watchlistIds={watchlistIds}
            handleOpen={handleOpen}
          />
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
