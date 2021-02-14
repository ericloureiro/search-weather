import {
  createMuiTheme,
  createStyles,
  Fab,
  makeStyles,
  Theme,
  ThemeProvider,
} from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import Weather from "./services/Weather";
import { toggleTheme } from "./store/actions";
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
  loaded: state.loaded,
});

const App = (props: ApplicationState) => {
  const { theme, loaded } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const darkState = theme === "dark";
  const darkTheme = createMuiTheme({
    palette: {
      type: theme,
    },
  });

  useEffect(() => {
    if (!loaded || !theme) {
      return;
    }

    localStorage.setItem("theme", theme);
  }, [theme, loaded]);

  return (
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
