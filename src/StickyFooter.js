import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import Grid from "@mui/material/Grid";

function Footer() {
  return (
    <Typography variant="body1" color="text.secondary">
      {"Virginia Wu, 2022   "}
      <Link
        color="inherit"
        href="https://github.com/VirginiaWu11/Capstone2"
        target="_blank"
        rel="noopener"
      >
        <GitHubIcon />
      </Link>
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <>
      <CssBaseline />

      <Box
        component="footer"
        justifyContent="center"
        direction="column"
        alignItems="center"
        sx={{
          py: 1,
          mt: "auto",
          backgroundColor: (theme) => theme.palette.grey[200],
        }}
      >
        <Grid container justifyContent="center">
          <Footer />
        </Grid>
      </Box>
    </>
  );
}
