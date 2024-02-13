/* eslint-disable react/prop-types */
import { IMG_CDN_URL } from "../constants";
import { IoStarHalfOutline } from "react-icons/io5";
const Card = ({ data }) => {
  console.log("card rendering...", data);
  // const data = {
  //   adult: false,
  //   backdrop_path: "/cnqwv5Uz3UW5f086IWbQKr3ksJr.jpg",
  //   id: 572802,
  //   title: "Aquaman and the Lost Kingdom",
  //   original_language: "en",
  //   original_title: "Aquaman and the Lost Kingdom",
  //   overview:
  //     "Black Manta seeks revenge on Aquaman for his father's death. Wielding the Black Trident's power, he becomes a formidable foe. To defend Atlantis, Aquaman forges an alliance with his imprisoned brother. They must protect the kingdom.",
  //   poster_path: "/7lTnXOy0iNtBAdRP3TZvaKJ77F6.jpg",
  //   media_type: "movie",
  //   genre_ids: [28, 12, 14],
  //   popularity: 1373.572,
  //   release_date: "2023-12-20",
  //   video: false,
  //   vote_average: 7,
  //   vote_count: 1434,
  // };

  return (
    data && (
      <div className=" flex flex-col w-full h-full justify-center overflow-hidden bg-slate-700 bg-opacity-25 rounded-lg shadow-md shadow-gray-700">
        <img
          src={`${IMG_CDN_URL}${data?.poster_path}`}
          alt={data?.title || data?.name}
          className="w-full h-4/5 object-cover "
        />
        <div className="mx-auto my-auto flex flex-col justify-center items-center">
          <h1 className=" text-center text-sm font-semibold">
            {data?.title || data?.name}
          </h1>
          <div className="flex flex-row items-center text-xs">
            <IoStarHalfOutline className=" text-yellow-400 text-lg mr-1" />
            <span className="font-semibold">
              IMDb: {data.vote_average.toPrecision(2)}
            </span>
          </div>
          <div className=" text-zinc-300 text-xs">
            {data?.release_date || data?.first_air_date}
          </div>
        </div>
      </div>
    )
  );
};

export default Card;
