import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Auth from "./Auth";
const Body = () => {
  const user = useSelector((store) => store.user);
  return <div>{user ? <Outlet /> : <Auth />}</div>;
};

export default Body;
