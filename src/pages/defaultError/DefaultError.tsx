import { useRouteError } from "react-router-dom";

const DefaultError = () => {
  const error = useRouteError() as any;
  return <div>{error.message}</div>;
};
export default DefaultError;
