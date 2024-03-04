import { useState } from "react";
import axiosClient from "../utils/axiosClient";
import Card from "./Card";

/**
 * sort component
 * filter component
 */
const SidePanel = () => {
  const [findone, setFindOne] = useState(null);
  async function handleclick(e) {
    e.preventDefault();
    console.log(e.target.name);
    let res = await axiosClient("trending/movie/day");
    setFindOne(res?.data?.results[0]);
  }
  return (
    <div
      className="w-full h-64 flex justify-center items-center"
      onClick={handleclick}
    >
      SidePanel
      {findone && <Card data={findone} />}
    </div>
  );
};

export default SidePanel;
