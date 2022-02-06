import { Box, Card, CardContent, CardHeader, Divider } from "@mui/material";
import { tempCoinData } from "../tempCoinData";
import { CoinChart } from "../coins/CoinChart";

export const PortfolioLineChart = (props) => {
  return (
    <Card {...props}>
      <CardHeader title="Portfolio Value" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 500,
            position: "relative",
          }}
        >
          <CoinChart
            coinData={tempCoinData.prices}
            maintainAspectRatio={false}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
