import { GOOGLE_MAPS_KEY, OPEN_WEATHER_KEY } from "../store/keys";
import { LatLngLiteral } from "../store/types";

export const fetchWeather = async (location: LatLngLiteral) => {
  const src =
    "https://api.openweathermap.org/data/2.5/onecall?" +
    `&lat=${location.lat}` +
    `&lon=${location.lng}` +
    `&exclude=alerts` +
    `&appid=${OPEN_WEATHER_KEY}` +
    `&units=metric`;

  const response = await fetch(src);

  const data = await response.json();

  return data;
};

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
