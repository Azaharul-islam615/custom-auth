import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthProvider } from "../context/AuthContext";
import { Spin } from "antd";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthProvider);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    const token = localStorage.getItem("accessToken");

    if (!token && !user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
