import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeLayout, AddRecipe, Landing } from "./pages";
import DefaultError from "./pages/defaultError/DefaultError";
import RecipeDetails from "./pages/recipeDetails/RecipeDetails";
import recipeLoader from "./loaders/recipeLoader";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <DefaultError />,
    children: [
      {
        index: true,
        element: <Landing />,
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
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
