/* eslint-disable react/prop-types */
import Card from "./Card";
import { useNavigate } from "react-router";
const StuffList = ({ list, stuffType }) => {
  const navigate = useNavigate();
  function handleCardClick(newid) {
    console.log("card click", newid);
    navigate(`/watch/${stuffType}/${newid}`);
  }
  return (
    <div className="overflow-x-auto my-7">
      <div className=" w-full mx-auto flex flex-row flex-nowrap gap-4 sm:gap-8 md:gap-12 lg:gap-16">
        {list?.map((item) => {
          return (
            <div
              key={item?.id}
              className="flex-none w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
              onClick={() => handleCardClick(item?.id)}
            >
              <Card data={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StuffList;
