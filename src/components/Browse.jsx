import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMovies } from "../utils/movieSlice";
import { addTVShows } from "../utils/tvSlice";
import { category, options, requests } from "../constants";
import Card from "./Card";
import Trailer from "./Trailer";
const Browse = () => {
  console.log("Browse rendering...");
  // fetch movies, tvShows and trailer now trending and store into store
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies);
  const tvShows = useSelector((store) => store.tvShows);
  const [randomVideo, setRandomVideo] = useState(null);
  const navigate = useNavigate();
  async function fetchTrailer(movies) {
    // take random movie id from moviesSlice and fetch trailer
    const choosen = Math.floor(Math.random() * movies?.results?.length);
    const response = await fetch(
      `${requests.movie}/${movies?.results[choosen]?.id}/videos`,
      options()
    );
    const video = await response?.json();

    setRandomVideo({
      movie: movies?.results[choosen],
      trailer: video?.results.filter(
        (video) =>
          video.type === "Trailer" &&
          video.key !== null &&
          video.site.toLowerCase() === "YouTube".toLowerCase()
      )[0],
    });
  }
  useEffect(() => {
    const fetchDetails = async () => {
      let fetchMovies = await fetch(
        requests.trending + "/" + category.movie + "/week",
        options()
      );
      fetchMovies = await fetchMovies?.json();
      let fetchTVShows = await fetch(
        requests.trending + "/" + category.tv + "/week",
        options()
      );
      fetchTVShows = await fetchTVShows?.json();
      console.log(fetchMovies, fetchTVShows);
      dispatch(fetchMovies && addMovies(fetchMovies));
      dispatch(fetchTVShows && addTVShows(fetchTVShows));
      await fetchTrailer(fetchMovies);
    };
    fetchDetails();
  }, []);
  function handlePageRedirect(card) {
    // console.log(card, `watch/${card.media_type}/${card.id}`);
    navigate(`watch/${card.media_type}/${card.id}`);
  }
  return (
    <div className=" w-screen">
      {randomVideo?.trailer && <Trailer randomVideo={randomVideo} />}
      <ul className="grid max-sm:grid-cols-2 max-md:grid-cols-3 max-lg:grid-cols-5 grid-cols-6 gap-5">
        {movies?.results?.map((data) => (
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
        {tvShows?.results?.map((data) => (
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
