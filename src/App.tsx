import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import recipeLoader from "./loaders/recipeLoader";
import {
  PrivateRoute,
  PublicRoute,
} from "./components/routeGuards/RouteGuards";
import Recipes from "./pages/recipes/Recipes.tsx";

const HomeLayout = lazy(() => import("./pages/homeLayout/HomeLayout.tsx"));
const NotFound = lazy(() => import("./pages/notFound/NotFound.tsx"));
const AddRecipe = lazy(() => import("./pages/addRecipe/AddRecipe.tsx"));
const RecipeDetails = lazy(
  () => import("./pages/recipeDetails/RecipeDetails.tsx")
);
const Authenticate = lazy(() => import("./pages/authenticate/Authenticate"));
const Favorites = lazy(() => import("./pages/favorites/Favorites"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
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

function wait() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
}

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
