/* eslint-disable react/prop-types */
import { YT_THUMBNAIL_URL } from "../constants";
import { FaPlay } from "react-icons/fa";
const VideoCard = ({ data }) => {
  return (
    data?.key && (
      <div className="relative w-full aspect-video shadow-sm shadow-stone-400 flex justify-center items-center">
        <img
          src={YT_THUMBNAIL_URL + data.key + "/hqdefault.jpg"}
          alt={data?.videoName}
          className="absolute left-0 top-0 w-full h-full object-cover -z-10"
        />
        <div className=" rounded-full bg-slate-800 bg-opacity-30">
          <FaPlay className=" text-3xl m-2" />
        </div>
      </div>
    )
  );
};

export default VideoCard;
