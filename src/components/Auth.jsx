import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useState } from "react";
const Auth = () => {
  console.log("Auth rendering....");
  const user = useSelector((state) => state.user);
  const [isSignedIn, setIsSignedIn] = useState(true);
  const formInput = useRef({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const desiredLocation = useLocation().pathname;

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, username } = formInput.current;
    dispatch(!user ? addUser({ email, username }) : removeUser());
    navigate(
      desiredLocation && desiredLocation != "/auth" ? desiredLocation : "/"
    );
  };
  const handleInput = (e) => {
    formInput.current[e.target.name] = e.target.value;
    console.log(formInput.current);
  };
  return (
    <div className="bg-hero-bg w-full h-screen object-cover flex flex-col justify-center items-center">
      <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-r from-black"></div>
      <form
        className=" z-10 w-96 bg-slate-900 opacity-70 rounded-md flex flex-col justify-center items-center mx-auto py-2"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-white">
          {isSignedIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignedIn && (
          <input
            type="text"
            placeholder="Username"
            name="username"
            className=" w-4/5 my-2 px-2 text-black rounded-sm"
            onChange={handleInput}
            ref={formInput.current.username}
          />
        )}
        <input
          type="text"
          placeholder="Email"
          name="email"
          className=" w-4/5 my-2 px-2 text-black rounded-sm"
          onChange={handleInput}
          ref={formInput.current.email}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className=" w-4/5 my-2 px-2 text-black rounded-sm"
          onChange={handleInput}
          ref={formInput.current.password}
        />
        <button
          className="px-3 py-2 my-2 bg-red-600 rounded-sm text-sm text-white tracking-tighter"
          onClick={handleSubmit}
        >
          {isSignedIn ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="text-sm my-2 text-white cursor-pointer"
          onClick={() => {
            formInput.current = {};
            setIsSignedIn(!isSignedIn);
          }}
        >
          {isSignedIn ? "Don't have an account?" : "Already have an account?"}
        </p>
      </form>
    </div>
  );
};

export default Auth;
