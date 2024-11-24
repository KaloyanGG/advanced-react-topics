interface State {
  name: string;
  image: string;
  instructions: string;
  ingredients: string[];
  ingredientsError: string;
  isImageLoading: boolean;
  error: {
    generalError: string | null;
    name: string | null;
    image: string | null;
    instructions: string | null;
    ingredients: string | null;
  };
  submitEnabled: boolean;
}

interface ChangedNameAction {
  type: "changed_name";
  name: string;
}
interface ResetAction {
  type: "form_reset";
}
interface SetErrorAction {
  type: "set_error";
  payload: {
    [K in keyof typeof Payload]?: string | null;
  };
}
export enum Payload {
  ingredients = "ingredients",
  instructions = "instructions",
  name = "name",
  image = "image",
  generalError = "generalError",
}
const a: SetErrorAction = {
  type: "set_error",
  payload: {
    ingredients: null,
  },
};
interface ChangedImageAction {
  type: "changed_image";
  image: string;
}
interface ChangedIngredientsAction {
  type: "changed_ingredients";
  ingredient: {
    id: string;
    checked: boolean;
  };
}
interface ChangedInstructionsAction {
  type: "changed_instructions";
  instructions: string;
}
interface IngredientsErrorAction {
  type: "set_ingredients_error";
  errorMessage: string;
}
interface EnableSubmitAction {
  type: "enable_submit";
  disable?: boolean;
}
interface SetImageLoadingAction {
  type: "set_image_loading";
  loading: boolean;
}

export const initialState: State = {
  name: "",
  image: "",
  instructions: "",
  ingredients: [],
  ingredientsError: "",
  isImageLoading: false,
  error: {
    generalError: null,
    name: null,
    image: null,
    instructions: null,
    ingredients: null,
  },
  submitEnabled: false,
};

type Action =
  | ChangedNameAction
  | ResetAction
  | SetErrorAction
  | ChangedImageAction
  | ChangedInstructionsAction
  | IngredientsErrorAction
  | ChangedIngredientsAction
  | EnableSubmitAction
  | SetImageLoadingAction;

export const recipeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "changed_name":
      const nameRegex = /^[A-Za-z]*$/;
      if (nameRegex.test(action.name)) {
        return {
          ...state,
          name: action.name,
          error: { ...state.error, name: null },
        };
      } else {
        let res = {
          ...state,
          name: action.name,
          error: { ...state.error, name: "Name must contain only letters." },
        };
        return res;
      }
    case "changed_image":
      return { ...state, image: action.image };
    case "changed_instructions":
      return { ...state, instructions: action.instructions };
    case "changed_ingredients":
      let ingredients = state.ingredients;
      let ingredient = action.ingredient;
      let newIngredients: string[] = [];
      if (ingredient.checked === false && ingredients.includes(ingredient.id)) {
        newIngredients = ingredients.filter((i) => i !== ingredient.id);
      } else if (
        ingredient.checked === true &&
        !ingredients.includes(ingredient.id)
      ) {
        newIngredients = [...ingredients, ingredient.id];
      }
      return { ...state, ingredients: newIngredients };
    case "form_reset":
      return initialState;
    case "set_error":
      const payload = action.payload;
      const updatedError = { ...state.error };
      Object.entries(payload).forEach(([key, value]) => {
        updatedError[key as keyof State["error"]] = value;
      });
      return { ...state, error: updatedError };
    case "set_ingredients_error":
      return { ...state, ingredientsError: action.errorMessage };
    case "set_image_loading":
      return { ...state, isImageLoading: action.loading };
    case "enable_submit":
      if (action.disable) {
        return { ...state, submitEnabled: false };
      }
      let willSubmitBeEnabled =
        !!state.name &&
        !!state.image &&
        state.ingredients.length > 0 &&
        !!state.instructions &&
        Object.values(state.error).every((v) => v === null);
      return { ...state, submitEnabled: willSubmitBeEnabled };
    default:
      return state;
  }
};
