import {
  createMuiTheme,
  createStyles,
  Fab,
  makeStyles,
  Theme,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import Weather from "./services/Weather";
import { toggleTheme } from "./store/actions";
import { GOOGLE_MAPS_KEY, OPEN_WEATHER_KEY } from "./store/keys";
import { ApplicationState } from "./store/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      padding: 5,
    },
    fab: {
      position: "fixed",
      bottom: theme.spacing(3),
      right: theme.spacing(3),
    },
  })
);

const mapStateToProps = (state: ApplicationState) => ({
  theme: state.theme,
});

const App = (props: ApplicationState) => {
  const { theme } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const darkState = theme === "dark";
  const darkTheme = createMuiTheme({
    palette: {
      type: theme,
    },
  });

  useEffect(() => {
    if (!theme) return;

    localStorage.setItem("theme", theme);
  }, [theme]);

  return OPEN_WEATHER_KEY === "YOUR_OPEN_WEATHER_API_KEY" ||
    GOOGLE_MAPS_KEY === "YOUR_GOOGLE_MAPS_API_KEY" ? (
    <div className={classes.root}>
      <Typography>ERROR: Please, setup your API keys</Typography>
    </div>
  ) : (
    <ThemeProvider theme={darkTheme}>
      <Weather className={classes.root} />
      <Fab
        className={classes.fab}
        color="primary"
        onClick={() => dispatch(toggleTheme())}
      >
        {darkState ? <Brightness7Icon /> : <Brightness4Icon />}
      </Fab>
    </ThemeProvider>
  );
};

export default connect(mapStateToProps)(App);
