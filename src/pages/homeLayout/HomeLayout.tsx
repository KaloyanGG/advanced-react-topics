import { Outlet } from "react-router-dom";
import "./HomeLayout.css";
import VwIndicator from "../../components/VWIndicator/VWIndicator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navigation from "../../components/navigation/Navigation";
import CurrentUser from "../../components/currentUser/CurrentUser";
import { useEffect } from "react";
import { validateLikedRecipes } from "../../features/likedRecipes/likedRecipesSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

const queryClient = new QueryClient();
const HomeLayout = () => {
  const dispatch = useAppDispatch();
  const likedRecipes = useAppSelector((state) => state.likedRecipes.ids);

  useEffect(() => {
    if (likedRecipes.length > 0) {
      dispatch(validateLikedRecipes(likedRecipes));
    }
  }, []);

  return (
    <>
      <VwIndicator />
      <Navigation />
      <CurrentUser />
      <main>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition='bottom-left'
          />
          <Outlet />
        </QueryClientProvider>
      </main>
    </>
  );
};
export default HomeLayout;
