import { useEffect, useState } from "react";
import { RecipeCard } from "../../components";
import "./Recipes.css";
import { RecipeType } from "../../components/recipeCard/RecipeCard";
import { axiosInstance } from "../../config";

const Landing = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    axiosInstance
      .get("/recipes")
      .then((r) => {
        setRecipes(r.data as any);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);
  return (
    <div className='recipes-container'>
      <h1>Recipes List</h1>
      {error ? (
        <p>Error loading the recipes from the server</p>
      ) : (
        <>
          <h3>Found: {recipes.length}</h3>
          <div className='recipes-list'>
            {recipes.map((recipe) => {
              return <RecipeCard key={recipe.id} recipe={recipe} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Landing;