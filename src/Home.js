import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useUserContext } from "./auth/UserContext";

const theme = createTheme();

export default function Home() {
  const { currentUser } = useUserContext();
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h2">
              CoinWallet
            </Typography>
            <br />
            <Typography component="h2" variant="h5">
              Keep track of all coins in one, convenient place.
            </Typography>
            {currentUser ? (
              <Typography component="h3" variant="h3">
                Welcome Back, {currentUser.firstName || currentUser.username}
              </Typography>
            ) : (
              <Box noValidate>
                <Button
                  component={Link}
                  to="/signin"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, mx: 2 }}
                >
                  Sign In
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, mx: 2 }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
