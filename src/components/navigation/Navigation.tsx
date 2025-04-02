import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { Fragment } from "react/jsx-runtime";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { notify } from "../notifications/Notifications";
import { useRef } from "react";

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const openNavigationButtonRef = useRef<SVGSVGElement>(null);
  const dispatch = useAppDispatch();
  const { ids } = useAppSelector((state) => state.likedRecipes);
  const { currentUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(logout());
    localStorage.removeItem("user");
    navigate("/login");
    notify("Logout successful");
  };

  const openNavigation = () => {
    navRef.current?.classList.add("visible");
    openNavigationButtonRef.current?.classList.add("display-none");
  };
  const closeNavigation = () => {
    navRef.current?.classList.remove("visible");
    openNavigationButtonRef.current?.classList.remove("display-none");
  };

  return (
    <>
      <nav ref={navRef}>
        <button className='close-navigation' onClick={closeNavigation}>
          X
        </button>
        <NavLink to={"/"} onClick={closeNavigation}>
          Recipes
        </NavLink>
        <NavLink to={"/addRecipe"} onClick={closeNavigation}>
          Add recipe
        </NavLink>
        <NavLink to={"/favorites"} onClick={closeNavigation}>
          <span className='anchor-favorites'>
            Favorites
            <span className='badge'>{ids.length}</span>
          </span>
        </NavLink>

        {currentUser ? (
          <NavLink
            onClick={(e) => {
              handleLogout(e);
              closeNavigation();
            }}
            to={"/logout"}
          >
            Logout
          </NavLink>
        ) : (
          <Fragment>
            <NavLink to={"/login"} onClick={closeNavigation}>
              Log In
            </NavLink>
            <NavLink to={"/register"} onClick={closeNavigation}>
              Register
            </NavLink>
          </Fragment>
        )}
      </nav>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        width='32'
        height='32'
        fill='currentColor'
        className='menu-button'
        onClick={openNavigation}
        ref={openNavigationButtonRef}
      >
        <path d='M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z'></path>
      </svg>
    </>
  );
};
export default Navigation;
