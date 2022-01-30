import React, { useState, useMemo } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useUserContext } from "../auth/UserContext";
import SearchBar from "./SearchBar";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const NavBar = () => {
  console.debug("NavBar rendered");
  const { currentUser, signout } = useUserContext();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const signedInRoutes = useMemo(
    () => [
      { name: "Coins", link: "/coins", activeIndex: 0 },
      { name: "Portfolio", link: "/portfolio", activeIndex: 1 },
      { name: "Profile", link: "/profile", activeIndex: 2 },
    ],
    []
  );

  const signedOutRoutes = useMemo(
    () => [
      { name: "Sign In", link: "/signin", activeIndex: 0 },
      { name: "Sign Up", link: "/signup", activeIndex: 1 },
    ],
    []
  );

  const tabs = (
    <Tabs
      value={value}
      onChange={handleChange}
      textColor="inherit"
    >
      {signedInRoutes.map((route, index) => (
        <Tab
          component={Link}
          to={route.link}
          label={route.name}
          aria-owns={route.ariaOwns}
          aria-haspopup={route.ariaPopup}
          onMouseOver={route.mouseOver}
          key={`${route}${index}`}
        />
      ))}
    </Tabs>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        <div /* className={classes.toolbarMargin} */ />
        <List >
          <ListItemButton>
            <Box sx={{ m: "auto" }}>
              <SearchBar />
            </Box>
          </ListItemButton>
          {signedInRoutes.map((route, index) => (
            <ListItemButton
              key={`${route}${route.activeIndex}`}
              divider
              button
              component={Link}
              to={route.link}
              selected={value === route.activeIndex}
              onClick={() => {
                setOpenDrawer(false);
                setValue(route.activeIndex);
              }}
            >{console.log(value,route.activeIndex,value === route.activeIndex)}
              <ListItemText >
                {route.name}
              </ListItemText>
            </ListItemButton>
          ))}
          <ListItemButton
            component={Link}
            to="/"
            onClick={signout}
          >
            <ListItemText>Logout</ListItemText>
          </ListItemButton>
        </List>
      </SwipeableDrawer>
      <IconButton
        color="inherit"
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon
        sx={{
            height: "40px",
            width: "40px",
          }}
        />
      </IconButton>
    </React.Fragment>
  );

  const signedInNav = () => {
    return (
      <>
        {matches ? (
          <>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Button size="large" component={Link} to="/" color="inherit">
                CoinWallet
              </Button>
            </Typography>

            {drawer}
          </>
        ) : (
          <>
            <Typography
              variant="h6"
              component="div" 
            >
              <Button size="large" component={Link} to="/" color="inherit">
                CoinWallet
              </Button>
            </Typography>
            <Box sx={{ m: "auto" }}>
              <SearchBar />
            </Box>
            {tabs}
            <Button
              component={Link}
              to="/"
              color="inherit"
              onClick={signout}
              sx={{ opacity: "0.6" }}
            >
              Logout
            </Button>
          </>
        )}
      </>
    );
  };

  const signedOutNav = () => {
    return (
      <>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Button size="large" component={Link} to="/" color="inherit">
            CoinWallet
          </Button>
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          // indicatorColor="primary"
        >
          {signedOutRoutes.map((route, index) => (
            <Tab
              component={Link}
              to={route.link}
              label={route.name}
              aria-owns={route.ariaOwns}
              aria-haspopup={route.ariaPopup}
              onMouseOver={route.mouseOver}
              key={`${route}${index}`}
            />
          ))}
        </Tabs>
      </>
    );
  };

  return (
    <AppBar position="sticky">
      <Toolbar>{currentUser ? signedInNav() : signedOutNav()}</Toolbar>
    </AppBar>
  );
};

export default NavBar;
