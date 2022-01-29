import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useModalContext } from "../coins/ModalContext";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function SearchBar() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const { CoinModal, handleOpen, clickedCoin, setClickedCoin } =
    useModalContext();

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...topCoins]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const onChange = (event, value) => {
    if (value) {
      setClickedCoin(() => ({ id: value.coinGeckoId, name: value.name }));
      handleOpen();
    }
  };

  return (
    <>
      <Autocomplete
        onChange={onChange}
        id="asynchronous-demo"
        sx={{ width: 400, m: "auto", backgroundColor: "white" }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search All Coins"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <CoinModal />
    </>
  );
}

const topCoins = [
  { name: "Bitcoin", symbol: "BTC", coinGeckoId: "bitcoin" },
  { name: "Ethereum", symbol: "", coinGeckoId: "ethereum" },
  { name: "Tether", symbol: "", coinGeckoId: "tetherf" },
];
