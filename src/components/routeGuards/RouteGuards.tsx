import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { notify } from "../notifications/Notifications";

// Public Route: Accessible only if the user is logged out
const PublicRoute = ({ children }: PropsWithChildren) => {
  const currentUser = localStorage.getItem("user");
  //? Is it possible to not reset anything at all?
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
