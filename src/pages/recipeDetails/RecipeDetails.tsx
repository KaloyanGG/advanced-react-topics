import { useLoaderData } from "react-router-dom";
import { RecipeType } from "../../components/recipeCard/RecipeCard";
import "./RecipeDetails.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchIngredients,
  Ingredient,
} from "../../services/ingredientsService";
import { useEffect, useRef, useState } from "react";
import arrayAIncludesFullyArrayB from "../../utils/arraysInclusion";
import RecipeDetailsCard from "../../components/recipeDetailsCard/RecipeDetailsCard";
type RecipeDetailsResponseType = {
  previous: RecipeType;
  current: RecipeType;
  next: RecipeType;
};
const RecipeDetails = () => {
  const { previous, current, next } =
    useLoaderData() as RecipeDetailsResponseType;
  const queryClient = useQueryClient();

  const middleCardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: allIngredients } = useQuery({
    queryFn: fetchIngredients,
    queryKey: ["ingredients"],
    refetchOnMount: false,
  });
  const allIngredientsIds = allIngredients?.map((i) => i._id);
  const [filteredIngredients, setFilteredIngredients] = useState<{
    [key: string]: Ingredient[];
  }>({});

  useEffect(() => {
    if (allIngredients && allIngredientsIds) {
      let filteredIngredientsMap: { [key: string]: any } = {};
      [previous, current, next].forEach((recipe) => {
        if (!arrayAIncludesFullyArrayB(allIngredientsIds, recipe.ingredients)) {
          queryClient.invalidateQueries({ queryKey: ["ingredients"] });
        }
        filteredIngredientsMap = {
          ...filteredIngredientsMap,
          [recipe.name]: allIngredients.filter((a) =>
            recipe.ingredients.includes(a._id)
          ),
        };
      });
      setFilteredIngredients(filteredIngredientsMap);
    }

    if (middleCardRef.current) {
      middleCardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [allIngredients, queryClient]);
  return (
    <div className='recipe-details-container' ref={containerRef}>
      {[previous, current, next].map(
        ({ _id, image, name, instructions, likes }) => (
          <RecipeDetailsCard
            key={_id}
            focused={current._id === _id}
            ref={current._id === _id ? middleCardRef : null}
            name={name}
            image={image}
            ingredients={filteredIngredients[name] || []}
            likes={likes}
            instructions={instructions}
          />
        )
      )}
    </div>
  );
};
export default RecipeDetails;
