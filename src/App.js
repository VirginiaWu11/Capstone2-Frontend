import { BrowserRouter } from "react-router-dom";
import React from "react";
import NavBar from "./routes-nav/NavBar";
import Box from "@mui/material/Box";
import LoadingSpinner from "./common/LoadingSpinner";
import { useUserContext } from "./auth/UserContext";
import { ModalProvider } from "./coins/ModalContext";
import { ListModuleToggleButtonsProvider } from "./coins/ListModuleToggleButtonsContext";
import { NumberOfItemsSelectProvider } from "./coins/NumberOfItemsSelectContext";
import { PaginationOutlinedProvider } from "./coins/PaginationOutlinedContext";
import { UserWatchlistProvider } from "./watchlist/UserWatchlistContext";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import CoinList from "./coins/CoinList";
import SigninForm from "./auth/SigninForm";
import SignupForm from "./auth/SignupForm";
import ProfileForm from "./ProfileForm";
import PrivateRoute from "./routes-nav/PrivateRoute";

export const TOKEN_STORAGE_ID = "coinWallet-token";

function App() {
  console.debug("App rendered");
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
                            <CoinList />
                          </PrivateRoute>
                        }
                      />
                      <Route element={<p>not found</p>}></Route>
                    </Routes>
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
