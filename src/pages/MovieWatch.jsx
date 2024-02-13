import { useEffect, useState } from "react";
import { options, requests } from "../constants";
import { useParams, useNavigate } from "react-router-dom";
import YtPlayer from "../components/YtPlayer";
import CastCard from "../components/CastCard";
import VideoCard from "../components/VideoCard";
import InfoBanner from "../components/InfoBanner";
import getSuggestions from "../utils/geminiIntergration";
import Card from "../components/Card";
const MovieWatch = () => {
  console.log("MovieWatch rendering...");
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null); //now playing video
  const [team, setTeam] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //fetch movie of id
    async function fetchVideos() {
      const response = await fetch(`${requests.movie}/${id}/videos`, options());
      const allVideos = await response?.json();
      setNowPlaying(
        allVideos?.results.filter(
          (video) =>
            video.type === "Trailer" &&
            video.key !== null &&
            video.site.toLowerCase() === "YouTube".toLowerCase()
        )[0]
      );
      const gotVideos = allVideos?.results
        ?.filter(
          (video) =>
            video.key !== null &&
            video.site.toLowerCase() === "YouTube".toLowerCase()
        )
        ?.reverse();
      setVideos(gotVideos);
    }
    async function fetchDetails() {
      const response = await fetch(`${requests.movie}/${id}`, options());
      const details = await response?.json();
      setMovie(details);
    }
    async function fetchTeam() {
      const response = await fetch(
        `${requests.movie}/${id}/credits`,
        options()
      );
      const details = await response?.json();
      setTeam(details);
    }
    fetchDetails();
    fetchVideos();
    fetchTeam();
    return () => {
      setSuggestions([]);
    };
  }, [id]);
  function handleClick(key, autoplay = 1) {
    console.log("click", key);
    setNowPlaying({ key, autoplay });
  }
  async function handleSuggestion() {
    console.log(movie, "movie", movie?.original_title);
    let sugg = await getSuggestions("movie", movie?.original_title);
    const regex = /^(?:[*-]\s*)?(.*?)(?:\s*\((\d{4})\))?$/gm;
    let match;
    const moviesWithYear = [];

    while ((match = regex.exec(sugg)) !== null) {
      const movie = {
        name: match[1].trim(),
        year: parseInt(match[2]),
      };
      moviesWithYear.push(movie);
    }
    const fetchPromises = moviesWithYear.map(async (movie) => {
      const res = await fetch(
        `${requests.search}/movie?query=${movie.name}&language=en-US&page=1&year=${movie.year}`,
        options()
      );
      const data = await res.json();
      return data.results[0];
    });

    const results = await Promise.all(fetchPromises);
    setSuggestions(results.filter((result) => result));
  }
  function handleCardClick(newid) {
    console.log("card click", newid);
    navigate(`/watch/movie/${newid}`);
  }
  return (
    <div className=" w-full">
      {nowPlaying && (
        <div className="w-full">
          <YtPlayer YTkey={nowPlaying?.key} autoplay={nowPlaying?.autoplay} />
        </div>
      )}
      {movie && (
        <div className="w-full  overflow-hidden">
          <InfoBanner data={movie} />
        </div>
      )}
      <button
        className="px-4 py-2 bg-blue-900 bg-opacity-35 rounded-md"
        onClick={handleSuggestion}
      >
        get suggestions
      </button>
      {team?.cast && (
        <div className="w-full text-center text-4xl font-bold text-zinc-200 my-5 py-5 max-md:py-2 max-md:my-2 max-md:text-3xl">
          Cast
        </div>
      )}
      {team?.cast && (
        <ul className="flex flex-row overflow-scroll h-96 w-full gap-3 max-md:h-56 max-lg:h-72">
          {team?.cast?.map((person) => {
            return (
              person?.profile_path && (
                <li
                  key={person?.id}
                  className="flex-shrink-0 w-28 md:w-40 lg:w-56"
                >
                  <CastCard
                    data={{
                      name: person?.name,
                      character: person?.character,
                      profile_path: person?.profile_path,
                    }}
                  />
                </li>
              )
            );
          })}
        </ul>
      )}
      {team?.crew && (
        <div className="w-full text-center text-4xl font-bold text-zinc-200 my-5 py-5 max-md:py-2 max-md:my-2 max-md:text-3xl">
          Crew
        </div>
      )}
      {team?.crew && (
        <ul className="flex flex-row overflow-scroll h-96 w-full gap-3 max-md:h-56 max-lg:h-72">
          {team?.crew?.map((person) => {
            return (
              person?.profile_path && (
                <li
                  key={person?.credit_id}
                  className="flex-shrink-0 w-28 md:w-40 lg:w-56"
                >
                  <CastCard
                    data={{
                      name: person?.name,
                      character: person?.department + " - " + person?.job,
                      profile_path: person?.profile_path,
                    }}
                  />
                </li>
              )
            );
          })}
        </ul>
      )}
      {videos && (
        <div className="w-full text-center text-4xl font-bold text-zinc-200 my-5 py-5 max-md:py-2 max-md:my-2 max-md:text-3xl">
          Videos
        </div>
      )}
      {videos && (
        <ul className="flex flex-row overflow-scroll w-full h-48 gap-3 max-md:h-28">
          {videos?.map((video) => (
            <li
              className="h-full aspect-video flex-shrink-0"
              key={video?.key}
              onClick={() => handleClick(video?.key)}
            >
              <VideoCard ytKey={video?.key} videoName={video?.name} />
            </li>
          ))}
        </ul>
      )}
      {suggestions.length ? (
        <div className="overflow-x-auto my-7">
          <div className=" w-full mx-auto flex flex-row flex-nowrap gap-4 sm:gap-8 md:gap-12 lg:gap-16">
            {suggestions?.map((suggestion) => {
              return (
                <div
                  key={suggestion?.id}
                  className="flex-none w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
                  onClick={() => handleCardClick(suggestion?.id)}
                >
                  <Card data={suggestion} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MovieWatch;
