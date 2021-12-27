import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import CoinCard from "./CoinCard";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CoinsCardList = ({ coins }) => {
  const [open, setOpen] = React.useState(false);
  const [clickedCoin, setClickedCoin] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Container maxWidth="xl">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
          justifyContent="center"
          p={2}
        >
          {coins.map((coin) => (
            <Grid item xs={3} sm={3} md={3} lg={3}>
              <CardActionArea
                component={Button}
                onClick={() => {
                  handleOpen();
                  setClickedCoin(coin);
                }}
              >
                <CoinCard key={coin.id} coin={coin} />{" "}
              </CardActionArea>
            </Grid>
          ))}{" "}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {clickedCoin.name}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                details - chart placeholder
              </Typography>
            </Box>
          </Modal>
        </Grid>
      </Container>
    </div>
  );
};

export default CoinsCardList;
