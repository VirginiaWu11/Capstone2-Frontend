import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const ChangeCard = ({
  title = "Title",
  amount = 0,
  percent = "0.01%",
  time = "24hours ago",
}) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            {title}
          </Typography>
          {amount > 0 ? (
            <Typography color="success.main" variant="h4">
              +{amount.toLocaleString()}
            </Typography>
          ) : (
            <Typography color="error.main" variant="h4">
              {amount.toLocaleString()}
            </Typography>
          )}
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: amount > 0 ? "success.main" : "error.main",
              height: 56,
              width: 56,
            }}
          >
            <AttachMoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        {amount > 0 ? (
          <ArrowUpwardIcon color="success" />
        ) : (
          <ArrowDownwardIcon color="error" />
        )}

        <Typography
          color={amount > 0 ? "success.main" : "error.main"}
          sx={{
            mr: 1,
          }}
          variant="body2"
        >
          {percent}
        </Typography>
        <Typography color="textSecondary" variant="caption">
          Since {time}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
