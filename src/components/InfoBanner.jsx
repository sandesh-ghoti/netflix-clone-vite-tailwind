/* eslint-disable react/prop-types */
import { IMG_CDN_URL } from "../constants";
import { IoStarHalfOutline } from "react-icons/io5";
import { GiExpense, GiProfit } from "react-icons/gi";
import precision from "../utils/currencyPrecision";
const InfoBanner = ({ data }) => {
  console.log("infoBanner rendering....");
  return (
    <div
      className={
        " relative w-full h-full mx-auto bg-slate-900 bg-opacity-70 grid grid-cols-3 xl:grid-cols-4 gap-4 items-center overflow-hidden px-2 py-4 mt-6"
      }
    >
      <img
        src={`${IMG_CDN_URL}${data?.backdrop_path || data?.poster_path}`}
        alt={`${data?.name || data?.title}`}
        className="w-full h-full absolute left-0 top-0 object-cover -z-10"
      />
      <img
        src={`${IMG_CDN_URL}${data?.poster_path}`}
        alt={`${data?.name || data?.title}`}
        className=" col-span-1 rounded-md shadow-md shadow-slate-400 my-auto"
      />
      <div className="col-span-2 my-auto flex flex-col">
        <h1 className="text-3xl font-bold text-slate-100">
          {data?.title || data?.name}
        </h1>
        <p className="text-sm text-zinc-200 my-2">{data?.overview}</p>
        <div className="flex flex-row flex-wrap gap-4 max-md:text-sm max-md:gap-1">
          <div className=" flex flex-row items-center ">
            <IoStarHalfOutline className=" text-yellow-400 text-lg mr-1" />
            <span className="font-semibold">
              IMDb: {data?.vote_average?.toPrecision(2)}
            </span>
          </div>
          <div className="flex flex-row items-center">
            <GiProfit className="text-2xl text-green-300 mr-2" />$
            {precision(data?.revenue)}
          </div>
          <div className="flex flex-row items-center">
            <GiExpense className="text-2xl text-rose-400 mr-2" />$
            {precision(data?.budget)}
          </div>
        </div>
        <div className=" text-zinc-300 text-xs">
          {data?.release_date
            ? "Release Date: " + data?.release_date
            : "Air Date: " + data?.first_air_date}
        </div>
      </div>
    </div>
  );
};

export default InfoBanner;
