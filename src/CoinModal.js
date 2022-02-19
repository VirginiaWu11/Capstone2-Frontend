import React, { useState, useEffect, memo } from "react";

import { CoinChart } from "./coins/CoinChart";
import CoinGeckoApi from "./CoinGeckoApi";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";

const CoinModal = memo(
  ({
    clickedCoin,
    isPinned,
    isOnPortfolio,
    closeCoinModalOpenPortfolioModal,
    coinModalOpen,
    handleUnpin,
    handlePin,
    removeFromPortfolio,
    handleCoinModalClose,
  }) => {
    const [chartDaysView, setChartDaysView] = useState(7);
    const [coinData, setCoinData] = useState([]);

    useEffect(() => {
      const getCoinMarketData = async (id, days) => {
        const resp = await CoinGeckoApi.getCoinMarketChart(id, days);
        setCoinData(resp);
      };
      if (clickedCoin.id) {
        getCoinMarketData(clickedCoin.id, chartDaysView);
      }
    }, [clickedCoin.id, chartDaysView]);

    const ChartDaysToggleButtons = () => {
      const handleChange = (event, nextView) => {
        setChartDaysView(nextView);
      };

      return (
        <ToggleButtonGroup
          value={chartDaysView}
          exclusive
          onChange={handleChange}
          sx={{ ml: 1, mt: 2 }}
        >
          <ToggleButton value={7} aria-label="list">
            7 Days
          </ToggleButton>
          <ToggleButton value={14} aria-label="module">
            14 Days
          </ToggleButton>
          <ToggleButton value={30} aria-label="module">
            30 Days
          </ToggleButton>
          <ToggleButton value={90} aria-label="module">
            90 Days
          </ToggleButton>
        </ToggleButtonGroup>
      );
    };

    return (
      <div>
        <Dialog
          open={coinModalOpen}
          onClose={handleCoinModalClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">
            {clickedCoin.name}
            <DialogContentText variant="h6">
              Current Price:
              <strong>
                {" $"}
                {clickedCoin.current_price?.toLocaleString()}
              </strong>
            </DialogContentText>
          </DialogTitle>
          <DialogContent>
            <Grid
              container
              spacing={{
                xs: 0,
                sm: 2,
                md: 5,
              }}
            >
              <Grid item xl={4} lg={4} sm={6} xs={12}>
                <DialogContentText
                  id="dialog-description"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  Market Cap:
                  <strong>
                    {" $"}
                    {clickedCoin.market_cap?.toLocaleString()}
                  </strong>
                </DialogContentText>

                <DialogContentText
                  id="dialog-description"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  24Hr Trading Volume:
                  <strong>
                    {" $"}
                    {clickedCoin.total_volume?.toLocaleString()}
                  </strong>
                </DialogContentText>
                <DialogContentText
                  id="dialog-description"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  Fully Diluted Valuation:
                  <strong>
                    {clickedCoin.fully_diluted_valuation
                      ? " $" +
                        clickedCoin.fully_diluted_valuation?.toLocaleString()
                      : null}
                  </strong>
                </DialogContentText>
              </Grid>
              <Grid item xl={4} lg={4} sm={6} xs={12}>
                <DialogContentText
                  id="dialog-description"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  Circulating supply:{" "}
                  <strong>
                    {clickedCoin.circulating_supply?.toLocaleString()}
                  </strong>
                </DialogContentText>
                <DialogContentText
                  id="dialog-description"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  Total Supply:{" "}
                  <strong>{clickedCoin.total_supply?.toLocaleString()}</strong>
                </DialogContentText>
                <DialogContentText
                  id="dialog-description"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  Max Supply:{" "}
                  <strong>{clickedCoin.max_supply?.toLocaleString()}</strong>
                </DialogContentText>
              </Grid>
            </Grid>
          </DialogContent>

          <ChartDaysToggleButtons />
          <DialogContent>
            {coinData.prices ? (
              <CoinChart
                coinData={coinData.prices}
                maintainAspectRatio={true}
              />
            ) : null}
          </DialogContent>

          <DialogActions>
            {isPinned ? (
              <Button onClick={() => handleUnpin(clickedCoin.id)}>
                Unpin from Watchlist
              </Button>
            ) : (
              <Button onClick={() => handlePin(clickedCoin.id)}>
                Pin to Watchlist
              </Button>
            )}
            {isOnPortfolio ? (
              <Button
                onClick={() => removeFromPortfolio(clickedCoin.id)}
                autoFocus
              >
                Remove from Portfolio
              </Button>
            ) : (
              <Button
                onClick={() => closeCoinModalOpenPortfolioModal(clickedCoin)}
                autoFocus
              >
                Add to Portfolio
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
);

export default CoinModal;
