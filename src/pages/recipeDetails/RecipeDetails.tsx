import { useLoaderData } from "react-router-dom";
import { RecipeType } from "../../components/recipeCard/RecipeCard";
import "./RecipeDetails.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchIngredients,
  Ingredient,
} from "../../services/ingredientsService";
import { useEffect, useState } from "react";

function arrayAIncludesFullyArrayB(
  arrayA: string[],
  arrayB: string[]
): boolean {
  return arrayB.every((element) => arrayA.includes(element));
}

const RecipeDetails = () => {
  const recipe = useLoaderData() as RecipeType;
  const {
    image,
    name,
    instructions,
    ingredients: recipeIngredientIds,
    likes,
  } = recipe;
  const { data: allIngredients } = useQuery({
    queryFn: fetchIngredients,
    queryKey: ["ingredients"],
    refetchOnMount: false,
  });
  const [shownIngredients, setShownIngredients] = useState<Ingredient[]>([]);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (allIngredients) {
      if (
        !arrayAIncludesFullyArrayB(
          allIngredients!.map((i) => i._id),
          recipeIngredientIds
        )
      ) {
        queryClient.invalidateQueries({ queryKey: ["ingredients"] });
      }
      setShownIngredients(
        allIngredients.filter((a) => recipeIngredientIds.includes(a._id))
      );
    }
  }, [allIngredients]);
  return (
    <div className='recipe-details'>
      <div className='img'>
        <img src={image} alt={name} />
      </div>
      <div className='info-container'>
        <h1>Recipe: {name}</h1>
        <h3>Ingredients:</h3>
        <ul className='ingredients'>
          {shownIngredients.map((i) => {
            return <li key={i._id}>{i.name}</li>;
          })}
        </ul>
        <h3>Instructions:</h3>
        <p>{instructions}</p>
        <button className='like'>Likes: {likes}</button>
      </div>
    </div>
  );
};
export default RecipeDetails;
