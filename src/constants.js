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
  { identifier: "en-Us", name: "English" },
  { identifier: "hn", name: "Hindi" },
  { identifier: "es", name: "Spanish" },
];
export const getQuery = (path, queries = []) => {
  let url = `${path}?api_key=${TMDB_API_KEY}`;
  queries.forEach((query) => {
    url += `&${query}`;
  });
  return url;
};

export const endpoints = {
  trending: {
    all: "trending",
    week: {
      movie: "trending/movie/week",
      tv: "trending/tv/week",
      people: "trending/people/week",
    },
    day: {
      movie: "trending/movie/day",
      tv: "trending/tv/day",
      people: "trending/people/day",
    },
  },
  top_rated: {
    movie: "movie/top_rated",
    tv: "tv/top_rated",
  },
  popular: {
    movie: "movie/popular",
    tv: "tv/popular",
  },
  now_playing: {
    movie: "movie/now_playing",
  },
  upcoming: {
    movie: "movie/upcoming",
  },
  on_the_air: {
    tv: "tv/on_the_air",
  },
  airing_today: {
    tv: "tv/airing_today",
  },
  search: "search/multi", //query=<search movie or tv>,
  // similar:{ // ad
  //   movie: "movie/${id}/similar",
  //   tv: "tv/${id}/similar"
  // },
  // videos:{
  //   movie: "movie/${id}/videos",
  //   tv: "tv/${id}/videos"
  // },
  // credits:{
  //   movie: "movie/${id}/credits",
  //   tv: "tv/${id}/credits"
  // }
};

export const media_type_enum = { movie: `movie`, tv: `tv`, person: `person` };
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
