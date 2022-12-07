import { useAuth } from "../Contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ redirectPath = "/login", children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) return <Navigate to={redirectPath} replace={true} />;

  return <Outlet />;
};

export default ProtectedRoute;
