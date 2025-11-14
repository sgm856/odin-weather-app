const translateUrl =
  "https://api.giphy.com/v1/gifs/translate?api_key=Cq8RYy4dsf3ksD7yEOJKT83AuPvhx2sR&s=";

export const getIconGifJson = async (icon) => {
  const url = `${translateUrl}${icon}`;
  console.log(url);
  return fetch(url).then((response) => {
    return response.json();
  });
};
