import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ rolesAllowed }) => {
  // Extraction du currentUser depuis Redux
  const { currentUser } = useSelector((state) => state.user);

  // Si aucun utilisateur n'est connecté, rediriger vers /login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Vérification du rôle
  const role = currentUser.role;
  if (rolesAllowed && !rolesAllowed.includes(role)) {
    console.warn("Access refused for user with role", role);
    return <Navigate to="/" replace />;
  }

  // Si tout est OK, rendre les routes enfants
  return <Outlet />;
};

export default PrivateRoute;
