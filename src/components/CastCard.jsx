/* eslint-disable react/prop-types */
import { IMG_CDN_URL } from "../constants";
const CastCard = ({ data }) => {
  return (
    <div className=" flex flex-col w-full h-full justify-center overflow-hidden bg-slate-700 bg-opacity-25 rounded-lg shadow-md shadow-gray-700">
      <img
        src={`${IMG_CDN_URL}${data?.profile_path}`}
        alt={data?.title || data?.name}
        className="w-full h-4/5 object-cover"
      />
      <div className="w-full mx-auto my-auto py-2 flex flex-col justify-center items-center">
        <h1 className=" text-center text-sm font-semibold">{data?.name}</h1>
        <div className="text-xs text-wrap text-center">{data?.character}</div>
      </div>
    </div>
  );
};

export default CastCard;
