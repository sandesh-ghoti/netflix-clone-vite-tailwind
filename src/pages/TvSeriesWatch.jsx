import { useEffect, useState } from "react";
import { options, requests } from "../constants";
import { useNavigate, useParams } from "react-router-dom";
import YtPlayer from "../components/YtPlayer";

import CastCard from "../components/CastCard";
import VideoCard from "../components/VideoCard";
import InfoBanner from "../components/InfoBanner";
import getSuggestions from "../utils/geminiIntergration";
import Card from "../components/Card";
const TvSeriesWatch = () => {
  console.log("TvSeriesWatch rendering...");
  const { id } = useParams();
  const [tv, setTv] = useState(null);
  const [videos, setVideos] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [team, setTeam] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    //fetch tv of id
    async function fetchVideos() {
      const response = await fetch(`${requests.tv}/${id}/videos`, options());
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
      console.log(
        "allVideos",
        allVideos,
        "nowPlaying",
        allVideos?.results.filter(
          (video) =>
            video.type === "Trailer" &&
            video.key !== null &&
            video.site.toLowerCase() === "YouTube".toLowerCase()
        )[0]
      );
    }
    async function fetchDetails() {
      const response = await fetch(`${requests.tv}/${id}`, options());
      const details = await response?.json();
      setTv(details);
      console.log("details", details);
    }
    async function fetchTeam() {
      const response = await fetch(`${requests.tv}/${id}/credits`, options());
      const details = await response?.json();
      setTeam(details);
    }

    fetchDetails();
    fetchVideos();
    fetchTeam();
    return () => {
      setSuggestions([]);
      setNowPlaying(null);
      setVideos(null);
      setTeam(null);
      setTv(null);
    };
  }, [id]);
  useEffect(() => {
    async function fetchSuggestion() {
      console.log(tv, "tv", tv?.original_name);
      let sugg = await getSuggestions("tv series", tv?.original_name);
      const regex = /^(?:[*-]\s*)?(.*?)(?:\s*\((\d{4})\))?$/gm;
      let match;
      const tvsWithYear = [];

      while ((match = regex.exec(sugg)) !== null) {
        const tv = {
          name: match[1].trim(),
          year: parseInt(match[2]),
        };
        tvsWithYear.push(tv);
      }
      const fetchPromises = tvsWithYear.map(async (tv) => {
        const res = await fetch(
          `${requests.search}/tv?query=${tv.name}&language=en-US&page=1&year=${tv.year}`,
          options()
        );
        const data = await res.json();
        return data.results[0];
      });

      const results = await Promise.all(fetchPromises);
      setSuggestions(results.filter((result) => result));
    }
    fetchSuggestion();
  }, [tv]);
  function handleClick(key, autoplay = 1) {
    console.log("click", key);
    setNowPlaying({ key, autoplay });
  }

  function handleCardClick(newid) {
    console.log("card click", newid);
    navigate(`/watch/tv/${newid}`);
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
      {/* <button
        className="px-4 py-2 bg-blue-900 bg-opacity-35 rounded-md"
        onClick={handleSuggestion}
      >
        get suggestions
      </button> */}
      {team?.cast?.length ? (
        <div className="w-full text-center text-4xl font-bold text-zinc-200 my-5 py-5 max-md:py-2 max-md:my-2 max-md:text-3xl">
          Cast
        </div>
      ) : (
        ""
      )}
      {team?.cast?.length ? (
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
                      credit_id: person.credit_id,
                      id: person.id,
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
      ) : (
        ""
      )}
      {team?.crew?.length ? (
        <div className="w-full text-center text-4xl font-bold text-zinc-200 my-5 py-5 max-md:py-2 max-md:my-2 max-md:text-3xl">
          Crew
        </div>
      ) : (
        ""
      )}
      {team?.crew?.length ? (
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
                      credit_id: person.credit_id,
                      id: person.id,
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
      ) : (
        ""
      )}
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

export default TvSeriesWatch;
