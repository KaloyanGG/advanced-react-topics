import { useState, useEffect, useRef } from "react";
import { RecipeType } from "../../components/recipeCard/RecipeCard";
import { axiosInstance } from "../../config/config";
import "./Favorites.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import FavoritesRecipeCard from "../../components/favoritesRecipeCard/FavoritesRecipeCard";
import {
  clearAllLiked,
  validateLikedRecipes,
} from "../../features/likedRecipes/likedRecipesSlice";
import isClickOutside from "../../utils/isClickOutside";
import { useErrorBoundary } from "react-error-boundary";

const Favorites = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const { ids } = useAppSelector((state) => state.likedRecipes);
  const dispatch = useAppDispatch();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { showBoundary } = useErrorBoundary();
  useEffect(() => {
    if (ids.length === 0) {
      setRecipes([]);
      return;
    }
    axiosInstance
      .get<{ recipes: RecipeType[] }>("/recipes", {
        params: { ids: ids.join(",") },
      })
      .then((r) => {
        dispatch(validateLikedRecipes(ids));
        setRecipes(r.data.recipes);
      })
      .catch((error) => {
        showBoundary(error);
      });
  }, [ids]);

  const onClearAllClick = () => {
    dialogRef.current?.showModal();
  };
  const onYesClick = () => {
    if (dialogRef.current) {
      dialogRef.current?.close();
      dispatch(clearAllLiked());
    }
  };
  const onCancelClick = () => {
    dialogRef.current?.close();
  };
  const onDialogClick = (
    e: React.MouseEvent<HTMLDialogElement, MouseEvent>
  ) => {
    if (dialogRef.current && isClickOutside(dialogRef.current, e)) {
      dialogRef.current.close();
    }
  };

  return (
    <div className='favorites-container'>
      <dialog ref={dialogRef} onClick={onDialogClick}>
        <h2>Are you sure?</h2>
        <div className='buttons-row'>
          <button className='cancel' onClick={onCancelClick}>
            Cancel
          </button>
          <button className='yes' onClick={onYesClick}>
            Yes
          </button>
        </div>
      </dialog>
      <div className='row'>
        <h1>Favorites</h1>
        {recipes.length > 0 && (
          <button className='clear' onClick={onClearAllClick}>
            Clear all
          </button>
        )}
      </div>

      {recipes.length === 0 ? (
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
