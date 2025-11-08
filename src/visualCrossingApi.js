const baseUrl =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const k = "ZNLRFYCEMQH6G3R4ZTJFJ5NHW";
const contentType = "json";

export const getForecast = async (location, ...options) => {
  const forecastRequestUrl = `${baseUrl}${location}?key=${k}`;
  const forecastResponse = await fetch(forecastRequestUrl);
  const json = await forecastResponse.json();
  console.log(json);
};

const extractInformation = (extractor, jsonData) => {
  return extractor.extract(jsonData);
};

export const getCurrentTemp = async () => {
  const currentTempRequestUrl = `${baseUrl}`;
};
