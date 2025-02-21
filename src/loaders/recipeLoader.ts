import { LoaderFunctionArgs } from "react-router-dom";
import { axiosInstance } from "../config/config";
import { RecipeType } from "../components/recipeCard/RecipeCard";

async function recipeLoader({ params }: LoaderFunctionArgs<any>) {
  return (
    await axiosInstance.get<{ recipes: RecipeType[] }>(
      `/recipes/details/${params.id}`
    )
  ).data;
}

export default recipeLoader;
