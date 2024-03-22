import { useEffect, useState } from "react";
import { requests } from "../constants";
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
import {
  useGetCreditsQuery,
  useGetDetailsQuery,
  useGetVideosQuery,
} from "../redux";
const TvSeriesWatch = () => {
  console.log("TvSeriesWatch rendering...");
  const { id } = useParams();
  const [videos, setVideos] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const {
    data: tv,
    error: tvError,
    isFetching: isTvFetching,
  } = useGetDetailsQuery({
    media_type: `tv`,
    id: id,
  });
  const {
    data: videoData,
    isLoading: isVideoDataFetching,
    error: videoDataError,
  } = useGetVideosQuery(
    { media_type: `tv`, id: id } // Get movie ID if movies exist
  );
  const {
    data: team,
    isLoading: isTeamFetching,
    error: teamError,
  } = useGetCreditsQuery(
    { media_type: `tv`, id: id } // Get movie ID if movies exist
  );
  useEffect(() => {
    //fetch tv of id
    async function fetchVideos() {
      setNowPlaying(
        videoData?.filter(
          (video) =>
            video.type === "Trailer" &&
            video.key !== null &&
            video.site.toLowerCase() === "YouTube".toLowerCase()
        )[0]
      );
      const gotVideos = videoData
        ?.filter(
          (video) =>
            video.key !== null &&
            video.site.toLowerCase() === "YouTube".toLowerCase()
        )
        ?.reverse();
      setVideos(gotVideos);
    }

    fetchVideos();
    return () => {
      setSuggestions([]);
      setNowPlaying(null);
      setVideos(null);
    };
  }, [id]);
  useEffect(() => {
    async function fetchSuggestion() {
      try {
        if (!tv?.original_name) {
          return;
        }
        let results = await getSuggestions("tv", tv?.original_name);
        setSuggestions(results.filter((result) => result));
      } catch (error) {
        console.error("error at fetchSuggestion()", error);
      }
    }
    fetchSuggestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tv]);
  function handleClick(key, autoplay = 1) {
    setNowPlaying({ key, autoplay });
  }
  return (
    <div className=" w-full">
      {nowPlaying && (
        <div className="w-full">
          <YtPlayer YTkey={nowPlaying?.key} autoplay={nowPlaying?.autoplay} />
        </div>
      )}
      {tv && (
        <div className="w-full  overflow-hidden">
          <InfoBanner data={tv} />
        </div>
      )}
      {team?.cast?.length ? (
        <div className="w-full text-center text-4xl font-bold text-zinc-200 my-5 py-5 max-md:py-2 max-md:my-2 max-md:text-3xl">
          Cast
        </div>
      ) : (
        ""
      )}
      {team?.cast?.length && <CastList list={team.cast} />}
      {team?.crew?.length && (
        <div className="w-full text-center text-4xl font-bold text-zinc-200 my-5 py-5 max-md:py-2 max-md:my-2 max-md:text-3xl">
          Crew
        </div>
      )}
      {team?.crew?.length && <CastList list={team.crew} />}
      {videos?.length ? (
        <div className="w-full text-center text-4xl font-bold text-zinc-200 my-5 py-5 max-md:py-2 max-md:my-2 max-md:text-3xl">
          Videos
        </div>
      ) : (
        ""
      )}
      {videos?.length ? (
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
      ) : (
        ""
      )}
      {suggestions?.length ? (
        <>
          <div className="w-full flex flex-row items-center justify-center text-4xl font-bold text-zinc-200 my-5 py-5 max-md:py-2 max-md:my-2 max-md:text-2xl">
            <span>Suggetions From Gemini</span>
            <RiBardFill className="ml-2 p-1 rounded-full bg-gradient-to-br from-purple-400 to-blue-500" />
          </div>
          <StuffList list={suggestions} stuffType={"tv"} />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default TvSeriesWatch;
