import { useState, useEffect, useRef } from "react";
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
  const dialogRef = useRef<HTMLDialogElement>(null);
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
    const dialogDimensions = dialogRef.current!.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialogRef.current?.close();
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
