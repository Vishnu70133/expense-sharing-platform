import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "../components/ui/LoadingScreen";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
};

export default PublicRoute;
