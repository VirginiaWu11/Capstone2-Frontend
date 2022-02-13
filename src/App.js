import { BrowserRouter } from "react-router-dom";
import React, { useState, useEffect, useCallback, memo } from "react";
import NavBar from "./routes-nav/NavBar";
import Box from "@mui/material/Box";
import LoadingSpinner from "./common/LoadingSpinner";
import { useUserContext } from "./auth/UserContext";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import CoinList from "./coins/CoinList";
import AssetList from "./portfolio/Portfolio";
import SigninForm from "./auth/SigninForm";
import SignupForm from "./auth/SignupForm";
import ProfileForm from "./ProfileForm";
import PrivateRoute from "./routes-nav/PrivateRoute";
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
import BackendApi from "./api";
import StickyFooter from "./StickyFooter";
import Grid from "@mui/material/Grid";
import PortfolioForm from "./portfolio/PortfolioForm";

export const TOKEN_STORAGE_ID = "coinWallet-token";

function App() {
  console.debug("App rendered");
  const { infoLoaded } = useUserContext();
  const [coinModalOpen, setCoinModalOpen] = useState(false);
  const [clickedCoin, setClickedCoin] = useState({});
  // const [isLoading, setIsLoading] = useState(true);
  const [watchlistIds, setWatchlistIds] = useState();
  const [portfolioCoins, setPortfolioCoins] = useState();
  const [portfolioModalopen, setPortfolioModalOpen] = useState(false);
  const [portfolioModalCoin, setPortfolioModalCoin] = useState();

  console.debug("portfolioModalopen:", portfolioModalopen);
  useEffect(
    function loadUserPortfolio() {
      async function getUserPortfolio() {
        try {
          let idsResp = await BackendApi.get_user_portfolio();
          setPortfolioCoins(idsResp);
          console.debug("setPortfolioCoins in useeffect line 45", idsResp);
        } catch (err) {
          console.error("App loadUserPortfolio: problem loading", err);
        }
      }
      getUserPortfolio();
    },
    [setPortfolioCoins, infoLoaded]
  );

  useEffect(
    function loadUserWatchlist() {
      async function getUserWatchlist() {
        try {
          let idsResp = await BackendApi.get_user_watchlist();
          setWatchlistIds(idsResp);
          console.debug("setWatchlistIds in useeffect line 41", idsResp);
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
        }
      }
      getUserWatchlist();
    },
    [setWatchlistIds, infoLoaded]
  );

  console.debug(
    "setWatchlistIds after useeffect in app line 55=",
    watchlistIds
  );

  const isPinned = (id) => {
    return watchlistIds?.includes(id);
  };

  const handleCoinModalOpen = useCallback(async (coin) => {
    setClickedCoin(coin);
    setCoinModalOpen(true);
  }, []);

  const handleCoinModalClose = useCallback(() => setCoinModalOpen(false), []);

  const handlePin = useCallback(
    (id) => {
      BackendApi.pin(id);
      setWatchlistIds([...watchlistIds, id]);
      handleCoinModalClose();
    },
    [handleCoinModalClose, setWatchlistIds, watchlistIds]
  );

  const handleUnpin = useCallback(
    (id) => {
      BackendApi.unpin(id);
      setWatchlistIds(watchlistIds.filter((watchlistId) => watchlistId !== id));
      handleCoinModalClose();
    },
    [handleCoinModalClose, setWatchlistIds, watchlistIds]
  );

  const handlePortfolioModalOpen = (coin) => {
    setPortfolioModalCoin(coin);
    setPortfolioModalOpen(true);
  };

  const closeCoinModalOpenPortfolioModal = (coin) => {
    setCoinModalOpen(false);
    handlePortfolioModalOpen(coin);
  };

  const handlePortfolioModalClose = () => {
    setPortfolioModalOpen(false);
  };

  const addToPortfolio = useCallback(
    (id, quantity) => {
      BackendApi.addAssets(id, quantity);
      setPortfolioCoins([
        ...portfolioCoins,
        { coinGeckoId: id, quantity: quantity },
      ]);
    },
    [portfolioCoins]
  );

  const removeFromPortfolio = useCallback(
    (id) => {
      BackendApi.removeAssets(id);
      setPortfolioCoins(
        portfolioCoins.filter((coin) => coin.coinGeckoId !== id)
      );
      handleCoinModalClose();
    },
    [handleCoinModalClose, setPortfolioCoins, portfolioCoins]
  );

  // console.debug("Modal in App:", { clickedCoin, isLoading }, { open });

  const CoinModal = memo(
    ({
      clickedCoin,
      isPinned,
      isOnPortfolio,
      closeCoinModalOpenPortfolioModal,
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

      console.debug("CoinModal Rendered");
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
                    <strong>
                      {clickedCoin.total_supply?.toLocaleString()}
                    </strong>
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

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <div className="App">
      <BrowserRouter>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <NavBar handleCoinModalOpen={handleCoinModalOpen} />
          {clickedCoin ? (
            <CoinModal
              closeCoinModalOpenPortfolioModal={
                closeCoinModalOpenPortfolioModal
              }
              clickedCoin={clickedCoin}
              isPinned={isPinned(clickedCoin.id)}
              isOnPortfolio={portfolioCoins
                ?.map((element) => element.coinGeckoId)
                ?.includes(clickedCoin.id)}
            />
          ) : null}
          <PortfolioForm
            portfolioModalopen={portfolioModalopen}
            handlePortfolioModalClose={handlePortfolioModalClose}
            portfolioModalCoin={portfolioModalCoin}
            addToPortfolio={addToPortfolio}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/signin" element={<SigninForm />} />
              <Route exact path="/signup" element={<SignupForm />} />
              <Route
                exact
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfileForm />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/coins"
                element={
                  <PrivateRoute>
                    <CoinList
                      isPinned={isPinned}
                      handleUnpin={handleUnpin}
                      handlePin={handlePin}
                      watchlistIds={watchlistIds}
                      handleCoinModalOpen={handleCoinModalOpen}
                    />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/portfolio"
                element={
                  <PrivateRoute>
                    <AssetList portfolioIds={watchlistIds} />
                  </PrivateRoute>
                }
              />
              <Route element={<p>not found</p>}></Route>
            </Routes>
          </Box>
          <StickyFooter />
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default App;
