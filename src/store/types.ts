import { Action } from "redux";

declare global {
  interface Window {
    autocompleteService: any;
    geocoder: any;
  }
}

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
  forecast: Forecast;
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
  place: Place;
  forecast?: Forecast;
  bookmarks: PlaceList;
}

/* OpenWeather API */
export interface Forecast {
  current: Day;
  daily: Week;
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}

export interface Day {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: Array<Weather>;
}

export interface Week extends Array<ExtendedDay> {}

export interface ExtendedDay {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: FeelsLike;
  humidity: number;
  pop: number;
  pressure: number;
  rain: number;
  sunrise: number;
  sunset: number;
  temp: Temp;
  uvi: number;
  weather: Array<Weather>;
  wind_deg: number;
  wind_speed: number;
}

export interface FeelsLike {
  day: number;
  eve: number;
  morn: number;
  night: number;
}

export interface Temp extends FeelsLike {
  max: number;
  min: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

/* Google Maps API */
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
