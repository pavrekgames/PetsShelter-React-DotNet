import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../App/hooks";

type Props = { children: React.ReactNode };

const AdminRoute = ({ children }: Props) => {
  const location = useLocation();
  const isLoggedIn = useAppSelector((state) => state.isLoggedIn.value);
  const userRole = useAppSelector((state) => state.user.role);

  return (
    <>
      {!isLoggedIn ? (
        <Navigate to="/login" state={{ from: location }} replace />
      ) : (
        <>
          {userRole !== "Admin" ? (
            <Navigate to="/" state={{ from: location }} replace />
          ) : (
            children
          )}
        </>
      )}
    </>
  );
};

export default AdminRoute;
