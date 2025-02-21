import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/config";
import { ChangeEvent, Fragment, memo, useEffect, useReducer } from "react";
import { initialState, recipeReducer } from "../../reducers/recipeReducer";
import validateImageURL from "../../utils/imageValidator";
import { useQuery } from "@tanstack/react-query";
import {
  fetchIngredients,
  Ingredient,
} from "../../services/ingredientsService";
import {
  NotificationEnum,
  notify,
} from "../../components/notifications/Notifications";
import Form from "../../components/form/Form";
import FormInput from "../../components/formInput/FormInput";
import useDebounce from "../../hooks/useDebounce";
import IngredientsError from "../../components/errors/ingredientsError/IngredientsError";
import IngredientsLoader from "../../components/loaders/IngredientsLoader";

const AddRecipe = () => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);
  const {
    data: ingredients = [],
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["ingredients"],
    queryFn: fetchIngredients,
    staleTime: Infinity,
    gcTime: 24 * 60 * 60 * 1000,
    retry: 2,
  });
  const navigate = useNavigate();
  const debouncedImageURL = useDebounce(state.image, 500);

  useEffect(() => {
    if (debouncedImageURL) {
      validateImageURL(debouncedImageURL!).then((isValid) => {
        if (isValid) {
          dispatch({ type: "set_error", payload: { image: null } });
        } else {
          dispatch({
            type: "set_error",
            payload: { image: "Invalid image URL" },
          });
          dispatch({ type: "changed_image", image: undefined });
        }
        dispatch({ type: "enable_submit" });
        dispatch({ type: "set_image_loading", loading: false });
      });
    }
  }, [debouncedImageURL]);

  const onBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const currentInput = e.currentTarget;
    if (!currentInput.value) {
      dispatch({
        type: "set_error",
        payload: {
          [currentInput.name]: `${currentInput.name
            .charAt(0)
            .toUpperCase()}${currentInput.name.slice(1)} is required.`,
        },
      });
    }
  };

  const onImageURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.currentTarget.value;
    if (!url) {
      return;
    }
    dispatch({ type: "enable_submit", disable: true });
    dispatch({ type: "set_image_loading", loading: true });
    dispatch({ type: "changed_image", image: url });
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "changed_name", name: e.target.value });
    dispatch({ type: "enable_submit" });
  };

  const onInstructionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: "changed_instructions",
      instructions: e.target.value,
    });
    dispatch({ type: "set_error", payload: { instructions: null } });
    dispatch({ type: "enable_submit" });
  };

  const onIngredientsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "changed_ingredients",
      ingredient: {
        id: e.target.value,
        checked: e.target.checked,
      },
    });
    dispatch({ type: "enable_submit" });
  };

  const handleFormReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const inputs = form.querySelectorAll<
      HTMLInputElement | HTMLTextAreaElement
    >("input, textarea");
    inputs.forEach((input) => {
      if (input.type === "checkbox") {
        (input as HTMLInputElement).checked = false;
      } else {
        input.value = "";
      }
    });
    dispatch({ type: "changed_image", image: undefined });
    dispatch({ type: "form_reset" });
    notify("Form reset", NotificationEnum.INFO);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axiosInstance.post("/recipes", event.currentTarget, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      notify("Recipe added", NotificationEnum.SUCCESS);
      navigate("/");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred.";
      notify("Error adding the recipe", NotificationEnum.ERROR);
      dispatch({ type: "set_error", payload: { generalError: errorMessage } });
    }
  };
  const errorMessage = Object.values(state.error).find((err) => err !== null);
  return (
    <Form onSubmit={onSubmit} onReset={handleFormReset}>
      {errorMessage && <p className='error'>{errorMessage}</p>}
      <FormInput
        label='Name'
        autoFocus
        required
        type='text'
        name='name'
        id='name'
        onBlur={onBlur}
        onChange={onNameChange}
      />
      <FormInput
        required
        label='Image URL'
        type='text'
        name='image'
        id='image'
        className='image-input'
        onBlur={onBlur}
        onChange={onImageURLChange}
      >
        <div className='image-loader-container'>
          {state.isImageLoading ? (
            <div className='loader' />
          ) : (
            <img src={state.image || undefined} />
          )}
        </div>
      </FormInput>
      <FormInput
        required
        label='Instructions'
        id='instructions'
        name='instructions'
        onBlur={onBlur}
        onChange={onInstructionsChange}
        textarea
        size='unset'
      />
      <IngredientsContainer
        isFetching={isFetching}
        isError={isError}
        error={state.ingredientsError}
        ingredients={ingredients}
        onChange={onIngredientsChange}
      />
      <ButtonsContainer disabled={!state.submitEnabled} />
    </Form>
  );
};

const IngredientsContainer = memo(
  ({
    isFetching,
    isError,
    ingredients,
    onChange,
  }: {
    isFetching: boolean;
    isError: boolean;
    error: string;
    ingredients: Ingredient[];
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  }) => {
    return isFetching ? (
      <IngredientsLoader />
    ) : (
      <div className='ingredients-container'>
        {isError ? (
          <IngredientsError />
        ) : (
          ingredients.map((i, idx) => (
            <Fragment key={idx}>
              <label htmlFor={i.name}>{i.name}</label>
              <input
                onChange={onChange}
                id={i.name}
                type='checkbox'
                name='ingredients[]'
                value={i._id}
              />
            </Fragment>
          ))
        )}
      </div>
    );
  }
);

const ButtonsContainer = memo(({ disabled }: { disabled: boolean }) => {
  return (
    <div className='buttons-container'>
      <button className='submit' disabled={disabled} type='submit'>
        Submit
      </button>
      <button type='reset' className='reset'>
        X
      </button>
    </div>
  );
});
export default AddRecipe;
