import Grid from "@mui/material/Grid";
import CoinCard from "./CoinCard";

const CoinsCardList = ({ coins }) => {
  return (
    <div>
      <Grid container spacing={1} justifyContent="center" p={2}>
        {coins.map((coin) => (
          <Grid item xs={8}>
            <CoinCard key={coin.id} coin={coin} />{" "}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CoinsCardList;
