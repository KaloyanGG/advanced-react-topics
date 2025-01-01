import { Ingredient } from "../../services/ingredientsService";
import { RecipeType } from "../recipeCard/RecipeCard";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { toggleLike } from "../../features/likedRecipes/likedRecipesSlice";
import { Ref } from "react";
type RecipeDetailsCardProps = Omit<RecipeType, "ingredients"> & {
  ingredients: Ingredient[];
  focused: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  ref: Ref<HTMLDivElement>;
};
const RecipeDetailsCard = ({
  ref,
  onClick,
  focused,
  image,
  name,
  ingredients,
  instructions,
  likes,
  _id,
}: RecipeDetailsCardProps) => {
  const { ids } = useAppSelector((state) => state.likedRecipes);
  const dispatch = useAppDispatch();
  const onLikeClick = () => {
    dispatch(toggleLike(_id));
  };
  return (
    <div
      onClick={onClick}
      ref={ref}
      className={`recipe-details${focused ? "" : " outside"}`}
      id={_id}
    >
      <div className='img'>
        <img src={image} alt={name} />
      </div>
      <div className='info-container'>
        <h1>Recipe: {name}</h1>
        <h2>Ingredients:</h2>
        <ul className='ingredients'>
          {ingredients.map((i) => {
            return <li key={i._id}>{i.name}</li>;
          })}
        </ul>
        <h2>Instructions:</h2>
        <p>{instructions}</p>
        <button className='like' onClick={onLikeClick}>
          <svg
            className={`${ids.includes(_id) ? "liked" : ""}`}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <path d='M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z'></path>
          </svg>
          {likes}
        </button>
      </div>
    </div>
  );
};
export default RecipeDetailsCard;
