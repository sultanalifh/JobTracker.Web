import type { ReactNode } from "react";
import { Navigate } from "react-router";

interface UnauthenticatedRouteProps {
  children: ReactNode;
}
export default function UnauthenticatedRoute({
  children,
}: UnauthenticatedRouteProps) {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}
