import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, checkFor, redirect }) => {
  if (!checkFor || checkFor.length < 1) {
    return <Navigate to={redirect} />;
  }
  return children;
};

export default ProtectedRoute;
