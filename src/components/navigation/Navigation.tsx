import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { Fragment } from "react/jsx-runtime";
import { useAppDispatch, useAppSelector } from "../../hooks";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const { ids } = useAppSelector((state) => state.likedRecipes);
  const { currentUser } = useAppSelector((state) => state.auth);
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

      {currentUser ? (
        <NavLink onClick={handleLogout} to={"/logout"}>
          Logout
        </NavLink>
      ) : (
        <Fragment>
          <NavLink to={"/login"}>Log In</NavLink>
          <NavLink to={"/register"}>Register</NavLink>
        </Fragment>
      )}
    </nav>
  );
};
export default Navigation;
