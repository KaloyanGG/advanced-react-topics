import { useLoaderData, useNavigate } from "react-router-dom";
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
import recipeLoader from "../../loaders/recipeLoader";
const RecipeDetails = () => {
  const { recipes: loaderRecipes } = useLoaderData() as {
    recipes: RecipeType[];
  };
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: allIngredients } = useQuery({
    queryFn: fetchIngredients,
    queryKey: ["ingredients"],
    refetchOnMount: false,
  });
  const allIngredientsIds = allIngredients?.map((i) => i._id);
  const [filteredIngredients, setFilteredIngredients] = useState<{
    [key: string]: Ingredient[];
  }>({});
  const [recipes, setRecipes] = useState(loaderRecipes);
  const [isAnimating, setIsAnimating] = useState(false);

  const itemsRef = useRef(new Map<number, HTMLDivElement>());
  const alreadyScrolled = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const itemsLength = recipes.length;

  useEffect(() => {
    if (allIngredients && allIngredientsIds) {
      let filteredIngredientsMap: { [key: string]: any } = {};
      recipes.forEach((recipe) => {
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

    if (
      itemsRef.current &&
      itemsRef.current.size > 0 &&
      !alreadyScrolled.current
    ) {
      itemsRef.current.get(itemsLength / 2 - 0.5)?.scrollIntoView({
        behavior: "instant",
        block: "center",
        inline: "center",
      });
      alreadyScrolled.current = false;
    }
  }, [allIngredients, queryClient, recipes]);

  const onClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    where: string
  ) => {
    if (isAnimating) return;
    setIsAnimating(true);
    let nodeToScrollTo: HTMLDivElement | undefined = undefined;
    switch (where) {
      case "prev":
        nodeToScrollTo = itemsRef.current.get(Math.floor(itemsLength / 2 - 1))!;
        break;
      case "next":
        nodeToScrollTo = itemsRef.current.get(Math.ceil(itemsLength / 2))!;
        break;
      default:
        alert("something's wrong");
        return;
    }
    navigate(`/recipes/${nodeToScrollTo.id}`);
    nodeToScrollTo.classList.remove("outside");
    itemsRef.current.get(itemsLength / 2 - 0.5)?.classList.add("outside");
    containerRef.current!.onscrollend = async (ev: Event) => {
      containerRef.current!.onscrollend = null;
      const recipes = (
        await recipeLoader({ params: { id: nodeToScrollTo?.id } } as any)
      ).recipes;
      alreadyScrolled.current = false;
      setRecipes(recipes);
      setIsAnimating(false);
    };
    nodeToScrollTo!.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };
  return (
    <div className='recipe-details-container' ref={containerRef}>
      {recipes.map(({ _id, image, name, instructions, likes }, idx) => (
        <RecipeDetailsCard
          _id={_id}
          key={_id}
          focused={idx + 0.5 === recipes.length / 2}
          ref={(node) => {
            if (node) {
              itemsRef.current.set(idx, node);
            } else {
              itemsRef.current.delete(idx);
            }
          }}
          name={name}
          image={image}
          ingredients={filteredIngredients[name] || []}
          likes={likes}
          instructions={instructions}
          // works for odd numbers, for even - N/A
          onClick={
            idx + 0.5 < itemsLength / 2
              ? (e) => onClick(e, "prev")
              : idx + 0.5 > itemsLength / 2
              ? (e) => onClick(e, "next")
              : undefined
          }
        />
      ))}
    </div>
  );
};
export default RecipeDetails;
