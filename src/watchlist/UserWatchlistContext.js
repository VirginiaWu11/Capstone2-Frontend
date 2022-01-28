import React, { useState, useContext, useEffect, useMemo } from "react";
import BackendApi from "../api";

export const UserWatchlistContext = React.createContext();

export const UserWatchlistProvider = ({ children }) => {
  const [watchlistIds, setWatchlistIds] = useState();
  const [infoLoaded, setInfoLoaded] = useState(false);

  useEffect(
    function loadUserWatchlist() {
      async function getUserWatchlist() {
        try {
          let idsResp = await BackendApi.get_user_watchlist();
          setWatchlistIds(idsResp);
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
        }
        setInfoLoaded(true);
      }
      setInfoLoaded(false);
      getUserWatchlist();
    },
    [setWatchlistIds]
  );

  console.debug("App useEffect loadUserWatchlist", "ids=", watchlistIds);

  const value = useMemo(
    () => ({ watchlistIds, infoLoaded, setWatchlistIds }),
    [infoLoaded, watchlistIds, setWatchlistIds]
  );

  return (
    <UserWatchlistContext.Provider value={value}>
      {children}
    </UserWatchlistContext.Provider>
  );
};

export const useUserWatchlistContext = () => useContext(UserWatchlistContext);
