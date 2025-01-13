import { useEffect, useRef, useState } from "react";
import "./Recipes.css";
import RecipeCard, { RecipeType } from "../../components/recipeCard/RecipeCard";
import { axiosInstance } from "../../config/config";
const Landing = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    axiosInstance
      .get<RecipeType[]>("/recipes")
      .then((r) => {
        setRecipes(r.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const ref = useRef<HTMLInputElement>(null);
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
              return <RecipeCard key={recipe._id} recipe={recipe} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Landing;
