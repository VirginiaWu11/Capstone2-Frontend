import { useEffect, useState } from "react";
import CoinGeckoApi from "../CoinGeckoApi";
import CoinsCardList from "./CoinsCardList";
import Grid from "@mui/material/Grid";
// import SearchForm from "../common/SearchForm";
import Container from "@mui/material/Container";
import CoinTable from "./CoinTable";
import { useListModuleToggleButtonsContext } from "./ListModuleToggleButtonsContext";
import { useNumberOfItemsSelectContext } from "./NumberOfItemsSelectContext";
import { usePaginationOutlinedContext } from "./PaginationOutlinedContext";

const CoinList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const { ListModuleToggleButtons, view } = useListModuleToggleButtonsContext();
  const { NumberOfItemsSelect, itemsPerPage } = useNumberOfItemsSelectContext();
  const { PaginationOutlined, page } = usePaginationOutlinedContext();

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
          <PaginationOutlined itemsPerPage={itemsPerPage} />
        </Grid>
      </Container>
    </div>
  );
};

export default CoinList;
