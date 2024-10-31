import { LoaderFunctionArgs } from "react-router-dom";
import { axiosInstance } from "../config";

async function recipeLoader({ params }: LoaderFunctionArgs<any>) {
  return (await axiosInstance.get(`/recipes/${params.id}`)).data;
}

export default recipeLoader;
