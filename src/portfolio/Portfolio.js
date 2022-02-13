import { useEffect, useState, useCallback } from "react";
import { Box, Container, Grid } from "@mui/material";
import { PortfolioLineChart } from "./PortfolioLineChart";
import { ChangeCard } from "./ChangeCard";
import { TotalCard } from "./TotalCard";
import { HoldingsDoughnut } from "./HoldingsDoughnut";
import CoinGeckoApi from "../CoinGeckoApi";
import * as PortfolioService from "./PortfolioService";
import LoadingSpinner from "../common/LoadingSpinner";
import HoldingsTable from "./HoldingsTable";

const Portfolio = ({ portfolioCoins }) => {
  console.debug("PortfolioCoins in Portfolio:", portfolioCoins);
  const [coins, setCoins] = useState([]);
  const [currentTotalValue, setCurrentTotalValue] = useState();
  const [hoursDifferenceValue, setHoursDifferenceValue] = useState();
  const [portfolioCoinsObj, setPortfolioCoinsObj] = useState({});
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [portfolioCoinData, setPortfolioCoinData] = useState([]);

  const getCoinInfoCoinGecko = useCallback(async (portfolioCoins) => {
    let portfolioCoinsIds = portfolioCoins?.map((coin) => coin.coinGeckoId);
    console.debug("portfolioCoinsIds", portfolioCoinsIds, portfolioCoins);
    const resp = await CoinGeckoApi.getCoins(1, 1, portfolioCoinsIds, true);
    setCoins(resp);
  }, []);

  useEffect(() => {
    if (portfolioCoins) {
      setPortfolioCoinsObj(PortfolioService.arrayToObject(portfolioCoins));
      getCoinInfoCoinGecko(portfolioCoins);
    }
    setInfoLoaded(true);
  }, [getCoinInfoCoinGecko, portfolioCoins]);

  useEffect(() => {
    if (Object.keys(portfolioCoinsObj).length !== 0 && coins.length !== 0) {
      setCurrentTotalValue(
        PortfolioService.currentTotalPortfolioValue(coins, portfolioCoinsObj)
      );
      setPortfolioCoinData(
        PortfolioService.addDateToData(
          PortfolioService.portfolioCoinData(coins, portfolioCoinsObj),
          coins,
          portfolioCoinsObj
        )
      );
      setHoursDifferenceValue({
        one: PortfolioService.totalPortfolioValueDifference(
          coins,
          portfolioCoinsObj,
          1
        ),
        twentyfour: PortfolioService.totalPortfolioValueDifference(
          coins,
          portfolioCoinsObj,
          24
        ),
        onesixtythree: PortfolioService.totalPortfolioValueDifference(
          coins,
          portfolioCoinsObj,
          163
        ),
      });
    }
  }, [coins, portfolioCoinsObj]);

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalCard
                title="Current Total Value"
                amount={currentTotalValue}
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <ChangeCard
                title="One Hour"
                amount={hoursDifferenceValue?.one.priceDifference}
                percent={hoursDifferenceValue?.one.percentDifference}
                time="1 hour ago"
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <ChangeCard
                title="One Day"
                amount={hoursDifferenceValue?.twentyfour.priceDifference}
                percent={hoursDifferenceValue?.twentyfour.percentDifference}
                time="24 hours ago"
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <ChangeCard
                title="One Week"
                amount={hoursDifferenceValue?.onesixtythree.priceDifference}
                percent={hoursDifferenceValue?.onesixtythree.percentDifference}
                time="7 days ago"
              />
            </Grid>
            <Grid item xl={9} lg={8} md={6} xs={12}>
              <PortfolioLineChart portfolioCoinData={portfolioCoinData} />
            </Grid>
            <Grid item xl={3} lg={4} md={6} xs={12}>
              <HoldingsDoughnut sx={{ height: "100%" }} />
            </Grid>
            <Grid item xl={12} lg={12} md={12} xs={12}>
              {/* <HoldingsTable /> */}
              <HoldingsTable
                portfolioCoinsObj={portfolioCoinsObj}
                coins={coins}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Portfolio;
