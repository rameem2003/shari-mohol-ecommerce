import { Navigate, useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import Loader from "../components/common/Loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading, msg } = useAuth();
  console.log(user);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/login", { replace: true });
      return;
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
