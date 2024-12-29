import { Link, NavLink } from "react-router-dom";
import FormInput from "../../components/formInput/FormInput";
import Form from "../../components/form/Form";

const Authenticate = ({ type }: { type: "login" | "register" }) => {
  return (
    <Form>
      <FormInput type='text' label='Email' id='email' name='email' />
      <FormInput
        type='password'
        label='Password'
        id='password'
        name='password'
      />
      {type === "login" ? (
        <div className='form-row h-unset'>
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
          <div className='form-row h-unset'>
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
    </Form>
  );
};
export default Authenticate;
