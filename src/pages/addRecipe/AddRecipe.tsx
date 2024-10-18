import { useNavigate } from "react-router-dom";
import "./AddRecipe.css";
import { baseURL } from "../../config";
import axios from "axios";

const AddRecipe = () => {
  const navigate = useNavigate();
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
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(baseURL + "/recipes", event.currentTarget, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/");
    } catch (error) {
      //todo decide what to do with error handling
      console.log(error);
    }
  };
  return (
    <>
      <div className='add-recipe-container'>
        <h1>Add recipe</h1>
        <form onSubmit={onSubmit}>
          <div className='form-row'>
            <input
              required
              type='text'
              name='name'
              id='name'
              onFocus={onFocus}
              onBlur={onBlur}
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
            />
            <label htmlFor='instructions'>Instructions</label>
          </div>
          <div className='ingredients-container'>
            <label htmlFor='cheese'>Cheese</label>
            <input type='checkbox' name='ingredients[]' value='cheese' />
            <label htmlFor='tomato'>Tomato</label>
            <input type='checkbox' name='ingredients[]' value='tomato' />
            <label htmlFor='cucumber'>Cucumber</label>
            <input type='checkbox' name='ingredients[]' value='cucumber' />
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  );
};
export default AddRecipe;
