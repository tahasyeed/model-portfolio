import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/auth";

export default function ProtectedRoute({ children }) {
  if (!auth.currentUser) return <Navigate to="/admin" replace />;
  return children;
}
