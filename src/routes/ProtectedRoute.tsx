import type { JSX } from "@emotion/react/jsx-runtime";
import type React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps  {
    children: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const {isAuthenticated} = useAuth();
    return isAuthenticated ? children: <Navigate to="/login" replace />
}