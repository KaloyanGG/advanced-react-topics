import { useNavigate } from "react-router-dom";
import "./RecipeCard.css";
import { toggleLike } from "../../features/likedRecipes/likedRecipesSlice";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { getFromLocalStorage } from "../../utils/localStorage";
import { notify } from "../notifications/Notifications";
export type RecipeType = {
  _id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  image: string;
};
const RecipeCard = ({ recipe }: { recipe: RecipeType }) => {
  const [animation, setAnimation] = useState<boolean>(false);
  const navigate = useNavigate();
  const { ids } = useAppSelector((state) => state.likedRecipes);
  const dispatch = useAppDispatch();

  const onClick = () => {
    if (!getFromLocalStorage("user")) {
      navigate("/login", {
        state: {
          from: "/recipes",
        },
      });
      notify("You have to login first.");
      return;
    }
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 200);
    dispatch(toggleLike(recipe._id));
  };

  return (
    <div className='recipe-card'>
      <img src={recipe.image} alt={recipe.name} />
      <h2>{recipe.name}</h2>
      <p>{recipe.instructions}</p>
      <div className='read-like'>
        <button
          className='read-recipe-button'
          onClick={() => navigate(`/recipes/${recipe._id}`)}
        >
          Read recipe
        </button>
        <div className='likes'>
          <button
            className={`like ${animation ? "animate" : ""}`}
            onClick={onClick}
          >
            <svg
              className={`${ids.includes(recipe._id) ? "liked" : ""}`}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
            >
              <path d='M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z'></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default RecipeCard;
