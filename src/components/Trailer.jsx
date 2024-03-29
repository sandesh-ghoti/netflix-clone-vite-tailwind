/* eslint-disable react/prop-types */
import YtPlayer from "./YtPlayer";
import { useNavigate } from "react-router-dom";

const Trailer = ({ videoKey, movieDetails }) => {
  console.log(videoKey, movieDetails);
  const navigate = useNavigate();
  function handlePageRedirect(card) {
    // console.log(card, `watch/${card.media_type}/${card.id}`);
    navigate(`watch/${card.media_type}/${card.id}`);
  }
  return (
    <div className="relative w-full h-full flex flex-col items-center">
      <div className="absolute left-7 bottom-7 flex flex-col  w-1/2 xl:w-96">
        <h1 className=" text-2xl text-violet-400 font-bold ">
          {movieDetails?.title || movieDetails?.name}
        </h1>
        <p className="max-sm:hidden text-sm text-justify text-pretty text-slate-200">
          {movieDetails?.overview}
        </p>
        <button
          className="mr-auto my-2 px-2 py-1 rounded-md border-none ring-1 bg-slate-800 bg-opacity-40"
          onClick={() => handlePageRedirect(movieDetails)}
        >
          Watch Now
        </button>
      </div>
      <div className="w-full pointer-events-none">
        <YtPlayer YTkey={videoKey} autoplay={1} loop={1} />
      </div>
    </div>
  );
};

export default Trailer;
