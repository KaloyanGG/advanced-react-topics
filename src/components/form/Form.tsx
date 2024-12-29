import { FormHTMLAttributes, PropsWithChildren } from "react";
import "./Form.css";
const Form = ({
  children,
  ...formAttributes
}: PropsWithChildren<FormHTMLAttributes<HTMLFormElement>>) => {
  return <form {...formAttributes}>{children}</form>;
};
export default Form;
