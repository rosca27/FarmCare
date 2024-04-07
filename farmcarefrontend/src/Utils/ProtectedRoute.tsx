import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const PrivateRoutes = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/auth/login" />;
  }
  return <Outlet />;
};

export default PrivateRoutes;
