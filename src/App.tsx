import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeLayout, AddRecipe, Landing } from "./pages";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <div>route not found lol</div>,
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
