import { useEffect, useRef, useState } from "react";
import { RecipeCard } from "../../components";
import "./Recipes.css";
import { RecipeType } from "../../components/recipeCard/RecipeCard";
import { axiosInstance } from "../../config/config";
// import {
//   NotificationEnum,
//   notify,
// } from "../../components/notifications/Notifications";
// let called = 0;
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
      {/* <button
        onClick={() => {
          notify(
            ref.current?.value || new Date().toTimeString().split(" ")[0],
            called % 3 == 0
              ? NotificationEnum.INFO
              : called % 3 === 1
              ? NotificationEnum.ERROR
              : NotificationEnum.SUCCESS
          );
          called++;
        }}
      >
        click me
      </button>
      <input type='text' ref={ref} style={{ border: "1px solid black" }} /> */}
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
