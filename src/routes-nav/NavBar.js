import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useUserContext } from "../auth/UserContext";

export default function NavBar() {
  const { currentUser, signout } = useUserContext();
  const signedInNav = () => {
    return (
      <>
        <Button component={Link} to="/coins" color="inherit">
          Coins
        </Button>
        <Button component={Link} to="/dashboard" color="inherit">
          Dashboard
        </Button>
        <Button component={Link} to="/watchlist" color="inherit">
          Watchlist
        </Button>
        <Button component={Link} to="/profile" color="inherit">
          Profile
        </Button>
        <Button component={Link} to="/" color="inherit" onClick={signout}>
          Logout
        </Button>
      </>
    );
  };

  const signedOutNav = () => {
    return (
      <>
        <Button component={Link} to="/signin" color="inherit">
          Sign In
        </Button>
        <Button component={Link} to="/signup" color="inherit">
          Sign Up
        </Button>
      </>
    );
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button size="large" component={Link} to="/" color="inherit">
            CoinWallet
          </Button>
        </Typography>
        {currentUser ? signedInNav() : signedOutNav()}
      </Toolbar>
    </AppBar>
  );
}
