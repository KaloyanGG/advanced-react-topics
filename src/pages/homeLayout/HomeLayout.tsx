import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./HomeLayout.css";
import { Toaster } from "react-hot-toast";
import VwIndicator from "../../components/VWIndicator/VWIndicator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const HomeLayout = () => {
  return (
    <>
      <VwIndicator />
      <Toaster position='top-right' containerStyle={{ inset: "3rem" }} />
      <nav>
        <NavLink to={"/"}>Recipes</NavLink>
        <NavLink to={"/addRecipe"}>Add recipe</NavLink>
        <NavLink to={"/idk"}>idk</NavLink>
      </nav>
      <main>
        <QueryClientProvider client={new QueryClient()}>
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
