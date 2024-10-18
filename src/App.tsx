import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeLayout, AddRecipe, Landing } from "./pages";
import DefaultError from "./pages/defaultError/DefaultError";
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
        path: "addRecipe",
        element: <AddRecipe />,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
