import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./HomeLayout.css";
import { Toaster } from "react-hot-toast";
import VwIndicator from "../../components/VWIndicator/VWIndicator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
          <Outlet />
        </QueryClientProvider>
      </main>
    </>
  );
};
export default HomeLayout;
