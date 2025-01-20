import { useState, useEffect } from "react";
import { RecipeType } from "../../components/recipeCard/RecipeCard";
import { axiosInstance } from "../../config/config";
import "./Favorites.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import FavoritesRecipeCard from "../../components/favoritesRecipeCard/FavoritesRecipeCard";
import { clearAllLiked } from "../../features/likedRecipes/likedRecipesSlice";

const Favorites = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [error, setError] = useState<any>(null);
  const { ids } = useAppSelector((state) => state.likedRecipes);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (ids.length === 0) {
      setRecipes([]);
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
      <div className='row'>
        <h1>Favorites</h1>
        {recipes.length > 0 && (
          <button className='clear' onClick={() => dispatch(clearAllLiked())}>
            Clear all
          </button>
        )}
      </div>

      {error ? (
        <p>Error loading the recipes from the server</p>
      ) : recipes.length === 0 ? (
        <p>List is empty.</p>
      ) : (
        <div className='favorites-list'>
          {recipes.map((recipe) => {
            return <FavoritesRecipeCard key={recipe._id} recipe={recipe} />;
          })}
        </div>
      )}
    </div>
  );
};
export default Favorites;
