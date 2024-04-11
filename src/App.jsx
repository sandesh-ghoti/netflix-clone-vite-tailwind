import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux";
import {
  Navbar,
  Body,
  Auth,
  Footer,
  Browse,
  About,
  Card,
  Watch,
  SidePanel,
} from "./components";
import DetailsPage from "./pages/DetailsPage";
import PeopleWatch from "./pages/PeopleWatch";
import { media_type_enum } from "./constants";
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
        {
          path: "watch",
          element: <Watch />,
          children: [
            {
              path: "movie/:id",
              element: <DetailsPage media_type={media_type_enum.movie} />,
            },
            {
              path: "tv/:id",
              element: <DetailsPage media_type={media_type_enum.tv} />,
            },
            { path: "person/:id", element: <PeopleWatch /> },
          ],
        },
        { path: "sidepanel", element: <SidePanel /> },
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
