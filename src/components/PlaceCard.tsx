import {
  Box,
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useMemo } from "react";
import { Day, Place, VoidCallback } from "../store/types";
import IconImage from "./IconImage";

const FULL_WEEKDAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

interface PlaceCardOptions {
  today: Day;
  place: Place;
  onBookmark: VoidCallback;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "85vw",
      overflow: "hidden",
      textAlign: "left",
    },
    temp: {
      paddingLeft: 5,
    },
    text: {
      [theme.breakpoints.up("md")]: {
        maxWidth: "40vw",
      },
    },
    button: {
      textAlign: "right",
    },
  })
);

const PlaceCard = (props: PlaceCardOptions) => {
  const classes = useStyles();
  const { place, today } = props;
  const { humidity, temp, dt, wind_speed } = today;
  const weather = today.weather[0];

  const date = useMemo(() => {
    const date = new Date(dt * 1000);

    return `${FULL_WEEKDAYS[date.getDay()]}, ${date.getHours()}:00`;
  }, [dt]);

  const description = useMemo(() => {
    return (
      weather.description.charAt(0).toUpperCase() + weather.description.slice(1)
    );
  }, [weather]);

  return (
    <Box className={classes.root}>
      <Typography
        className={classes.text}
        noWrap
        variant="body1"
        color="textSecondary"
      >
        {place.structured_formatting.main_text}
      </Typography>
      <Typography className={classes.text} noWrap variant="h5">
        {place.structured_formatting.secondary_text}
      </Typography>
      <Typography variant="body1">{description}</Typography>
      <Typography color="textSecondary">{date}</Typography>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <IconImage icon={weather.icon} />
        <Box className={classes.temp}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Typography variant="h3">{Math.round(temp)}</Typography>
            <Typography variant="h5"> ºC</Typography>
          </Grid>
        </Box>
      </Grid>
      <Typography>Humidity: {humidity}%</Typography>
      <Typography>Wind: {wind_speed} km/h</Typography>
      <Box className={classes.button}>
        <Button
          variant="contained"
          color="primary"
          onClick={props.onBookmark}
          startIcon={place.bookmark ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        >
          Bookmark
        </Button>
      </Box>
    </Box>
  );
};

export default PlaceCard;
