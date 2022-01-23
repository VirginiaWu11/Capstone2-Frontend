import { useEffect, useState } from "react";
import CoinGeckoApi from "../CoinGeckoApi";
import BackendApi from "../api";
import CoinsCardList from "../coins/CoinsCardList";
import Grid from "@mui/material/Grid";
// import SearchForm from "../common/SearchForm";
import Container from "@mui/material/Container";
import CoinTable from "../coins/CoinTable";
import { useListModuleToggleButtonsContext } from "../coins/ListModuleToggleButtonsContext";
import { useNumberOfItemsSelectContext } from "../coins/NumberOfItemsSelectContext";
import { usePaginationOutlinedContext } from "../coins/PaginationOutlinedContext";
import { useUserWatchlistContext } from "./UserWatchlistContext";

const WatchList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const { ListModuleToggleButtons, view } = useListModuleToggleButtonsContext();
  const { NumberOfItemsSelect, itemsPerPage } = useNumberOfItemsSelectContext();
  const { PaginationOutlined, page } = usePaginationOutlinedContext();
  const { watchlistIds, infoLoaded } = useUserWatchlistContext();

  useEffect(() => {
    const getCoinInfoCoinGecko = async (page, itemsPerPage) => {
      const resp = await CoinGeckoApi.getCoins(
        page,
        itemsPerPage,
        watchlistIds
      );
      console.debug({ watchlistIds, resp });
      setCoins(resp);
    };
    // getUserCoins();
    getCoinInfoCoinGecko(page, itemsPerPage);
    setIsLoading(false);
  }, [page, itemsPerPage, infoLoaded]);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

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
          <PaginationOutlined
            itemsPerPage={itemsPerPage}
            totalItems={watchlistIds?.length}
          />
        </Grid>
      </Container>
    </div>
  );
};

export default WatchList;
