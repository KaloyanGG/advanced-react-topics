import { useNavigate } from "react-router-dom";
import "./AddRecipe.css";
import { axiosInstance } from "../../config";
import { Fragment, useCallback, useEffect, useReducer, useState } from "react";
import { initialState, recipeReducer } from "../../reducers/recipeReducer";
import toast from "react-hot-toast";
import { validateImageURL } from "../../utils/imageValidator";
import { debounce } from "../../utils/debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchIngredients } from "../../services/ingredientsService";

const AddRecipe = () => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);
  const {
    data: ingredients = [],
    isError,
    error,
  } = useQuery({
    queryKey: ["ingredients"],
    queryFn: fetchIngredients,
    staleTime: Infinity,
    gcTime: 24 * 60 * 60 * 1000,
  });

  const [submitEnabled, setSubmitEnabled] = useState<boolean>(true);
  const [imageURLValue, setImageURLValue] = useState<string>("");
  const [imageLoadingState, setImageLoadingState] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isError && error instanceof Error) {
      dispatch({
        type: "set_ingredients_error",
        errorMessage: error.message,
      });
    }
  }, [isError, error]);

  const onBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const currentInput = e.currentTarget;
    const label = currentInput.nextSibling as HTMLLabelElement;
    if (!currentInput.value) label.classList.remove("focused");
    if (currentInput.name === "image" && currentInput.value !== "") {
      setSubmitEnabled(false);
    }
  };

  const validateAndMakeChanges = (urlValue: string) => {
    dispatch({ type: "changed_image", image: urlValue });

    validateImageURL(urlValue).then((isValid) => {
      setImageURLValue(urlValue);
      if (isValid) {
        setSubmitEnabled(true);
      } else {
        dispatch({
          type: "set_error",
          errorMessage: "Invalid image URL",
        });
        setImageURLValue("");
      }
      setImageLoadingState(false);
    });
  };

  const debouncedValidateAndMakeChanges = useCallback(
    debounce((urlValue) => validateAndMakeChanges(urlValue), 500),
    []
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageLoadingState(true);
    debouncedValidateAndMakeChanges(e.currentTarget.value);
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
    dispatch({ type: "set_error", errorMessage: "" });
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
    }
  };

  return (
    <form onSubmit={onSubmit} onReset={resetForm}>
      {state.error && <p className='error'>{state.error}</p>}
      <div className='form-row'>
        <input
          autoFocus
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
          className='image-input'
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
        />
        <label htmlFor='image'>Image URL</label>
        <div className='image-loader-container'>
          {imageLoadingState ? (
            <span className='loader'></span>
          ) : (
            <img src={imageURLValue} />
          )}
        </div>
      </div>
      <div className='form-row instructions'>
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
              <Fragment key={idx}>
                <label htmlFor={i.name}>{i.name}</label>
                <input type='checkbox' name='ingredients[]' value={i.name} />
              </Fragment>
            );
          })
        ) : (
          <p className='error'>Failed fetching the ingredients</p>
        )}
      </div>
      <div className='buttons-container'>
        <button className='submit' disabled={!submitEnabled} type='submit'>
          Submit
        </button>
        <button type='reset' className='reset'>
          X
        </button>
      </div>
    </form>
  );
};
export default AddRecipe;
