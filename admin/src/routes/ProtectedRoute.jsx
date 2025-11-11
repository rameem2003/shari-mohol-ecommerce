import { Navigate, useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { user, loading, msg } = useAuth();
  console.log(user);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (user?.role !== "admin" || !user) {
      navigate("/login", { replace: true });
      return;
    }
  }, [user]);

  if (loading) {
    return <h1>Loading......</h1>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
