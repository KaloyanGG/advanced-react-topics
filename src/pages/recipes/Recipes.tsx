import { useEffect, useState } from "react";
import "./Recipes.css";
import RecipeCard, { RecipeType } from "../../components/recipeCard/RecipeCard";
import { axiosInstance } from "../../config/config";
import Pagination from "../../components/pagination/Pagination";
import SimplePagination from "../../components/pagination/SimplePagination";
import { useErrorBoundary } from "react-error-boundary";

const recipesPerPage = 3;

const Landing = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [activePage, setActivePage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [simplePagination, setSimplePagination] = useState<boolean>(true);
  const { showBoundary } = useErrorBoundary();
  useEffect(() => {
    axiosInstance
      .get<{ count: number }>("/recipesCount")
      .then((r) => {
        setNumberOfPages(Math.ceil(r.data.count / recipesPerPage));
      })
      .catch((error) => {
        showBoundary(error);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get<{ recipes: RecipeType[]; totalCount: number }>(
        `/recipes?page=${activePage}?&limit=${recipesPerPage}`
      )
      .then((r) => {
        setRecipes(r.data.recipes);
        setTotal(r.data.totalCount);
      })
      .catch((error) => {
        showBoundary(error);
      });
  }, [activePage]);

  const onPageChange = (page: number) => {
    setActivePage(page);
  };

  const onPreviousClick = () => {
    setActivePage((prev) => {
      return prev - 1;
    });
  };

  const onNextClick = () => {
    setActivePage((prev) => {
      return prev + 1;
    });
  };

  const onPaginationSwap = () => {
    setSimplePagination(!simplePagination);
  };

  return (
    <div className='recipes-container'>
      <h1>Recipes List</h1>
      <h3>Found: {total}</h3>
      <div className='pagination-container'>
        {simplePagination ? (
          <SimplePagination
            pages={numberOfPages}
            activePage={activePage}
            onPreviousClick={onPreviousClick}
            onNextClick={onNextClick}
          />
        ) : (
          <Pagination
            pages={numberOfPages}
            activePage={activePage}
            onPageChange={onPageChange}
          />
        )}
        <button className='swap' onClick={onPaginationSwap}>
          {simplePagination ? "complex " : "simple "}
          <br />
          pagination
        </button>
      </div>
      <div className='recipes-list'>
        {recipes.map((recipe) => {
          return <RecipeCard key={recipe._id} recipe={recipe} />;
        })}
      </div>
    </div>
  );
};

export default Landing;
