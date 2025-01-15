import { RecipeType } from "../recipeCard/RecipeCard";

type FavoritesRecipeCardProps = {
  recipe: RecipeType;
};

const FavoritesRecipeCard = ({ recipe }: FavoritesRecipeCardProps) => {
  const { _id, image, ingredients, instructions, likes, name } = recipe;

  return (
    <div className='favorites-recipe-card'>
      <img src={image} alt={name} />
    </div>
  );
};
export default FavoritesRecipeCard;
