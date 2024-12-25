import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./HomeLayout.css";
import VwIndicator from "../../components/VWIndicator/VWIndicator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAppSelector } from "../../hooks";

const queryClient = new QueryClient();
const HomeLayout = () => {
  const { ids } = useAppSelector((state) => state.likedRecipes);
  return (
    <>
      <VwIndicator />
      <nav>
        <NavLink to={"/"}>Recipes</NavLink>
        <NavLink to={"/addRecipe"}>Add recipe</NavLink>
        <NavLink to={"/favorites"}>
          <span className='anchor-favorites'>
            Favorites
            <span className='badge'>{ids.length}</span>
          </span>
        </NavLink>
      </nav>
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
