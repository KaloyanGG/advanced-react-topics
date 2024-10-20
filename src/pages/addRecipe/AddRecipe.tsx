import { useNavigate } from "react-router-dom";
import "./AddRecipe.css";
import { axiosInstance } from "../../config";
import { useEffect, useReducer, useState } from "react";
import { initialState, recipeReducer } from "../../reducers/recipeReducer";
import toast from "react-hot-toast";

const AddRecipe = () => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get<string[]>("/ingredients")
      .then(({ data }) => {
        setIngredients(data);
      })
      .catch((error) => {
        dispatch({
          type: "set_ingredients_error",
          errorMessage: error.message,
        });
      });
  }, []);

  const onBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const currentInput = e.target as HTMLInputElement | HTMLTextAreaElement;
    const label = currentInput.nextSibling as HTMLLabelElement;
    if (!currentInput.value) label.classList.remove("focused");
  };

  const onFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const label = e.target.nextSibling as HTMLLabelElement;
    label.classList.add("focused");
  };

  const resetForm = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      const label = input.nextSibling as HTMLLabelElement;
      if (label) {
        label.classList.remove("focused");
      }
    });
    toast.success("Form reset");
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const form = event.currentTarget;
      const ingredients = Array.from(form.elements)
        .filter(
          (element) =>
            element instanceof HTMLInputElement &&
            element.name === "ingredients[]" &&
            element.checked
        )
        .map((element) => (element as HTMLInputElement).value);
      if (ingredients.length === 0) {
        dispatch({
          type: "set_error",
          errorMessage: "Please choose at least 1 ingredient",
        });
        return;
      }

      await axiosInstance.post("/recipes", event.currentTarget, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred.";
      dispatch({ type: "set_error", errorMessage: errorMessage });
      // TODO fix solo ingredient on line height
    }
  };

  return (
    <>
      <div className='add-recipe-container'>
        <h1>Add recipe</h1>
        <form onSubmit={onSubmit} onReset={resetForm}>
          {state.error && (
            <div className='form-row'>
              <p className='error'>{state.error}</p>
            </div>
          )}
          <div className='form-row'>
            <input
              required
              type='text'
              name='name'
              id='name'
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={(e) => {
                dispatch({ type: "changed_name", name: e.target.value });
              }}
            />
            <label htmlFor='name'>Name</label>
          </div>
          <div className='form-row'>
            <input
              required
              type='text'
              name='image'
              id='image'
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={(e) => {
                dispatch({ type: "changed_image", image: e.target.value });
              }}
            />
            <label htmlFor='image'>Image URL</label>
          </div>
          <div className='form-row'>
            <textarea
              required
              onFocus={onFocus}
              onBlur={onBlur}
              name='instructions'
              id='instructions'
              onChange={(e) => {
                dispatch({
                  type: "changed_instructions",
                  instructions: e.target.value,
                });
              }}
            />
            <label htmlFor='instructions'>Instructions</label>
          </div>
          <div className='ingredients-container'>
            {!state.ingredientsError ? (
              ingredients.map((i, idx) => {
                return (
                  <>
                    <label htmlFor={i}>{i}</label>
                    <input type='checkbox' name='ingredients[]' value={i} />
                  </>
                );
              })
            ) : (
              <p className='error'>Failed fetching the ingredients</p>
            )}
          </div>
          <div className='buttons-container'>
            <button className='submit' type='submit'>
              Submit
            </button>
            <button type='reset' className='reset'>
              X
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default AddRecipe;
