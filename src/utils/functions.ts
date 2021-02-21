import { GOOGLE_MAPS_KEY, OPEN_WEATHER_KEY } from "../store/keys";
import {
  Forecast,
  GeocoderRequest,
  GeocoderResult,
  LatLngLiteral,
  Place,
} from "../store/types";

export const fetchOpenWeather = async (
  location: LatLngLiteral
): Promise<Forecast> => {
  const src =
    "https://api.openweathermap.org/data/2.5/onecall?" +
    `&lat=${location.lat}` +
    `&lon=${location.lng}` +
    `&exclude=alerts,minutely,hourly` +
    `&appid=${OPEN_WEATHER_KEY}` +
    `&units=metric`;

  const response = await fetch(src);

  const data = await response.json();

  return data;
};

export const fetchGeocode = async (
  request: GeocoderRequest,
  callback: (place: Place) => void
) =>
  window.geocoder.geocode(request, (results?: GeocoderResult[]) => {
    if (results) {
      /** Translate first result from GeocoderResult to Place */
      const result = results[0];
      const location = result.geometry.location;
      const response = {
        place_id: result.place_id,
        description: result.formatted_address,
        structured_formatting: {
          main_text: result.formatted_address.split(",").splice(-1, 1)[0],
          secondary_text: result.formatted_address
            .split(",")
            .slice(0, -1)
            .join(","),
        },
        location: {
          lat: location.lat(),
          lng: location.lng(),
        },
      };

      callback(response);
    }
  });

export const loadGoogleMapsScript = () => {
  const position = document.querySelector("head");

  if (!position) {
    return;
  }

  const id = "google-maps";
  const src =
    "https://maps.googleapis.com/maps/api/js?key=" +
    GOOGLE_MAPS_KEY +
    "&libraries=places";

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
};
