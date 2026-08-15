import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "../features/auth/authThunks";

export default function ProtectedRoute({ allowedRoles }) {
    const dispatch = useDispatch();
    const { token, user, loading } = useSelector((s) => s.auth);
    const location = useLocation();

    useEffect(() => {
        if (token && !user?.role) dispatch(fetchMe());
    }, [dispatch, token, user?.role]);

    if (!token) return <Navigate to="/login" replace state={{ from: location.pathname }} />
    if (!user?.role || loading) return <div className="grid min-h-screen place-items-center bg-slate-50 text-sm font-medium text-slate-500">Loading your workspace…</div>;
    if (allowedRoles?.length && (!user?.role || !allowedRoles.includes(String(user.role).toUpperCase()))) return <Navigate to="/dashboard/personal" replace />

    return <Outlet />;
}
