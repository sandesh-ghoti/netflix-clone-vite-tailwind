import { useEffect, useState } from "react";
import { BASE_URL, options, requests } from "../constants";
import { useParams } from "react-router-dom";
import {
  YtPlayer,
  StuffList,
  InfoBanner,
  CastList,
  VideoCard,
} from "../components";
import getSuggestions from "../utils/geminiIntergration";
import { RiBardFill } from "react-icons/ri";
const MovieWatch = () => {
  console.log("MovieWatch rendering...");
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null); //now playing video
  const [team, setTeam] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    //fetch movie of id
    async function fetchVideos() {
      const response = await fetch(
        `${BASE_URL}/${requests.movie}/${id}/videos`,
        options()
      );
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
      const response = await fetch(
        `${BASE_URL}/${requests.movie}/${id}`,
        options()
      );
      const details = await response?.json();
      setMovie(details);
    }
    async function fetchTeam() {
      const response = await fetch(
        `${BASE_URL}/${requests.movie}/${id}/credits`,
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
      setMovie([]);
      setNowPlaying(null);
      setVideos(null);
      setTeam(null);
    };
  }, [id]);
  useEffect(() => {
    async function fetchuggestion() {
      console.log(movie, "movie", movie?.original_title);
      try {
        if (!movie?.original_title) {
          return;
        }
        let results = await getSuggestions("movie", movie?.original_title);

        setSuggestions(results.filter((result) => result));
      } catch (error) {
        console.error("error at fetchSuggestion()", error);
      }
    }
    fetchuggestion();
  }, [movie]);
  function handleClick(key, autoplay = 1) {
    console.log("click", key);
    setNowPlaying({ key, autoplay });
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
      {team?.cast?.length && (
        <div className="w-full text-center text-4xl font-bold text-zinc-200 my-5 py-5 max-md:py-2 max-md:my-2 max-md:text-3xl">
          Cast
        </div>
      )}
      {team?.cast?.length && <CastList list={team.cast} />}
      {team?.crew?.length && (
        <div className="w-full text-center text-4xl font-bold text-zinc-200 my-5 py-5 max-md:py-2 max-md:my-2 max-md:text-3xl">
          Crew
        </div>
      )}
      {team?.crew?.length && <CastList list={team.crew} />}
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
      {suggestions?.length ? (
        <>
          <div className="w-full flex flex-row items-center justify-center text-4xl font-bold text-zinc-200 my-5 py-5 max-md:py-2 max-md:my-2 max-md:text-2xl">
            <span>Suggetions From Gemini</span>
            <div className="ml-2 p-1 rounded-full bg-gradient-to-br from-purple-400 to-blue-500">
              <RiBardFill />
            </div>
          </div>
          <StuffList list={suggestions} stuffType={"movie"} />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default MovieWatch;
