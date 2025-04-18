import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import recipeLoader from "./loaders/recipeLoader";
import {
  PrivateRoute,
  PublicRoute,
} from "./components/routeGuards/RouteGuards";
import Recipes from "./pages/recipes/Recipes.tsx";
import RecipeNotFound from "./components/errors/recipeNotFound/RecipeNotFound.tsx";

const HomeLayout = lazy(() => import("./pages/homeLayout/HomeLayout.tsx"));
const NotFound = lazy(() => import("./pages/notFound/NotFound.tsx"));
const AddRecipe = lazy(() => import("./pages/addRecipe/AddRecipe.tsx"));
const RecipeDetails = lazy(
  () => import("./pages/recipeDetails/RecipeDetails.tsx")
);
const MobileRecipeDetails = lazy(
  () => import("./pages/mobileRecipeDetails/MobileRecipeDetails.tsx")
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
        element: (
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        ),
        path: "addRecipe",
      },
      {
        element:
          window.innerWidth > 768 ? <RecipeDetails /> : <MobileRecipeDetails />,
        path: "recipes/:id",
        loader: recipeLoader,
        errorElement: <RecipeNotFound />,
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

// function wait() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//     }, 1500);
//   });
// }

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
