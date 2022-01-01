import React, { useState, useContext, useEffect } from "react";
import { CoinChart } from "./CoinChart";
import CoinGeckoApi from "../CoinGeckoApi";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const ModalContext = React.createContext();

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

export const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [clickedCoin, setClickedCoin] = useState({});
  const [coinData, setCoinData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getCoinMarketData = async (id) => {
      const resp = await CoinGeckoApi.getCoinMarketChart(id);
      setCoinData(resp);
    };
    getCoinMarketData(clickedCoin.id);
    setIsLoading(false);
  }, [clickedCoin.id]);

  //   if (isLoading) {
  //     return <p>Loading &hellip;</p>;
  //   }
  console.debug({ clickedCoin, isLoading }, coinData.prices);

  const CoinModal = () => {
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">{clickedCoin.name}</DialogTitle>
          <DialogContent>
            <DialogContentText id="dialog-description">
              Market Cap: <strong>{clickedCoin.market_cap}</strong>
            </DialogContentText>
            <DialogContentText id="dialog-description">
              Current Price: <strong>{clickedCoin.current_price}</strong>
            </DialogContentText>
            <DialogContentText id="dialog-description">
              24Hr Trading Volume: <strong>{clickedCoin.total_volume}</strong>
            </DialogContentText>
            <DialogContentText id="dialog-description">
              Fully Diluted Valuation:{" "}
              <strong>{clickedCoin.fully_diluted_valuation}</strong>
            </DialogContentText>
            <DialogContentText id="dialog-description">
              Circulating supply:{" "}
              <strong>{clickedCoin.circulating_supply}</strong>
            </DialogContentText>
            <DialogContentText id="dialog-description">
              Total Supply: <strong>{clickedCoin.total_supply}</strong>
            </DialogContentText>
            <DialogContentText id="dialog-description">
              Max Supply: <strong>{clickedCoin.max_supply}</strong>
            </DialogContentText>
          </DialogContent>
          <DialogContent>
            {coinData.prices ? <CoinChart coinData={coinData.prices} /> : null}
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Pin to Watchlist</Button>
            <Button onClick={handleClose} autoFocus>
              Add to Dashboard
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  const value = {
    CoinModal,
    open,
    setOpen,
    handleOpen,
    handleClose,
    clickedCoin,
    setClickedCoin,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
