import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./HomeLayout.css";

const HomeLayout = () => {
  return (
    <>
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
