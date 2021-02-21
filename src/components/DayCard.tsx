import {
  Box,
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { useMemo } from "react";
import { ExtendedDay } from "../store/types";
import IconImage from "./IconImage";

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
  day: ExtendedDay;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      width: 130,
    },
  })
);

const DayCard = (props: DayCardOptions) => {
  const classes = useStyles();
  const { weather, temp, dt } = props.day;

  const date = useMemo(() => {
    const date = new Date(dt * 1000);

    return SHORT_WEEKDAYS[date.getDay()];
  }, [dt]);

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        title={
          <Typography variant="body2" color="textSecondary" component="p">
            {date}
          </Typography>
        }
      />
      <Box>
        <IconImage icon={weather[0].icon} />
      </Box>
      <CardContent>
        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item>
            <Typography variant="h6">{`${Math.round(temp.max)}º`}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" color="textSecondary">{`${Math.round(
              temp.min
            )}º`}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DayCard;
