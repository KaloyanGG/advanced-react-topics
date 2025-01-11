import "./FormInput.css";
import { InputHTMLAttributes, PropsWithChildren } from "react";

interface FormInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
    "size"
  > {
  label?: string;
  textarea?: boolean;
  size?: string;
}

const FormInput = ({
  label,
  children,
  textarea,
  size,
  ...inputProps
}: PropsWithChildren<FormInputProps>) => {
  return (
    <div className='form-row' style={{ height: size ? size : undefined }}>
      {textarea ? (
        <textarea placeholder='' {...inputProps} />
      ) : (
        <input placeholder='' {...inputProps} />
      )}
      <label htmlFor={inputProps.id || inputProps.name}>{label}</label>
      {children}
    </div>
  );
};
export default FormInput;
