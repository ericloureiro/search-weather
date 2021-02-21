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
import { ApplicationState, LatLngLiteral } from "../store/types";
import { fetchWeather, loadGoogleMapsScript } from "../utils/functions";

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
  const { location } = place;
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window === "undefined" || loaded) return;

    if (!document.querySelector("#google-maps")) loadGoogleMapsScript();

    /** Timeout to make sure google api is attached to browser
     * TODO: Find a better way to handle load instead of setTimeout */
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, [loaded]);

  useEffect(() => {
    if (!location) return;

    const dispatchForecast = async (location: LatLngLiteral) => {
      const data = await fetchWeather(location);

      dispatch(setForecast(data));
    };

    dispatchForecast(location);
  }, [dispatch, location]);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [loaded, bookmarks]);

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
