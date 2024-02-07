import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMovies } from "../utils/movieSlice";
import { addTVShows } from "../utils/tvSlice";
import { category, options, requests } from "../constants";
import Card from "./Card";
const Browse = () => {
  console.log("Browse rendering...");
  // fetch movies, tvShows and trailer now trending and store into store
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies);
  const tvShows = useSelector((store) => store.tvShows);
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
    };
    fetchDetails();
  }, [dispatch]);
  return (
    <div>
      Movies:
      <ul className="grid max-sm:grid-cols-2 max-md:grid-cols-3 max-lg:grid-cols-5 grid-cols-6 gap-5">
        {movies?.results?.map((data) => (
          <li key={data.id}>{<Card data={data} />}</li>
        ))}
        Tv shows:
        {tvShows?.results?.map((data) => (
          <li key={data.id}>{<Card data={data} />}</li>
        ))}
      </ul>
    </div>
  );
};

export default Browse;
