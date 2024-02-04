import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Auth from "./components/Auth";
import About from "./components/About";
import { Provider } from "react-redux";
import store from "./utils/store";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Body />
          <div>Footer</div>
        </>
      ),
      children: [
        {
          path: "auth",
          element: <Auth />,
        },
        {
          path: "about",
          element: <About />,
        },
      ],
    },
  ]);
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;

/**
- Header -sticky
  - navigation
    - logo
    - menu
      - menu-item
- body
  - hero
  - content
- /login page
  - header signin button
  - sign in form
- / page
  - header
   -logo
   - signin button
  -body
   - sign in form
- /regform page
 - header
 -body
  - signup form
 */
