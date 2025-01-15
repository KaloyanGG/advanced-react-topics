import { useState, useEffect } from "react";
import RecipeCard, { RecipeType } from "../../components/recipeCard/RecipeCard";
import { axiosInstance } from "../../config/config";
import "./Favorites.css";
import { useAppSelector } from "../../hooks";
import FavoritesRecipeCard from "../../components/favoritesRecipeCard/FavoritesRecipeCard";

const Favorites = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [error, setError] = useState<any>(null);
  const { ids } = useAppSelector((state) => state.likedRecipes);

  useEffect(() => {
    if (ids.length === 0) {
      return;
    }
    axiosInstance
      .get<RecipeType[]>("/recipes", {
        params: { ids: ids.join(",") },
      })
      .then((r) => {
        setRecipes(r.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [ids]);

  return (
    <div className='favorites-container'>
      <h1>Favorites</h1>
      {error ? (
        <p>Error loading the recipes from the server</p>
      ) : (
        <>
          <h3>Found: {recipes.length}</h3>
          <div className='favorites-list'>
            {recipes.map((recipe) => {
              return <FavoritesRecipeCard key={recipe._id} recipe={recipe} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};
export default Favorites;
