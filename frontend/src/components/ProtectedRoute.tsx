import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../auth/auth";

export default function ProtectedRoute({ children }: any) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
}