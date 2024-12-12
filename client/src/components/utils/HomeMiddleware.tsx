import { useAuth } from "@/hooks";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const HomeMiddleware = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  const { pathname } = useLocation();

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  if (pathname === "/") {
    return <Navigate to="/contact" />;
  }

  return <> {children} </>;
};

export default HomeMiddleware;
