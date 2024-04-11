import React, { useEffect, useRef, useState } from "react";
import { media_type_enum } from "../constants";
import { useNavigate, useParams } from "react-router-dom";
import {
  YtPlayer,
  StuffList,
  InfoBanner,
  CastList,
  VideoCard,
  Card,
  CastCard,
} from "../components";
import getSuggestions from "../utils/geminiIntergration";
import { RiBardFill } from "react-icons/ri";
import {
  useGetCreditsQuery,
  useGetDetailsQuery,
  useGetVideosQuery,
  useGetSimilarQuery,
} from "../redux/";

const MovieWatch = () => {
  const { id } = useParams();
  const [nowPlaying, setNowPlaying] = useState(null); //now playing video
  const [suggestions, setSuggestions] = useState("");
  const scrollRef = useRef(null);
  const {
    data: movie,
    error: movieError,
    isFetching: isMovieFetching,
  } = useGetDetailsQuery({ media_type: media_type_enum.movie, id: id });
  const {
    data: team,
    error: teamError,
    isFetching: isTeamFetching,
  } = useGetCreditsQuery({ media_type: media_type_enum.movie, id: id });
  let {
    data: videos,
    error: videosError,
    isFetching: isVideosFetching,
  } = useGetVideosQuery({ media_type: media_type_enum.movie, id: id });
  const {
    data: similar,
    error: similarError,
    isFetching: isSimilarFetching,
  } = useGetSimilarQuery({ media_type: media_type_enum.movie, id: id });
  useEffect(() => {
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
  }, [videos]);
  useEffect(() => {
    // fetch suggestions from gemini
    async function fetchuggestion() {
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
  useEffect(() => {
    return () => {
      setSuggestions([]);
      setNowPlaying(null);
    };
  }, []);

  function handleClick(key, autoplay = 1) {
    // set now playing video key
    setNowPlaying({ key, autoplay });
  }
  useEffect(() => {
    // Reset scroll position when component mounts

    window.scrollTo(0, 0);
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [id]);
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
      {team?.cast?.length > 0 && (
        <MapList
          children={<span>Cast</span>}
          list={team.cast}
          Card={CastCard}
          media_type={media_type_enum.person}
        />
      )}
      {team?.crew?.length > 0 && (
        <MapList
          children={<span>Crew</span>}
          list={team.crew}
          Card={CastCard}
          media_type={media_type_enum.person}
        />
      )}
      {videos?.length > 0 && (
        <MapList
          children={<span>Videos</span>}
          list={videos}
          Card={VideoCard}
          redirect={false}
          onClick={(key) => {
            setNowPlaying({ key, autoplay: 1 });
          }}
        />
      )}
      {suggestions?.length > 0 && (
        <MapList
          children={
            <>
              <span>Suggetions From Gemini</span>
              <div className="ml-2 p-1 rounded-full bg-gradient-to-br from-purple-400 to-blue-500">
                <RiBardFill />
              </div>
            </>
          }
          list={suggestions}
          Card={Card}
          media_type={media_type_enum.movie}
        />
      )}
      {similar && (
        <MapList
          children={<span>Similar to this</span>}
          list={similar}
          Card={Card}
          media_type={media_type_enum.movie}
        />
      )}
    </div>
  );
};

export default MovieWatch;

const MapList = ({
  children = <></>,
  list,
  Card,
  media_type = "video",
  redirect = true,
  onClick = null,
}) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  function handleCardClick(item) {
    if (onClick) {
      console.log("setting video now playing", item?.key);
      onClick(item?.key);
    }
    if (!redirect) {
      return;
    }
    navigate(`/watch/${media_type}/${item.id}`);
  }
  useEffect(() => {
    return () => {
      if (ref.current) {
        ref.current.scrollLeft = 0;
      }
    };
  }, [list]);
  return (
    <>
      <div className="w-full flex flex-row items-center justify-center text-4xl font-bold text-zinc-200 my-5 py-5 max-md:py-2 max-md:my-2 max-md:text-2xl">
        {children}
      </div>
      <ul
        className="flex flex-row overflow-scroll w-full gap-4 sm:gap-6 md:gap-8 lg:gap-12 "
        ref={ref}
      >
        {list?.map((item) => (
          <li
            key={item?.credit_id || item?.id}
            className="flex-none w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
            onClick={() => handleCardClick(item)}
          >
            <Card data={item} media_type={media_type} />
          </li>
        ))}
      </ul>
    </>
  );
};
