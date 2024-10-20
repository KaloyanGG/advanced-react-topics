import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./HomeLayout.css";
import { Toaster } from "react-hot-toast";

const HomeLayout = () => {
  return (
    <>
      <Toaster position='top-right' containerStyle={{ inset: "3rem" }} />
      <nav>
        <NavLink to={"/"}>Recipes</NavLink>
        <NavLink to={"/addRecipe"}>Add recipe</NavLink>
        <NavLink to={"/idk"}>idk</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default HomeLayout;
