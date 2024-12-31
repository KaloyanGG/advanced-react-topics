import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logout } from "../../features/auth/authSlice";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const { ids } = useAppSelector((state) => state.likedRecipes);
  const navigate = useNavigate();
  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(logout());
    localStorage.removeItem("user");
    navigate("/login");
  };

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
      <NavLink to={"/login"}>Log In</NavLink>
      <NavLink to={"/register"}>Register</NavLink>
      <NavLink onClick={handleLogout} to={"/logout"}>
        Logout
      </NavLink>
    </nav>
  );
};
export default Navigation;
