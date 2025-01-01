import { PropsWithChildren } from "react";
import { useAppSelector } from "../../hooks";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { currentUser } = useAppSelector((state) => state.auth);
  if (!currentUser) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
};
export default ProtectedRoute;
