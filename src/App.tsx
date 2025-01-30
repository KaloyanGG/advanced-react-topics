import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  AddRecipe,
  Recipes,
  DefaultError,
  RecipeDetails,
} from "./pages";
import recipeLoader from "./loaders/recipeLoader";
import Authenticate from "./pages/authenticate/Authenticate";
import {
  PrivateRoute,
  PublicRoute,
} from "./components/routeGuards/RouteGuards";
import Favorites from "./pages/favorites/Favorites";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <DefaultError />,
    children: [
      {
        index: true,
        element: <Recipes />,
      },
      {
        path: "recipes",
        element: <Recipes />,
      },
      {
        element: <AddRecipe />,
        path: "addRecipe",
      },
      {
        element: <RecipeDetails />,
        path: "recipes/:id",
        loader: recipeLoader,
      },
      {
        element: (
          <PublicRoute>
            <Authenticate type='login' />
          </PublicRoute>
        ),
        path: "login",
      },
      {
        element: (
          <PublicRoute>
            <Authenticate type='register' />
          </PublicRoute>
        ),
        path: "register",
      },
      {
        element: (
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        ),
        path: "favorites",
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
