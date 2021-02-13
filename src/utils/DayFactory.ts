import { Day, Temperature } from "../store/types";

const DayModel = (data: Map<string, any>): Day => {
    const weather = data["weather"][0];
  
    const buildTemp = (data: Map<string, any>): Temperature => {
      if (typeof data === "number") {
        return {
          current: Math.ceil(data),
        };
      }
  
      return {
        min: Math.ceil(data["min"]),
        max: Math.ceil(data["max"]),
      };
    };
  
    return {
      description: weather["description"],
      humidity: data["humidity"],
      icon: `http://openweathermap.org/img/wn/${weather["icon"]}@2x.png`,
      temp: buildTemp(data["temp"]),
      windSpeed: data["wind_speed"],
      unix: data["dt"],
    };
  };

  export default DayModel;