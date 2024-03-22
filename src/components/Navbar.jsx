import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "../redux/userSlice";
const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAuth = () => {
    if (user) {
      dispatch(removeUser());
    }
    navigate("/auth");
  };
  return (
    <div className="absolute top-0 left-0 z-50 w-full flex flex-row justify-between items-center bg-gradient-to-b from-black bg-opacity-60 px-3">
      <NavLink to="/">
        <div>
          <img
            src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
            alt="logo"
            className="h-16"
          />
        </div>
      </NavLink>
      <ul className="flex flex-row">
        <NavLink to="/about">
          <li className="px-3 text-white">About</li>
        </NavLink>
        <li>
          <button
            onClick={handleAuth}
            className="px-3 py-1 bg-red-600 rounded-sm text-sm text-white tracking-tighter"
          >
            {!user ? "Sign In" : "Sign Out"}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
