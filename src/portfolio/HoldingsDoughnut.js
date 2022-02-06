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
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PhoneIcon from "@mui/icons-material/Phone";
import TabletIcon from "@mui/icons-material/Tablet";
import CardMedia from "@mui/material/CardMedia";

ChartJS.register(ArcElement, Tooltip, Legend);

export const HoldingsDoughnut = (props) => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [63, 15, 22],
        backgroundColor: ["#3F51B5", "#e53935", "#FB8C00"],
        borderWidth: 8,
        borderColor: "#FFFFFF",
        hoverBorderColor: "#FFFFFF",
      },
    ],
    labels: ["Bitcoin", "Ethereum", "Other"],
  };

  const options = {
    animation: false,
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

  const devices = [
    {
      title: "Bitcoin",
      value: 63,
      icon: LaptopMacIcon,
      color: theme.palette.secondary.main,
      image:
        "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    },
    {
      title: "Ethereum",
      value: 15,
      icon: TabletIcon,
      color: "#E53935",
      image:
        "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
    },
    {
      title: "Other",
      value: 23,
      icon: PhoneIcon,
      color: "#FB8C00",
      image:
        "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    },
  ];

  return (
    <Card {...props}>
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
          {devices.map(({ color, icon: Icon, image, title, value }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: "center",
              }}
            >
              {/* <Icon color="action" /> */}
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
