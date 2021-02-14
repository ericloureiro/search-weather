import {
  Box,
  CircularProgress,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import PlaceCard from "../components/PlaceCard";
import TabGroup from "../components/TabGroup";
import WeekGrid from "../components/WeekGrid";
import {
  removeBookmark,
  setForecast,
  setPlace,
  toggleBookmark,
} from "../store/actions";
import { GOOGLE_MAPS_KEY, OPEN_WEATHER_KEY } from "../store/keys";
import { ApplicationState, LatLngLiteral } from "../store/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      backgroundColor: theme.palette.background.default,
      minHeight: "100vh",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      padding: 20,
    },
    loader: {
      textAlign: "center",
    },
    progress: {
      margin: 20,
    },
    week: {
      paddingTop: 20,
    },
  })
);

const loadScript = (src: string, position: HTMLElement | null, id: string) => {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
};

const mapStateToProps = (state: ApplicationState) => ({
  loaded: state.loaded,
  forecast: state.forecast,
  place: state.place,
  bookmarks: state.bookmarks,
});

const Weather = (props: ApplicationState) => {
  const classes = useStyles();
  const { forecast, place, bookmarks } = props;
  const { today, week } = forecast;
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined" || !loaded) {
      if (!document.querySelector("#google-maps")) {
        loadScript(
          "https://maps.googleapis.com/maps/api/js?key=" +
            GOOGLE_MAPS_KEY +
            "&libraries=places",
          document.querySelector("head"),
          "google-maps"
        );
      }

      /** Timeout to make sure google api is attached to browser
       *
       * TODO: Find a better way to handle load instead of setTimeout */
      setTimeout(() => {
        setLoaded(true);
      }, 500);
    }
  });

  useEffect(() => {
    if (!loaded) {
      return;
    }

    const buildRequestUrl = (location: LatLngLiteral): string => {
      return (
        "https://api.openweathermap.org/data/2.5/onecall?" +
        `&lat=${location.lat}` +
        `&lon=${location.lng}` +
        `&exclude=alerts` +
        `&appid=${OPEN_WEATHER_KEY}` +
        `&units=metric`
      );
    };

    const fetchWeather = async (location: LatLngLiteral) => {
      const url = buildRequestUrl(location);

      const response = await fetch(url);

      const data = await response.json();

      dispatch(setForecast(data));
    };

    if (!!place.location) {
      fetchWeather(place.location);
    }
  }, [dispatch, loaded, place.location]);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks, loaded]);

  return (
    <div className={classes.root}>
      <Grid container direction="column" alignItems="center" justify="center">
        <Paper className={classes.paper}>
          {!loaded ? (
            <Box className={classes.loader}>
              <Typography>Waiting for Location...</Typography>
              <CircularProgress className={classes.progress} />
              <Typography>
                If no permission is granted, Leiria's coordinates will be used
              </Typography>
            </Box>
          ) : (
            <div>
              {today === undefined || week === undefined ? (
                <CircularProgress />
              ) : (
                <Grid container direction="column">
                  <Grid item>
                    <Grid container spacing={2} direction="row">
                      <Grid item xs={12} sm={6}>
                        <PlaceCard
                          place={place}
                          today={today}
                          onBookmark={() => {
                            dispatch(toggleBookmark());
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TabGroup
                          bookmarks={bookmarks}
                          onSelect={(place) => {
                            dispatch(setPlace(place));
                          }}
                          onDelete={(place) => {
                            dispatch(removeBookmark(place.place_id));
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid className={classes.week} item>
                    <WeekGrid week={week} />
                  </Grid>
                </Grid>
              )}
            </div>
          )}
        </Paper>
      </Grid>
    </div>
  );
};

export default connect(mapStateToProps)(Weather);
