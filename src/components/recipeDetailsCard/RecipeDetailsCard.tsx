import { forwardRef } from "react";
import { Ingredient } from "../../services/ingredientsService";
import { RecipeType } from "../recipeCard/RecipeCard";
type RecipeDetailsCardProps = Omit<RecipeType, "ingredients" | "_id"> & {
  ingredients: Ingredient[];
  focused: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
const RecipeDetailsCard = forwardRef<HTMLDivElement, RecipeDetailsCardProps>(
  (
    { onClick, focused, image, name, ingredients, instructions, likes },
    ref
  ) => {
    return (
      <div
        onClick={onClick}
        ref={ref}
        className={`recipe-details${!focused ? " outside" : ""}`}
      >
        <div className='img'>
          <img src={image} alt={name} />
        </div>
        <div className='info-container'>
          <h1>Recipe: {name}</h1>
          <h3>Ingredients:</h3>
          <ul className='ingredients'>
            {ingredients.map((i) => {
              return <li key={i._id}>{i.name}</li>;
            })}
          </ul>
          <h3>Instructions:</h3>
          <p>{instructions}</p>
          <button className='like'>Likes: {likes}</button>
        </div>
      </div>
    );
  }
);
export default RecipeDetailsCard;
