import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requests } from "../constants";
import Card from "./Card";
import Trailer from "./Trailer";
import axiosClient from "../utils/axiosClient";
import {
  useGetTrendingMoviesWeekQuery,
  useGetTrendingTvsWeekQuery,
  useGetVideosQuery,
} from "../redux";

const Browse = () => {
  console.log("Browse rendering...");
  // fetch movies, tvShows and trailer now trending and store into store
  const [randomMovie, setRandomMovie] = useState(null);
  const [randomVideo, setRandomVideo] = useState(null);
  const {
    data: movies,
    error: movieError,
    isFetching: isMovieFetching,
  } = useGetTrendingMoviesWeekQuery({
    params: { page: 1 },
  });
  const {
    data: tvShows,
    error: tvError,
    isFetching: isTvFetching,
  } = useGetTrendingTvsWeekQuery({
    params: { page: 1 },
  });
  const {
    data: trailerData,
    isLoading: isTrailerFetching,
    error: trailerError,
  } = useGetVideosQuery(
    { media_type: `movie`, id: randomMovie?.id } // Get movie ID if movies exist
  );

  const navigate = useNavigate();
  async function fetchRandom(movies) {
    // take random movie id from moviesSlice and fetch trailer
    const choosen = Math.floor(Math.random() * movies?.length);
    setRandomMovie(movies[choosen]);
  }
  useEffect(() => {
    movies && fetchRandom(movies);
  }, [movies]);
  useEffect(() => {
    setRandomVideo(
      trailerData?.filter(
        (video) =>
          video.type === "Trailer" &&
          video.key !== null &&
          video.site.toLowerCase() === "YouTube".toLowerCase()
      )[0]
    );
  }, [trailerData]);
  function handlePageRedirect(card) {
    // console.log(card, `watch/${card.media_type}/${card.id}`);
    navigate(`watch/${card.media_type}/${card.id}`);
  }
  return (
    <div className=" w-full bg-gradient-to-r from-black">
      {randomVideo && (
        <Trailer videoKey={randomVideo?.key} movieDetails={randomMovie} />
      )}
      <ul className="grid max-sm:grid-cols-2 max-md:grid-cols-3 max-lg:grid-cols-5 grid-cols-6 gap-5">
        {movies?.map((data) => (
          <li
            key={data?.id}
            onClick={() =>
              handlePageRedirect({ id: data?.id, media_type: data?.media_type })
            }
          >
            {<Card data={data} />}
          </li>
        ))}
        Tv shows:
        {tvShows?.map((data) => (
          <li
            key={data?.id}
            onClick={() =>
              handlePageRedirect({ id: data?.id, media_type: data?.media_type })
            }
          >
            {<Card data={data} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Browse;
