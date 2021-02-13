import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
import { useMemo } from "react";
import { Day } from "../store/types";

const SHORT_WEEKDAYS = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

interface DayCardOptions {
  day: Day;
}

const DayCard = (props: DayCardOptions) => {
  const { icon, temp, unix } = props.day;

  const date = useMemo(() => {
    const date = new Date(unix * 1000);

    return SHORT_WEEKDAYS[date.getDay()];
  }, [unix]);

  return (
    <Card style={{ width: 125 }}>
      <CardHeader
        title={
          <Typography variant="body2" color="textSecondary" component="p">
            {date}
          </Typography>
        }
      />
      <Box>
        <img src={icon} alt="Weather Icon" />
      </Box>
      <CardContent>
        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item>
            <Typography variant="h6">{`${temp.max}º`}</Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              color="textSecondary"
            >{`${temp.min}º`}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DayCard;
