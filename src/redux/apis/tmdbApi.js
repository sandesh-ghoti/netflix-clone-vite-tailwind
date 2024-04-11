import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, TMDB_ACCESS_TOKEN, TMDB_API_KEY } from "../../constants";
const defaultParams = { page: 1, api_key: TMDB_API_KEY };
const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", `Bearer ${TMDB_ACCESS_TOKEN}`);
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      // Trending Movies (Week)
      getTrendingMoviesWeek: builder.query({
        query: (args) => {
          const { params } = args;
          return {
            url: `trending/movie/week`,
            params: { ...params, ...defaultParams },
          };
        },
        transformResponse: (response) => response.results,
      }),

      // Trending TVs (Week)
      getTrendingTvsWeek: builder.query({
        query: (args) => {
          const { params } = args;
          return {
            url: `trending/tv/week`,
            params: { ...params, ...defaultParams },
          };
        },
        transformResponse: (response) => response.results,
      }),

      // Trending Movies (Day)
      getTrendingMoviesDay: builder.query({
        query: (args) => {
          const { params } = args;
          return {
            url: `trending/movie/day`,
            params: { ...params, ...defaultParams },
          };
        },
        transformResponse: (response) => response.results,
      }),
      // Trending TVs (Day)
      getTrendingTvsDay: builder.query({
        query: (args) => {
          const { params } = args;
          return {
            url: `trending/tv/day`,
            params: { ...params, ...defaultParams },
          };
        },
        transformResponse: (response) => response.results,
      }),
      // Top Rated Movies
      getTopRatedMovies: builder.query({
        query: (args) => {
          const { params } = args;
          return {
            url: `movie/top_rated`,
            params: { ...params, ...defaultParams },
          };
        },
        transformResponse: (response) => response.results,
      }),
      // Top Rated TVs
      getTopRatedTvs: builder.query({
        query: (args) => {
          const { params } = args;
          return {
            url: `tv/top_rated`,
            params: { ...params, ...defaultParams },
          };
        },
        transformResponse: (response) => response.results,
      }),
      // Now Playing Movies
      getNowPlayingMovies: builder.query({
        query: (args) => {
          const { params } = args;
          return {
            url: `movie/now_playing`,
            params: { ...params, ...defaultParams },
          };
        },
        transformResponse: (response) => response.results,
      }),
      // Now on the air tv series
      getOnTheAirTvs: builder.query({
        query: (args) => {
          const { params } = args;
          return {
            url: `tv/on_the_air`,
            params: { ...params, ...defaultParams },
          };
        },
        transformResponse: (response) => response.results,
      }),
      // upcoming Movies
      getUpcomingMovies: builder.query({
        query: (args) => {
          const { params } = args;
          return {
            url: `movie/upcoming`,
            params: { ...params, ...defaultParams },
          };
        },
        transformResponse: (response) => response.results,
      }),
      // airing today tv series
      getAiringTodayTvs: builder.query({
        query: (args) => {
          const { params } = args;
          return {
            url: `tv/airing_today`,
            params: { ...params, ...defaultParams },
          };
        },
        transformResponse: (response) => response.results,
      }),
      getDetails: builder.query({
        query: (args) => {
          const { media_type, id, params } = args;
          return {
            url: `${media_type}/${id}`,
            params: { ...params, ...defaultParams },
          };
        },
        transformResponse: (response) => {
          return response;
        },
      }),
      getVideos: builder.query({
        query: (args) => {
          const { media_type, id, params } = args;
          return {
            url: `${media_type}/${id}/videos`,
            params: { ...params, ...defaultParams },
          };
        },
        transformResponse: (response) => {
          return response.results;
        },
      }),
      getSimilar: builder.query({
        query: (args) => {
          const { media_type, id, params } = args;
          return {
            url: `${media_type}/${id}/similar`,
            params: { ...params, ...defaultParams },
          };
        },
        transformResponse: (response) => {
          return response.results;
        },
      }),
      getCredits: builder.query({
        query: (args) => {
          const { media_type, id, params } = args;
          return {
            url: `${media_type}/${id}/credits`,
            params: { ...params, ...defaultParams },
          };
        },
        transformResponse: (response) => response,
      }),
      // ... define queries for other endpoints

      // Search Endpoint
      searchMulti: builder.query({
        query: (args) => {
          const { query, params } = args;
          return {
            url: `search/multi`,
            params: { query, ...params, ...defaultParams },
          };
        },
      }),
    };
  },
});
export const {
  useGetAiringTodayTvsQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetOnTheAirTvsQuery,
  useGetTopRatedMoviesQuery,
  useGetTopRatedTvsQuery,
  useGetTrendingMoviesDayQuery,
  useGetTrendingMoviesWeekQuery,
  useGetTrendingTvsDayQuery,
  useGetTrendingTvsWeekQuery,
  useSearchMultiQuery,
  useGetVideosQuery,
  useGetSimilarQuery,
  useGetCreditsQuery,
  useGetDetailsQuery,
} = tmdbApi;
export { tmdbApi };
