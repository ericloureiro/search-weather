import produce from "immer";
import { ApplicationAction, ApplicationState, Place, PlaceList } from "./types";

const getTheme = (): "dark" | "light" => {
  if (!localStorage.hasOwnProperty("theme")) {
    return "light";
  }

  const theme = localStorage.getItem("theme");

  console.log(theme);
  if (
    theme === "" ||
    theme === null ||
    (theme !== "dark" && theme !== "light")
  ) {
    return "light";
  }

  return theme;
};

const getBookmarks = (): PlaceList => {
  if (!localStorage.hasOwnProperty("bookmarks")) {
    return [];
  }

  const bookmarks = localStorage.getItem("bookmarks");

  if (bookmarks === "" || bookmarks === null) {
    return [];
  }

  return JSON.parse(bookmarks);
};

export const initialState: ApplicationState = {
  loaded: false,
  theme: "light",
  forecast: {},
  place: {
    place_id: "ChIJubLJNBVzIg0RbDzUOSeDr00",
    description: "Leiria, Portugal",
    bookmark: false,
    structured_formatting: {
      main_text: "Leiria",
      secondary_text: "Portugal",
      main_text_matched_substrings: [
        {
          offset: 0,
          length: 6,
        },
      ],
    },
    location: {
      lat: 39.74362,
      lng: -8.80705,
    },
  },
  bookmarks: [],
};

const reducer = (state = initialState, action: ApplicationAction) => {
  console.log(action.type);
  switch (action.type) {
    case "setForecast":
      return produce(state, (draft) => {
        draft.loaded = true;
        draft.forecast.today = action.today;
        draft.forecast.week = action.week;
      });
    case "setPlace":
      return produce(state, (draft) => {
        draft.place = {
          ...action.place,
          bookmark: draft.bookmarks.some(
            (place: Place) => place.place_id === action.place.place_id
          ),
        };
      });
    case "toggleTheme":
      return produce(state, (draft) => {
        draft.theme = state.theme === "dark" ? "light" : "dark";
      });
    case "toggleBookmark":
      return produce(state, (draft) => {
        const { place } = draft;

        place.bookmark = !place.bookmark;

        if (place.bookmark) {
          draft.bookmarks.push(place as Place);
          return;
        }

        draft.bookmarks = draft.bookmarks.filter(
          (place: Place) => place.place_id !== draft.place.place_id
        );
      });
    case "removeBookmark":
      return produce(state, (draft) => {
        const { id } = action;
        const { place } = draft;

        if (place.place_id === id) {
          place.bookmark = false;
        }

        draft.bookmarks = draft.bookmarks.filter(
          (place: Place) => place.place_id !== id
        );
      });
    default:
      state.theme = getTheme();
      state.bookmarks = getBookmarks();
      state.place.bookmark = state.bookmarks.some(
        (place: Place) => place.place_id === state.place.place_id
      );

      return {
        ...state,
      };
  }
};

export default reducer;
