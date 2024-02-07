import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Auth from "./components/Auth";
import About from "./components/About";
import { Provider } from "react-redux";
import store from "./utils/store";
import Browse from "./components/Browse";
import Footer from "./components/Footer";
import Card from "./components/Card";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Body />
          <Footer />
        </>
      ),
      children: [
        {
          path: "/",
          element: <Browse />,
        },
        {
          path: "auth",
          element: <Auth />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "card",
          element: <Card />,
        },
        { path: "*", element: <h1>404</h1> },
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
