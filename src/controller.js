import * as giphyApi from "./giphyApi";
import * as visualCrossingApi from "./visualCrossingApi";
import { Extractor } from "./extractor.js";

export const initialize = () => {
  attachSearchHandler();
};

const attachSearchHandler = () => {
  const searchButton = document.querySelector(".search-button");
  const inputElement = document.querySelector("form input");
  searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    visualCrossingApi.getForecast(inputElement.value);
  });
};
