import { BrowserRouter } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import NavBar from "./routes-nav/NavBar";
import Box from "@mui/material/Box";
import LoadingSpinner from "./common/LoadingSpinner";
import { useUserContext } from "./auth/UserContext";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import CoinList from "./coins/CoinList";
import Portfolio from "./portfolio/Portfolio";
import SigninForm from "./auth/SigninForm";
import SignupForm from "./auth/SignupForm";
import ProfileForm from "./ProfileForm";
import PrivateRoute from "./routes-nav/PrivateRoute";
import BackendApi from "./api";
import StickyFooter from "./StickyFooter";
import PortfolioForm from "./portfolio/PortfolioForm";
import CoinModal from "./CoinModal";

export const TOKEN_STORAGE_ID = "coinWallet-token";

function App() {
  const { infoLoaded, setInfoLoaded } = useUserContext();
  const [coinModalOpen, setCoinModalOpen] = useState(false);
  const [clickedCoin, setClickedCoin] = useState({});
  const [watchlistIds, setWatchlistIds] = useState();
  const [portfolioCoins, setPortfolioCoins] = useState();
  const [portfolioModalopen, setPortfolioModalOpen] = useState(false);
  const [portfolioModalCoin, setPortfolioModalCoin] = useState();

  useEffect(
    function loadUserPortfolio() {
      async function getUserPortfolio() {
        try {
          let idsResp = await BackendApi.get_user_portfolio();
          setPortfolioCoins(idsResp);
        } catch (err) {
          console.error("App loadUserPortfolio: problem loading", err);
        }
      }
      getUserPortfolio();
    },
    [setPortfolioCoins, infoLoaded, setInfoLoaded]
  );

  useEffect(
    function loadUserWatchlist() {
      async function getUserWatchlist() {
        try {
          let idsResp = await BackendApi.get_user_watchlist();
          setWatchlistIds(idsResp);
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
        }
      }
      getUserWatchlist();
    },
    [setWatchlistIds, infoLoaded]
  );

  const isPinned = (id) => {
    return watchlistIds?.includes(id);
  };

  const isOnPortfolio = (id) => {
    return portfolioCoins?.map((element) => element.coinGeckoId)?.includes(id);
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
              coinModalOpen={coinModalOpen}
              handleCoinModalClose={handleCoinModalClose}
              handleUnpin={handleUnpin}
              handlePin={handlePin}
              removeFromPortfolio={removeFromPortfolio}
              closeCoinModalOpenPortfolioModal={
                closeCoinModalOpenPortfolioModal
              }
              clickedCoin={clickedCoin}
              isPinned={isPinned(clickedCoin.id)}
              isOnPortfolio={isOnPortfolio(clickedCoin.id)}
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
                      isOnPortfolio={isOnPortfolio}
                      removeFromPortfolio={removeFromPortfolio}
                      handlePortfolioModalOpen={handlePortfolioModalOpen}
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
                    {portfolioCoins ? (
                      <Portfolio
                        portfolioIds={watchlistIds}
                        portfolioCoins={portfolioCoins}
                        isOnPortfolio={isOnPortfolio}
                        removeFromPortfolio={removeFromPortfolio}
                        handlePortfolioModalOpen={handlePortfolioModalOpen}
                      />
                    ) : null}
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
