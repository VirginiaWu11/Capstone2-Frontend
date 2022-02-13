import { Box, Card, CardContent, CardHeader, Divider } from "@mui/material";
import { CoinChart } from "../coins/CoinChart";

export const PortfolioLineChart = ({ portfolioCoinData }) => {
  return (
    <Card>
      <CardHeader title="Portfolio Value" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 500,
            position: "relative",
          }}
        >
          <CoinChart coinData={portfolioCoinData} maintainAspectRatio={false} />
        </Box>
      </CardContent>
    </Card>
  );
};
