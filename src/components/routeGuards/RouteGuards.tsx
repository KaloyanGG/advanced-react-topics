import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { notify } from "../notifications/Notifications";
import { useAppSelector } from "../../hooks";

// Public Route: Accessible only if the user is logged out
const PublicRoute = ({ children }: PropsWithChildren) => {
  const currentUser = localStorage.getItem("user");
  if (currentUser) {
    setTimeout(() => {
      notify("You have to logout first");
    }, 0);
    return <Navigate to='/' replace />;
  }
  return children;
};

// Private Route: Accessible only if the user is logged in
const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { currentUser } = useAppSelector((state) => state.auth);
  return currentUser ? children : <Navigate to='/login' replace />;
};

export { PublicRoute, PrivateRoute };