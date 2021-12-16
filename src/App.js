import { BrowserRouter } from "react-router-dom";
import React from "react";
import AllRoutes from "./routes-nav/AllRoutes";
import NavBar from "./routes-nav/NavBar";
import Box from "@mui/material/Box";
import LoadingSpinner from "./common/LoadingSpinner";
import { useUserContext } from "./auth/UserContext";

export const TOKEN_STORAGE_ID = "coinWallet-token";

function App() {
  const { infoLoaded } = useUserContext();

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Box sx={{ flexGrow: 1 }}>
          <AllRoutes />
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default App;
