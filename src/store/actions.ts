import {
  Forecast,
  Place,
  RemoveBookmark,
  SetForecast,
  SetPlace,
  ToggleBookmark,
  ToggleTheme,
} from "./types";

export const setForecast = (forecast: Forecast): SetForecast => ({
  type: "setForecast",
  forecast,
});

export const setPlace = (place: Place): SetPlace => ({
  type: "setPlace",
  place,
});

export const toggleTheme = (): ToggleTheme => ({
  type: "toggleTheme",
});

export const toggleBookmark = (): ToggleBookmark => ({
  type: "toggleBookmark",
});

export const removeBookmark = (id: string): RemoveBookmark => ({
  type: "removeBookmark",
  id,
});
