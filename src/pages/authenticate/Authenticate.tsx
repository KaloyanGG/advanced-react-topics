import { Link, Navigate, useNavigate } from "react-router-dom";
import FormInput from "../../components/formInput/FormInput";
import Form from "../../components/form/Form";
import { axiosInstance } from "../../config/config";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { login } from "../../features/auth/authSlice";
import { notify } from "../../components/notifications/Notifications";
import { useEffect, useState } from "react";
import { saveToLocalStorage } from "../../utils/localStorage";
type AuthenticateProps = {
  type: "login" | "register";
};
const Authenticate = ({ type }: AuthenticateProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  useEffect(() => {
    setError("");
  }, [type]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = {
      email: form.email.value,
      password: form.password.value,
    };
    try {
      if (type === "register") {
        if (formData.password !== form.repeatPassword.value) {
          setError("Passwords do not match");
          return;
        }
        try {
          await axiosInstance.post(`/auth/${type}`, formData);
          notify("Registration successful");
          navigate("/login");
        } catch (err: any) {
          setError(err.response.data.message || err.message);
        }
      } else {
        dispatch(login(formData)).then((result) => {
          if (result.type === "auth/login/fulfilled") {
            saveToLocalStorage("user", result.payload);
            notify("Login successful");
            navigate("/");
          } else if (result.type === "auth/login/rejected") {
            setError(result.payload as any);
          }
        });
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      {error && <p className='error'>{error}</p>}
      <FormInput required type='text' label='Email' id='email' name='email' />
      <FormInput
        required
        type='password'
        autoComplete='password'
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
            required
            type='password'
            label='Repeat password'
            autoComplete='password'
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
