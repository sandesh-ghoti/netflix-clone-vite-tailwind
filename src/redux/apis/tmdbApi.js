import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, TMDB_ACCESS_TOKEN } from "../../constants";

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
          const { params = { page: 1 } } = args;
          return { url: `trending/movie/week`, params: params };
        },
        transformResponse: (response) => response.results,
      }),

      // Trending TVs (Week)
      getTrendingTvsWeek: builder.query({
        query: (args) => {
          const { params = { page: 1 } } = args;
          return { url: `trending/tv/week`, params: params };
        },
        transformResponse: (response) => response.results,
      }),

      // Trending Movies (Day)
      getTrendingMoviesDay: builder.query({
        query: (args) => {
          const { params = { page: 1 } } = args;
          return { url: `trending/movie/day`, params: params };
        },
        transformResponse: (response) => response.results,
      }),
      // Trending TVs (Day)
      getTrendingTvsDay: builder.query({
        query: (args) => {
          const { params = { page: 1 } } = args;
          return { url: `trending/tv/day`, params: params };
        },
        transformResponse: (response) => response.results,
      }),
      // Top Rated Movies
      getTopRatedMovies: builder.query({
        query: (args) => {
          const { params = { page: 1 } } = args;
          return { url: `movie/top_rated`, params: params };
        },
        transformResponse: (response) => response.results,
      }),
      // Top Rated TVs
      getTopRatedTvs: builder.query({
        query: (args) => {
          const { params = { page: 1 } } = args;
          return { url: `tv/top_rated`, params: params };
        },
        transformResponse: (response) => response.results,
      }),
      // Now Playing Movies
      getNowPlayingMovies: builder.query({
        query: (args) => {
          const { params = { page: 1 } } = args;
          return { url: `movie/now_playing`, params: params };
        },
        transformResponse: (response) => response.results,
      }),
      // Now on the air tv series
      getOnTheAirTvs: builder.query({
        query: (args) => {
          const { params = { page: 1 } } = args;
          return { url: `tv/on_the_air`, params: params };
        },
        transformResponse: (response) => response.results,
      }),
      // upcoming Movies
      getUpcomingMovies: builder.query({
        query: (args) => {
          const { params = { page: 1 } } = args;
          return { url: `movie/upcoming`, params: params };
        },
        transformResponse: (response) => response.results,
      }),
      // airing today tv series
      getAiringTodayTvs: builder.query({
        query: (args) => {
          const { params = { page: 1 } } = args;
          return { url: `tv/airing_today`, params: params };
        },
        transformResponse: (response) => response.results,
      }),
      getDetails: builder.query({
        query: (args) => {
          const { media_type, id } = args;
          return { url: `${media_type}/${id}` };
        },
        transformResponse: (response) => response.results,
      }),
      getVideos: builder.query({
        query: (args) => {
          const { media_type, id } = args;
          return { url: `${media_type}/${id}/videos` };
        },
        transformResponse: (response) => response.results,
      }),
      getSimilar: builder.query({
        query: (args) => {
          const { params = { page: 1 }, media_type, id } = args;
          return { url: `${media_type}/${id}/similar`, params: params };
        },
        transformResponse: (response) => response.results,
      }),
      getCredits: builder.query({
        query: (args) => {
          const { params = { page: 1 }, media_type, id } = args;
          return { url: `${media_type}/${id}/credits`, params: params };
        },
        transformResponse: (response) => response.results,
      }),
      // ... define queries for other endpoints

      // Search Endpoint
      searchMulti: builder.query({
        query: (query) => `search/multi?query=${query}`,
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
