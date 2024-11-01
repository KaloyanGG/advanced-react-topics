import { useLoaderData } from "react-router-dom";
import { RecipeType } from "../../components/recipeCard/RecipeCard";
import "./RecipeDetails.css";

const RecipeDetails = () => {
  const recipe = useLoaderData() as RecipeType;
  console.log(recipe);
  return (
    <div className='recipe-details'>
      <div className='img'>
        <img src={recipe.image} alt={recipe.name} />
      </div>
      <div className='info-container'>
        <h1>Recipe: {recipe.name}</h1>
        <h3>Ingredients:</h3>
        <ul className='ingredients'>
          {recipe.ingredients.map((i) => {
            return <li>{i}</li>;
          })}
        </ul>
        <h3>Instructions:</h3>
        <p>{recipe.instructions}</p>
        <button className='like'>Likes: {recipe.likes}</button>
      </div>
    </div>
  );
};
export default RecipeDetails;
