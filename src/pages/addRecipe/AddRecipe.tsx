import "./AddRecipe.css";

const AddRecipe = () => {
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
  return (
    <>
      <div className='add-recipe-container'>
        <h1>Add recipe</h1>
        <form>
          <div className='form-row'>
            <input
              type='text'
              name='name'
              id='name'
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <label htmlFor='name'>Name</label>
          </div>
          <div className='form-row'>
            <textarea
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
