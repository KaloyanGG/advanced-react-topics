import { useLoaderData } from "react-router-dom";
import "./MobileRecipeDetails.css";
import { RecipeType } from "../../components/recipeCard/RecipeCard";
import {
  fetchIngredients,
  Ingredient,
} from "../../services/ingredientsService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import arrayAIncludesFullyArrayB from "../../utils/arraysInclusion";

const MobileRecipeDetails = () => {
  const { recipes } = useLoaderData() as {
    recipes: RecipeType[];
  };
  const queryClient = useQueryClient();

  const { image, name, _id, ingredients, instructions } = recipes[0];

  const { data: allIngredients, isLoading } = useQuery({
    queryFn: fetchIngredients,
    queryKey: ["ingredients"],
    refetchOnMount: false,
  });
  const allIngredientsIds = allIngredients?.map((i) => i._id);

  const [finalIngredients, setFinalIngredients] = useState<Ingredient[]>([]);

  console.log(allIngredients);

  useEffect(() => {
    if (allIngredients && allIngredientsIds) {
      if (!arrayAIncludesFullyArrayB(allIngredientsIds, ingredients)) {
        queryClient.invalidateQueries({ queryKey: ["ingredients"] });
        return;
      }

      setFinalIngredients(
        allIngredients.filter((a) => ingredients.includes(a._id))
      );
    }
  }, [allIngredients]);

  return (
    <div className='mobile-recipe-details'>
      <img src={image} />
      <div className='content'>
        <h1>{name}</h1>
        <p>
          <strong>
            Ingredients:{" "}
            {isLoading
              ? "Loading..."
              : finalIngredients.map((f) => f.name).join(", ")}
          </strong>
        </p>
        <p>{instructions}</p>
      </div>
    </div>
  );
};

export default MobileRecipeDetails;
