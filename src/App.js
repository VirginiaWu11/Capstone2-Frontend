import { BrowserRouter } from "react-router-dom";
import React from "react";
import AllRoutes from "./routes-nav/AllRoutes";
import NavBar from "./routes-nav/NavBar";
import Box from "@mui/material/Box";
import LoadingSpinner from "./common/LoadingSpinner";
import { useUserContext } from "./auth/UserContext";
import { ModalProvider } from "./coins/ModalContext";
import { ListModuleToggleButtonsProvider } from "./coins/ListModuleToggleButtonsContext";
import { NumberOfItemsSelectProvider } from "./coins/NumberOfItemsSelectContext";
import { PaginationOutlinedProvider } from "./coins/PaginationOutlinedContext";
import { UserWatchlistProvider } from "./watchlist/UserWatchlistContext";

export const TOKEN_STORAGE_ID = "coinWallet-token";

function App() {
  const { infoLoaded } = useUserContext();

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <div className="App">
      <BrowserRouter>
        <UserWatchlistProvider>
          <ListModuleToggleButtonsProvider>
            <NumberOfItemsSelectProvider>
              <PaginationOutlinedProvider>
                <ModalProvider>
                  <NavBar />
                  <Box sx={{ flexGrow: 1 }}>
                    <AllRoutes />
                  </Box>
                </ModalProvider>
              </PaginationOutlinedProvider>
            </NumberOfItemsSelectProvider>
          </ListModuleToggleButtonsProvider>
        </UserWatchlistProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
