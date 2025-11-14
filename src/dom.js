import { getIconGifJson } from "./giphyApi";
import { createIcon } from "./utils";
import { format } from "date-fns";

const convertIconName = (name) => {
  switch (name) {
    case "snow":
      return "icon-weather-snowy";
    case "rain":
      return "icon-weather-rainy";
    case "fog":
      return "icon-weather-fog";
    case "wind":
      return "icon-weather-windy";
    case "cloudy":
      return "icon-weather-cloudy";
    case "partly-cloudy-day":
      return "icon-weather-partly-cloudy";
    case "partly-cloudy-night":
      return "icon-weather-night-partly-cloudy";
    case "clear-day":
      return "icon-weather-sunny";
    case "clear-night":
      return "icon-weather-night";
  }
};

export const populateDays = (daysData) => {
  const container = document.querySelector(".week-container");
  container.innerHTML = "";
  for (let index = 0; index < daysData.length; index++) {
    const dayInfo = daysData[index];

    const dayContainer = document.createElement("div");
    const h2 = document.createElement("h2");
    h2.textContent = format(dayInfo.datetime, "E");
    const temp = document.createElement("span");
    temp.textContent = dayInfo.temp;
    const icon = createIcon(convertIconName(dayInfo.icon));

    dayContainer.appendChild(h2);
    dayContainer.appendChild(icon);
    dayContainer.appendChild(temp);

    container.appendChild(dayContainer);
    dayContainer.classList.add("day-container");
    dayContainer.dataset.id = `${index}`;
  }
};

export const renderActiveDay = (dayInfo) => {
  const dayName = document.querySelector(".active-name");
  const icon = document.querySelector(".active-icon");
  const temp = document.querySelector(".active-temp");
  const precip = document.querySelector(".active-precip");
  const wind = document.querySelector(".active-wind");
  const humidity = document.querySelector(".active-humidity");
  const description = document.querySelector(".active-description");

  dayName.textContent = format(dayInfo.datetime, "EEEE");
  icon.innerHTML = "";
  const iconDiv = createIcon(convertIconName(dayInfo.icon));
  icon.appendChild(iconDiv);
  temp.textContent = `Avg. Temp: ${dayInfo.temp} F`;
  precip.textContent = `Precip. Chance: ${dayInfo.precipprob}%`;
  wind.textContent = `Wind: ${dayInfo.windspeed} mi/hr`;
  humidity.textContent = `Humidity: ${dayInfo.humidity}%`;
  description.textContent = `Conditions: ${dayInfo.description}`;
};

export const renderLocationName = (locationName) => {
  const locationHeader = document.querySelector(".location");
  locationHeader.textContent = locationName;
};

export const renderGiphyGif = (url) => {
  const imageContainer = document.querySelector("img");
  imageContainer.src = url;
};

export const getLocationText = () => {
  const location = document.querySelector(".location").textContent;
  return location;
};
