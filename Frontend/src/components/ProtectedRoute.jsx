import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ allowedRoles }) {
    const { token, user } = useSelector((s) => s.auth);
    const location = useLocation();

    if (!token) return <Navigate to="/login" replace state={{ from: location.pathname }} />
    if (allowedRoles?.length && (!user?.role || !allowedRoles.includes(user.role))) return <Navigate to="/dashboard" replace />

    return <Outlet />;
}