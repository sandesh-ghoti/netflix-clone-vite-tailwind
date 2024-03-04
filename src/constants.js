/* eslint-disable no-undef */
export const TMDB_API_KEY = process.env.TMDB_API_KEY;
export const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
export const BASE_URL = "https://api.themoviedb.org/3";
export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";
export const YT_THUMBNAIL_URL = "https://i.ytimg.com/vi/";
//https://i.ytimg.com/vi/SzINZZ6iqxY/hqdefault.jpg

export const IMG_CONFIG = {
  base_url: "http://image.tmdb.org/t/p/",
  secure_base_url: "https://image.tmdb.org/t/p/",
  backdrop_sizes: ["w300", "w780", "w1280", "original"],
  logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
  poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
  profile_sizes: ["w45", "w185", "h632", "original"],
  still_sizes: ["w92", "w185", "w300", "original"],
};
export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "spanish", name: "Spanish" },
];
const getQuery = (path, queries = []) => {
  let url = `${BASE_URL}${path}?api_key=${TMDB_API_KEY}`;
  queries.forEach((query) => {
    url += `&${query}`;
  });
  return url;
};

export async function fetchData(path, queries = []) {
  try {
    const query = getQuery(path, queries, (method = "GET"));
    const http = await fetch(query, { method: method });
    const jsonResult = await http?.json();
    return jsonResult;
  } catch (error) {
    console.error(error);
    await Promise.reject();
  }
}
export const requests = {
  auth: `authentication`,
  discover: `discover`,
  search: `search`,
  trending: `trending`,
  movie: `movie`,
  tv: `tv`,
  person: `person`,
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
