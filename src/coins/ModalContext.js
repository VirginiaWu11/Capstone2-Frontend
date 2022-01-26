import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  memo,
} from "react";
import { CoinChart } from "./CoinChart";
import CoinGeckoApi from "../CoinGeckoApi";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import BackendApi from "../api";

export const ModalContext = React.createContext();

export const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [clickedCoin, setClickedCoin] = useState({});
  const [coinData, setCoinData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState(7);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => setOpen(false), []);

  const handlePin = useCallback(() => {
    BackendApi.pin(clickedCoin.id);
    handleClose();
  }, [clickedCoin.id, handleClose]);

  useEffect(() => {
    const getCoinMarketData = async (id, days) => {
      const resp = await CoinGeckoApi.getCoinMarketChart(id, days);
      setCoinData(resp);
    };
    if (clickedCoin.id) {
      getCoinMarketData(clickedCoin.id, view);
      setIsLoading(false);
    }
  }, [clickedCoin.id, view]);

  //   if (isLoading) {
  //     return <p>Loading &hellip;</p>;
  //   }
  console.debug("Modal Context:", { clickedCoin, isLoading }, { coinData });

  const VerticalToggleButtons = () => {
    const handleChange = (event, nextView) => {
      setView(nextView);
    };

    return (
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleChange}
        sx={{ ml: 1, mt: 2 }}
      >
        <ToggleButton value={7} aria-label="list">
          7 Days
        </ToggleButton>
        <ToggleButton value={14} aria-label="module">
          14 Days
        </ToggleButton>
        <ToggleButton value={30} aria-label="module">
          30 Days
        </ToggleButton>
        <ToggleButton value={90} aria-label="module">
          90 Days
        </ToggleButton>
      </ToggleButtonGroup>
    );
  };

  const CoinModal = memo(() => {
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
              Market Cap:{" "}
              <strong>{clickedCoin.market_cap?.toLocaleString()}</strong>
            </DialogContentText>
            <DialogContentText id="dialog-description">
              Current Price:{" "}
              <strong>{clickedCoin.current_price?.toLocaleString()}</strong>
            </DialogContentText>
            <DialogContentText id="dialog-description">
              24Hr Trading Volume:{" "}
              <strong>{clickedCoin.total_volume?.toLocaleString()}</strong>
            </DialogContentText>
            <DialogContentText id="dialog-description">
              Fully Diluted Valuation:{" "}
              <strong>
                {clickedCoin.fully_diluted_valuation?.toLocaleString()}
              </strong>
            </DialogContentText>
            <DialogContentText id="dialog-description">
              Circulating supply:{" "}
              <strong>
                {clickedCoin.circulating_supply?.toLocaleString()}
              </strong>
            </DialogContentText>
            <DialogContentText id="dialog-description">
              Total Supply:{" "}
              <strong>{clickedCoin.total_supply?.toLocaleString()}</strong>
            </DialogContentText>
            <DialogContentText id="dialog-description">
              Max Supply:{" "}
              <strong>{clickedCoin.max_supply?.toLocaleString()}</strong>
            </DialogContentText>
          </DialogContent>
          <VerticalToggleButtons />
          <DialogContent>
            {coinData.prices ? <CoinChart coinData={coinData.prices} /> : null}
          </DialogContent>

          <DialogActions>
            <Button onClick={handlePin}>Pin to Watchlist</Button>
            <Button onClick={handleClose} autoFocus>
              Add to Dashboard
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  });

  const value = useMemo(
    () => ({
      CoinModal,
      open,
      setOpen,
      handleOpen,
      handleClose,
      clickedCoin,
      setClickedCoin,
    }),
    [
      CoinModal,
      open,
      setOpen,
      handleOpen,
      handleClose,
      clickedCoin,
      setClickedCoin,
    ]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
