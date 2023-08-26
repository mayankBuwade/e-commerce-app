import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const Redirect = () => {
  const user = useSelector((state) => {
    return state.token;
  });

  if (user) {
    return <Navigate to="/admin" replace={true} />;
  }
  return <Navigate to="/login" replace={true} />;
};
