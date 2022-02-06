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

export const TOKEN_STORAGE_ID = "coinWallet-token";

function App() {
  console.debug("App rendered");
  const { infoLoaded } = useUserContext();
  const [open, setOpen] = useState(false);
  const [clickedCoin, setClickedCoin] = useState({});
  // const [isLoading, setIsLoading] = useState(true);
  const [watchlistIds, setWatchlistIds] = useState();

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

  const handleOpen = useCallback(async (coin) => {
    setClickedCoin(coin);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => setOpen(false), []);

  const handlePin = useCallback(() => {
    BackendApi.pin(clickedCoin.id);
    setWatchlistIds([...watchlistIds, clickedCoin.id]);
    handleClose();
  }, [clickedCoin.id, handleClose, setWatchlistIds, watchlistIds]);

  const handleUnpin = useCallback(() => {
    BackendApi.unpin(clickedCoin.id);
    setWatchlistIds(
      watchlistIds.filter((watchlistId) => watchlistId !== clickedCoin.id)
    );
    handleClose();
  }, [clickedCoin.id, handleClose, setWatchlistIds, watchlistIds]);

  // console.debug("Modal in App:", { clickedCoin, isLoading }, { open });

  const CoinModal = memo(({ clickedCoin, isPinned }) => {
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
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">{clickedCoin.name}</DialogTitle>
          <DialogContent>
            <DialogContentText id="dialog-description">
              Market Cap:{" "}
              <strong>{clickedCoin.market_cap?.toLocaleString()}</strong>
            </DialogContentText>
            <DialogContentText id="dialog-description">
              Current Price:{" "}
              <strong>{clickedCoin.current_price?.toLocaleString()}</strong>
            </DialogContentText>
            <DialogContentText id="dialog-description">
              24Hr Trading Volume:{" "}
              <strong>{clickedCoin.total_volume?.toLocaleString()}</strong>
            </DialogContentText>
            <DialogContentText id="dialog-description">
              Fully Diluted Valuation:{" "}
              <strong>
                {clickedCoin.fully_diluted_valuation?.toLocaleString()}
              </strong>
            </DialogContentText>
            <DialogContentText id="dialog-description">
              Circulating supply:{" "}
              <strong>
                {clickedCoin.circulating_supply?.toLocaleString()}
              </strong>
            </DialogContentText>
            <DialogContentText id="dialog-description">
              Total Supply:{" "}
              <strong>{clickedCoin.total_supply?.toLocaleString()}</strong>
            </DialogContentText>
            <DialogContentText id="dialog-description">
              Max Supply:{" "}
              <strong>{clickedCoin.max_supply?.toLocaleString()}</strong>
            </DialogContentText>
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
              <Button onClick={handleUnpin}>Unpin from Watchlist</Button>
            ) : (
              <Button onClick={handlePin}>Pin to Watchlist</Button>
            )}
            <Button onClick={handleClose} autoFocus>
              Add to Portfolio
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  });

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
          <NavBar handleOpen={handleOpen} />
          {clickedCoin ? (
            <CoinModal
              clickedCoin={clickedCoin}
              isPinned={watchlistIds?.includes(clickedCoin.id)}
            />
          ) : null}

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
                      watchlistIds={watchlistIds}
                      handleOpen={handleOpen}
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
