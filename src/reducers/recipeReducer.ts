interface State {
  name: string;
  image: string;
  instructions: string;
  ingredients: [];
  error: string;
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
  errorMessage: string;
}
interface ChangedImageAction {
  type: "changed_image";
  image: string;
}
interface ChangedInstructionsAction {
  type: "changed_instructions";
  instructions: string;
}

const initialState: State = {
  name: "",
  image: "",
  instructions: "",
  ingredients: [],
  error: "",
};

type Action =
  | ChangedNameAction
  | ResetAction
  | SetErrorAction
  | ChangedImageAction
  | ChangedInstructionsAction;

export const recipeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "changed_name":
      const nameRegex = /^[A-Za-z]*$/;
      return nameRegex.test(action.name)
        ? { ...state, name: action.name, error: "" }
        : {
            ...state,
            error: "Name must contain only letters.",
          };
    case "changed_image":
      return { ...state, image: action.image, error: "" };
    case "changed_instructions":
      return { ...state, instructions: action.instructions, error: "" };
    case "form_reset":
      return initialState;
    case "set_error":
      return { ...state, error: action.errorMessage };
  }
};
