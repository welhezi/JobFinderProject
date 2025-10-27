import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ rolesAllowed, children }) => {
  // Extraction du currentUser depuis Redux
  const { currentUser } = useSelector((state) => state.user);

  // Si aucun utilisateur n'est connecté, rediriger vers /login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Vérification du rôle
  const role = currentUser.user.role;
  console.log("role in private route :",role)
  if (rolesAllowed && !rolesAllowed.includes(role)) {
    console.warn("Access refused for user with role", role);
    return <Navigate to="/" replace />;
  }

  // Si on passe children, on le rend, sinon on rend Outlet
  return children ? children : <Outlet />;
};

export default PrivateRoute;
