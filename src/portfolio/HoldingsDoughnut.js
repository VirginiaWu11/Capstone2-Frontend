import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";

import CardMedia from "@mui/material/CardMedia";

ChartJS.register(ArcElement, Tooltip, Legend);

export const HoldingsDoughnut = ({ portfolioDonutData, currentTotalValue }) => {
  const theme = useTheme();

  if (portfolioDonutData.some((e) => e === undefined)) {
    return <></>;
  }

  const data = {
    datasets: [
      {
        data: portfolioDonutData.map((el) => el.value),
        backgroundColor: ["#3F51B5", "#e53935", "#FB8C00"],
        borderWidth: 8,
        borderColor: "#FFFFFF",
        hoverBorderColor: "#FFFFFF",
      },
    ],
    labels: portfolioDonutData.map((el) => el.name),
  };

  const options = {
    animation: true,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  const coinTypes = [
    {
      title: portfolioDonutData[0]?.name,
      value: ((portfolioDonutData[0]?.value / currentTotalValue) * 100).toFixed(
        0
      ),
      color: "#3F51B5",
      image: portfolioDonutData[0]?.logo,
    },
    {
      title: portfolioDonutData[1]?.name,
      value: ((portfolioDonutData[1]?.value / currentTotalValue) * 100).toFixed(
        0
      ),
      color: "#E53935",
      image: portfolioDonutData[1]?.logo,
    },
    {
      title: portfolioDonutData[2]?.name,
      value: ((portfolioDonutData[2]?.value / currentTotalValue) * 100).toFixed(
        0
      ),
      color: "#FB8C00",
      image: portfolioDonutData[2]?.logo,
    },
  ];

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Holdings" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: "relative",
          }}
        >
          <Doughnut data={data} options={options} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
          {coinTypes.map(({ color, image, title, value }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: "center",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  display: "inline",
                  width: "2em",
                }}
                image={image}
                alt={`${title} logo`}
              />
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h4">
                {value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
