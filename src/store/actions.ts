import DayModel from "../utils/DayFactory";
import {
  Place,
  RemoveBookmark,
  SetForecast,
  SetPlace,
  ToggleBookmark,
} from "./types";

export const setForecast = (action: Map<string, any>): SetForecast => ({
  type: "setForecast",
  today: DayModel(action["hourly"][0]),
  week: action["daily"].map((data: any) => DayModel(data)),
});

export const setPlace = (place: Place): SetPlace => ({
  type: "setPlace",
  place,
});

export const toggleBookmark = (): ToggleBookmark => ({
  type: "toggleBookmark",
});

export const removeBookmark = (id: string): RemoveBookmark => ({
  type: "removeBookmark",
  id,
});
