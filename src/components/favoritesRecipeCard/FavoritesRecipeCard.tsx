import { toggleLike } from "../../features/likedRecipes/likedRecipesSlice";
import { useAppDispatch } from "../../hooks";
import { RecipeType } from "../recipeCard/RecipeCard";

type FavoritesRecipeCardProps = {
  recipe: RecipeType;
};

const FavoritesRecipeCard = ({ recipe }: FavoritesRecipeCardProps) => {
  const { _id, image, name } = recipe;
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(toggleLike(_id));
  };

  return (
    <div className='favorites-recipe-card'>
      <img src={image} alt={name} />
      <div className='overlay'>
        <h1>{name}</h1>
        <button onClick={onClick}></button>
      </div>
    </div>
  );
};
export default FavoritesRecipeCard;
