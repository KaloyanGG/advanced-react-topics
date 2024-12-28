import { Link } from "react-router-dom";
import FormInput from "../formInput/FormInput";

const Authentication = ({ type }: { type: "login" | "register" }) => {
  return (
    <form>
      <FormInput type='text' label='Email' id='email' name='email' />
      <FormInput
        type='password'
        label='Password'
        id='password'
        name='password'
      />
      {type === "login" ? (
        <div className='form-row'>
          <p>
            Don't have an account? <Link to={"/register"}>Register here</Link>
          </p>
        </div>
      ) : (
        <>
          <FormInput
            type='password'
            label='Repeat password'
            id='repeatPassword'
            name='repeatPassword'
          />
          <div className='form-row'>
            <p>
              Already have an account? <Link to={"/login"}>Log in here</Link>
            </p>
          </div>
        </>
      )}

      <div className='buttons-container'>
        <button
          className='submit'
          // disabled={!state.submitEnabled}
          type='submit'
        >
          Submit
        </button>
        <button type='reset' className='reset'>
          X
        </button>
      </div>
    </form>
  );
};
export default Authentication;
