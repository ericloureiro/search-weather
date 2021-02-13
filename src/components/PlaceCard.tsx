import { Box, Button, Grid, Icon, Typography } from "@material-ui/core";
import { useMemo } from "react";
import { Day, Place, VoidCallback } from "../store/types";

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

const PlaceCard = (props: PlaceCardOptions) => {
  const { place, today } = props;
  const { humidity, icon, temp, unix, windSpeed } = today;

  const date = useMemo(() => {
    const date = new Date(unix * 1000);

    return `${FULL_WEEKDAYS[date.getDay()]}, ${date.getHours()}:00`;
  }, [unix]);

  const description = useMemo(() => {
    return (
      today.description?.charAt(0).toUpperCase() + today.description?.slice(1)
    );
  }, [today]);

  return (
    <div
      style={{
        maxWidth: 550,
        overflow: "hidden",
        textAlign: "left",
      }}
    >
      <Box>
        <Typography noWrap variant="body1" color="textSecondary">
          {place.structured_formatting.main_text}
        </Typography>
        <Typography noWrap variant="h5">
          {place.structured_formatting.secondary_text}
          {place.structured_formatting.secondary_text}
        </Typography>
        <Typography variant="body1">{description}</Typography>
        <Typography color="textSecondary">{date}</Typography>
      </Box>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Box>
          <img src={icon} alt="Weather Icon" />
        </Box>
        <Box>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Typography variant="h3">{temp.current}</Typography>
            <Typography variant="h5"> ºC</Typography>
          </Grid>
        </Box>
      </Grid>
      <Typography>Humidity: {humidity}%</Typography>
      <Typography>Wind: {windSpeed} km/h</Typography>
      <Box style={{ textAlign: "right" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={props.onBookmark}
          startIcon={
            <Icon color="primary">
              {place.bookmark ? "favorite" : "favorite_border"}
            </Icon>
          }
        >
          Bookmark
        </Button>
      </Box>
    </div>
  );
};

export default PlaceCard;
