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
import ScheduleIcon from "@mui/icons-material/Schedule";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DateRangeIcon from "@mui/icons-material/DateRange";

export const ChangeCard = ({
  title = "Title",
  amount = 0,
  percent = "0.01",
  time = "24hours ago",
}) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {title}
            </Typography>
            {amount > 0 ? (
              <Typography color="success.main" variant="h4">
                +{" $" + amount.toLocaleString()}
              </Typography>
            ) : (
              <Typography color="error.main" variant="h4">
                -{" $" + Math.abs(amount).toLocaleString()}
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
              {title === "One Hour" ? (
                <ScheduleIcon />
              ) : title === "One Day" ? (
                <CalendarTodayIcon />
              ) : (
                <DateRangeIcon />
              )}
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
            {`${Math.abs(percent).toLocaleString()} %`}
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since {time}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
