/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const Protected = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default Protected;
