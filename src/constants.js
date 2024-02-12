/* eslint-disable no-undef */
export const TMDB_API_KEY = process.env.TMDB_API_KEY;
export const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

export const BASE_URL = "https://api.themoviedb.org/3";
export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";
export const YT_THUMBNAIL_URL = "https://i.ytimg.com/vi/";
//https://i.ytimg.com/vi/SzINZZ6iqxY/hqdefault.jpg
export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "spanish", name: "Spanish" },
];

export const requests = {
  auth: `${BASE_URL}/authentication`,
  discover: `${BASE_URL}/discover`,
  search: `${BASE_URL}/search`,
  trending: `${BASE_URL}/trending`,
  movie: `${BASE_URL}/movie`,
  tv: `${BASE_URL}/tv`,
  person: `${BASE_URL}/person`,
};

export const category = { tv: "tv", movie: "movie", person: "person" };

export const sort = {
  popularity: "popularity.desc",
  vote_average: "vote_average.desc",
};

export const options = (method = "GET") => {
  return {
    method,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  };
};
