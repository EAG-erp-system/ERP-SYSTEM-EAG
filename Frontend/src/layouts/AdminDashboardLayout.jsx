import { Outlet } from "react-router-dom";
import DashboardSideBar from "../Pages/DashboardSideBar";


function AdminDashboardLayout() {

    return (
        <>
        <div className="">
            <div className="flex">
                <DashboardSideBar variant="main" />
                <main className="flex-1 min-h-screen w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
                    <Outlet />
                </main>
            </div>
        </div>
        </>
    );
}

export default AdminDashboardLayout;