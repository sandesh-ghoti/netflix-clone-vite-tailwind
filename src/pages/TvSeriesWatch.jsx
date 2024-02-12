import { useEffect, useState } from "react";
import { options, requests } from "../constants";
import { useParams } from "react-router-dom";
import YtPlayer from "../components/YtPlayer";

import CastCard from "../components/CastCard";
import VideoCard from "../components/VideoCard";
import InfoBanner from "../components/InfoBanner";
const TvSeriesWatch = () => {
  console.log("TvSeriesWatch rendering...");
  const { id } = useParams();
  const [tv, setTv] = useState(null);
  const [videos, setVideos] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [team, setTeam] = useState(null);
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
    console.log("team", details, team);
  }
  useEffect(() => {
    //fetch tv of id
    fetchDetails();
    fetchVideos();
    fetchTeam();
  }, []);
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
      <div className="w-full  overflow-hidden">
        (tv&&
        <InfoBanner data={tv} />)
      </div>
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
    </div>
  );
};

export default TvSeriesWatch;
