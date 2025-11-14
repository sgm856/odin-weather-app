import * as giphyApi from "./giphyApi";
import * as visualCrossingApi from "./visualCrossingApi";
import { extract } from "./dataProcessor.js";
import * as dom from "./dom.js";
import { setDays, getDays } from "./smallStorage.js";

export const initialize = async () => {
  attachSearchHandler();
  attachDayButtonHandler();
  await getAndDisplayWeekInfo();
  displayActiveDay();
  updateGif();
};

const attachSearchHandler = async () => {
  const searchButton = document.querySelector(".search-button");
  const inputElement = document.querySelector("form input");
  searchButton.addEventListener("click", async (e) => {
    e.preventDefault();
    await getAndDisplayWeekInfo(inputElement.value);
    displayActiveDay();
    updateGif();
  });
};

const attachDayButtonHandler = () => {
  const buttonContainer = document.querySelector(".week-container");
  buttonContainer.addEventListener("click", (e) => {
    if (e.target.closest(".day-container")) {
      const index = e.target.closest(".day-container").dataset.id;
      displayActiveDay(Number.parseInt(index));
      updateGif();
    }
  });
};

const getWeatherDefaultSchema = async (location) => {
  try {
    let data = null;
    data = await visualCrossingApi.getWeeklyData(location);
    const schema = {
      days: [
        "datetime",
        "icon",
        "temp",
        "conditions",
        "precipprob",
        "humidity",
        "feelslike",
        "windspeed",
        "description",
      ],
      resolvedAddress: "resolvedAddress",
    };
    const requestedData = extract(data, schema);
    setDays(requestedData.days);
    return requestedData;
  } catch {
    console.log(new Error("Failed to fetch information."));
  }
};

const getAndDisplayWeekInfo = async (location = null) => {
  const displayLocation = location || "Albuquerque, New Mexico, United States";
  const data = await getWeatherDefaultSchema(displayLocation);
  const resolvedLocation = data.resolvedAddress;
  dom.populateDays(data.days);
  dom.renderLocationName(resolvedLocation);
  console.log(resolvedLocation);
};

const displayActiveDay = (index = 0) => {
  const days = getDays();
  dom.renderActiveDay(days[index]);
};

const updateGif = (index = 0) => {
  const days = getDays();
  giphyApi
    .getIconGifJson(`${days[index].conditions} weather`)
    .then((response) => {
      dom.renderGiphyGif(response.data.images.original.url);
    });
};
