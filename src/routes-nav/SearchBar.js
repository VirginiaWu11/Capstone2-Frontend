import React, { useCallback, useMemo } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import debounce from "lodash.debounce";
import BackendApi from "../api";
import CoinGeckoApi from "../CoinGeckoApi";

export default function SearchBar({ handleCoinModalOpen }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const onChange = useCallback(
    async (event, value) => {
      if (value) {
        let res = await CoinGeckoApi.getCoins(1, 1, [value.coinGeckoId]);
        handleCoinModalOpen(() => res[0]);
      }
    },
    [handleCoinModalOpen]
  );

  const debouncedChangeHandler = useMemo(() => {
    const changeHandler = async (event) => {
      if (event) {
        searchedCoins = await BackendApi.search(
          event.target.value.toLowerCase()
        );
        setOptions(searchedCoins);
      }
    };
    return debounce(changeHandler, 300);
  }, []);

  return (
    <>
      <Autocomplete
        onChange={onChange}
        size="small"
        id="asynchronous-demo"
        sx={{ width: 400, m: "auto", backgroundColor: "whitesmoke" }}
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
            variant="filled"
            {...params}
            label="Search All Coins"
            onChange={debouncedChangeHandler}
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
    </>
  );
}

let searchedCoins = [];
