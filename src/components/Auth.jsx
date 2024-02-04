import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(!user ? addUser({ name: "sandesh" }) : removeUser());
    navigate("/");
  };
  return (
    <div>
      Auth <button onClick={handleClick}>add user</button>
    </div>
  );
};

export default Auth;
