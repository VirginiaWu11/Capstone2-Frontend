import { Box, Container, Grid } from "@mui/material";
import { PortfolioLineChart } from "./PortfolioLineChart";
import { ChangeCard } from "./ChangeCard";
import { TotalCard } from "./TotalCard";
import { HoldingsTable } from "./HoldingsTable";
import { HoldingsDoughnut } from "./HoldingsDoughnut";

const Portfolio = () => (
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TotalCard title="Current Total Value" amount={50000} />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <ChangeCard
              title="One Hour"
              amount={-10000}
              percent="5%"
              time="1 hour ago"
            />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <ChangeCard
              title="One Day"
              amount={20000}
              percent="10%"
              time="24 hours ago"
            />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <ChangeCard
              title="One Week"
              amount={13000}
              percent="7%"
              time="7 days ago"
            />
          </Grid>
          <Grid item xl={9} lg={8} md={6} xs={12}>
            <PortfolioLineChart />
          </Grid>
          <Grid item xl={3} lg={4} md={6} xs={12}>
            <HoldingsDoughnut sx={{ height: "100%" }} />
          </Grid>
          <Grid item xl={12} lg={12} md={12} xs={12}>
            <HoldingsTable />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Portfolio;
