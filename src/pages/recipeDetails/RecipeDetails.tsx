import { useLoaderData } from "react-router-dom";
import { RecipeType } from "../../components/recipeCard/RecipeCard";
import "./RecipeDetails.css";

const RecipeDetails = () => {
  const recipe = useLoaderData() as RecipeType;
  console.log(recipe);
  return (
    <div className='recipe-details'>
      {recipe.name}
      {recipe.id}
      {recipe.image}
      {recipe.ingredients}
      {recipe.instructions}
      {recipe.likes}
    </div>
  );
};
export default RecipeDetails;
