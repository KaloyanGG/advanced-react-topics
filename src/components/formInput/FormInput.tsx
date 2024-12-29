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
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
  onFocus?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
}

const FormInput = ({
  onFocus,
  onBlur,
  label,
  children,
  textarea,
  size,
  ...inputProps
}: PropsWithChildren<FormInputProps>) => {
  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const label = e.target.nextElementSibling as HTMLLabelElement;
    label.classList.add("focused");

    if (onFocus) {
      onFocus(e);
    }
  };
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const currentInput = e.currentTarget;
    const label = currentInput.nextElementSibling as HTMLLabelElement;
    if (!currentInput.value.trim()) {
      label.classList.remove("focused");
    }

    if (onBlur) {
      onBlur(e);
    }
  };
  return (
    <div className='form-row' style={{ height: size ? size : undefined }}>
      {textarea ? (
        <textarea onFocus={handleFocus} onBlur={handleBlur} {...inputProps} />
      ) : (
        <input onFocus={handleFocus} onBlur={handleBlur} {...inputProps} />
      )}
      <label htmlFor={inputProps.id || inputProps.name}>{label}</label>
      {children}
    </div>
  );
};
export default FormInput;
