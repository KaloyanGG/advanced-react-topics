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
        element: <Authenticate type='login' />,
        path: "login",
      },
      {
        element: <Authenticate type='register' />,
        path: "register",
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
