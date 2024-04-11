import { useEffect, useRef, useState } from "react";
import { media_type_enum, requests } from "../constants";
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
  useGetSimilarQuery,
} from "../redux";
const TvSeriesWatch = () => {
  console.log("TvSeriesWatch rendering...");
  const { id } = useParams();
  const [nowPlaying, setNowPlaying] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const scrollRef = useRef(null);
  const {
    data: tv,
    error: tvError,
    isFetching: isTvFetching,
  } = useGetDetailsQuery({
    media_type: media_type_enum.tv,
    id: id,
  });
  let {
    data: videos,
    isLoading: isVideoFetching,
    error: videoError,
  } = useGetVideosQuery(
    { media_type: media_type_enum.tv, id: id } // Get tv ID if movies exist
  );
  const {
    data: team,
    isLoading: isTeamFetching,
    error: teamError,
  } = useGetCreditsQuery(
    { media_type: media_type_enum.tv, id: id } // Get tv ID if movies exist
  );
  const {
    data: similar,
    error: similarError,
    isFetching: isSimilarFetching,
  } = useGetSimilarQuery({ media_type: media_type_enum.movie, id: id });
  useEffect(() => {
    //fetch tv of id
    setNowPlaying(
      videos?.filter(
        (video) =>
          video.type === "Trailer" &&
          video.key !== null &&
          video.site.toLowerCase() === "YouTube".toLowerCase()
      )[0]
    );
    videos = videos
      ?.filter(
        (video) =>
          video.key !== null &&
          video.site.toLowerCase() === "YouTube".toLowerCase()
      )
      ?.reverse();
    return () => {
      setSuggestions([]);
      setNowPlaying(null);
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
  useEffect(() => {
    // Reset scroll position when component mounts
    console.log("unmounting component and restoring scroll position");
    window.scrollTo(0, 0);
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [id]);
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
      {team?.cast?.length > 0 && (
        <>
          <div className="w-full text-center text-4xl font-bold text-zinc-200 my-5 py-5 max-md:py-2 max-md:my-2 max-md:text-3xl">
            Cast
          </div>
          <CastList list={team.cast} />
        </>
      )}
      {team?.crew?.length > 0 && (
        <>
          <div className="w-full text-center text-4xl font-bold text-zinc-200 my-5 py-5 max-md:py-2 max-md:my-2 max-md:text-3xl">
            Crew
          </div>
          <CastList list={team.crew} />
        </>
      )}
      {videos?.length > 0 && (
        <>
          <div className="w-full text-center text-4xl font-bold text-zinc-200 my-5 py-5 max-md:py-2 max-md:my-2 max-md:text-3xl">
            Videos
          </div>
          <ul
            className="flex flex-row overflow-scroll w-full h-48 gap-3 max-md:h-28"
            ref={scrollRef}
          >
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
        </>
      )}
      {suggestions?.length > 0 && (
        <>
          <div className="w-full flex flex-row items-center justify-center text-4xl font-bold text-zinc-200 my-5 py-5 max-md:py-2 max-md:my-2 max-md:text-2xl">
            <span>Suggetions From Gemini</span>
            <RiBardFill className="ml-2 p-1 rounded-full bg-gradient-to-br from-purple-400 to-blue-500" />
          </div>
          <StuffList list={suggestions} stuffType={"tv"} />
        </>
      )}
      {similar && (
        <>
          <div className="w-full flex flex-row items-center justify-center text-4xl font-bold text-zinc-200 my-5 py-5 max-md:py-2 max-md:my-2 max-md:text-2xl">
            <span>Similar to this</span>
          </div>
          <StuffList list={similar} stuffType={media_type_enum.tv} />
        </>
      )}
    </div>
  );
};

export default TvSeriesWatch;
