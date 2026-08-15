import { Outlet } from "react-router-dom";
import DashboardSideBar from "../Pages/DashboardSideBar";

import { useSelector } from "react-redux";

function AdminDashboardLayout() {

    const user = useSelector((state) => state.auth.user);
    

    return (
        <>
        <div className="min-h-dvh bg-slate-50 dark:bg-slate-900">
            <div className="flex min-h-dvh">
                <DashboardSideBar variant="main" />
                <main className="min-h-dvh w-full flex-1 bg-slate-50 text-slate-900 transition-colors dark:bg-slate-900 dark:text-slate-100">
                    {/* <div className="m-10"> */}
                        <Outlet context={{ user }}/>
                    {/* </div> */}
                </main>
            </div>
        </div>
        </>
    );
}

export default AdminDashboardLayout;
