import {
  parse,
  add,
  format,
  isBefore,
  compareAsc,
  compareDsc,
  differenceInDays,
} from "date-fns";

const baseUrl =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const k = "ZNLRFYCEMQH6G3R4ZTJFJ5NHW";
const contentType = "json";

export const getWeeklyData = async (location, ...options) => {
  const currentDate = getCurrentDate();
  const endOfWeekDate = getDateEndOfWeek(currentDate);
  const forecastRequestUrl = `${baseUrl}${location}\/${currentDate}\/${endOfWeekDate}?key=${k}&contentType=json`;

  const forecastResponse = await fetch(forecastRequestUrl);

  const json = await forecastResponse.json();
  console.log(json);
  return json;
};

const getCurrentDate = () => {
  const currentDate = new Date();
  const iso8601 = format(currentDate, "yyyy-MM-dd");
  return iso8601;
};

const getDateEndOfWeek = (date) => {
  return format(add(date, { days: 7 }), "yyyy-MM-dd");
};
