import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks";

const Navigation = () => {
  const { ids } = useAppSelector((state) => state.likedRecipes);

  return (
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
  );
};
export default Navigation;
