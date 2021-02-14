import { Action } from "redux";

/* Callbacks */
export interface PlaceCallback {
  (place: Place): void;
}

export interface DateCallback {
  (): Date;
}

export interface VoidCallback {
  (): void;
}

export interface NumberCallback {
  (): number;
}

/* Reducer actions */
export type ApplicationAction =
  | SetForecast
  | SetPlace
  | ToggleTheme
  | ToggleBookmark
  | RemoveBookmark;

export interface SetForecast extends Action {
  type: "setForecast";
  today: Day;
  week: Week;
}

export interface SetPlace extends Action {
  type: "setPlace";
  place: Place;
}

export interface ToggleTheme extends Action {
  type: "toggleTheme";
}

export interface ToggleBookmark extends Action {
  type: "toggleBookmark";
}

export interface RemoveBookmark extends Action {
  type: "removeBookmark";
  id: string;
}

/* Properties */
export interface ApplicationState {
  theme: "dark" | "light" | undefined;
  loaded: boolean;
  place: Place;
  forecast: Forecast;
  bookmarks: PlaceList;
}

export interface Forecast {
  today?: Day;
  week?: Week;
}

export interface Day {
  description: string;
  icon: string;
  humidity: number;
  temp: Temperature;
  unix: number;
  windSpeed: number;
}

export interface Week extends Array<Day> {}

export interface Temperature {
  min?: number;
  max?: number;
  current?: number;
}

export interface GeocoderRequest {
  location?: LatLngLiteral;
  placeId?: string;
}

export interface LatLngLiteral {
  lat: number;
  lng: number;
}

export interface GeocoderResult {
  place_id: string;
  formatted_address: string;
  geometry: GeocoderGeometry;
}

export interface GeocoderGeometry {
  location: LatLng;
}

export interface LatLng {
  lat: NumberCallback;
  lng: NumberCallback;
}

export interface Place {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings?: [
      {
        offset: number;
        length: number;
      }
    ];
  };
  location?: LatLngLiteral;
  bookmark?: boolean;
}

export interface PlaceList extends Array<Place> {}
