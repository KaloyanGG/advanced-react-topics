import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./HomeLayout.css";
import VwIndicator from "../../components/VWIndicator/VWIndicator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
const HomeLayout = () => {
  return (
    <>
      <VwIndicator />
      <nav>
        <NavLink to={"/"}>Recipes</NavLink>
        <NavLink to={"/addRecipe"}>Add recipe</NavLink>
        <NavLink to={"/idk"}>idk</NavLink>
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
