import { useEffect, useRef, useState } from "react";
import "./Recipes.css";
import RecipeCard, { RecipeType } from "../../components/recipeCard/RecipeCard";
import { axiosInstance } from "../../config/config";
import Pagination from "../../components/pagination/Pagination";

const recipesPerPage = 3;

const Landing = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [error, setError] = useState<any>(null);
  const [activePage, setActivePage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  useEffect(() => {
    axiosInstance
      .get<{ count: number }>("/recipesCount")
      .then((r) => {
        setNumberOfPages(Math.ceil(r.data.count / recipesPerPage));
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get<RecipeType[]>(`/recipes?page=${activePage}?&limit=${recipesPerPage}`)
      .then((r) => {
        setRecipes(r.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [activePage]);

  const onPageChange = (page: number) => {
    setActivePage(page);
  };

  return (
    <div className='recipes-container'>
      <h1>Recipes List</h1>
      {error ? (
        <p>Error loading the recipes from the server</p>
      ) : (
        <>
          <h3>Found: {recipes.length}</h3>
          <Pagination
            pages={numberOfPages}
            activePage={activePage}
            onPageChange={onPageChange}
          />
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
