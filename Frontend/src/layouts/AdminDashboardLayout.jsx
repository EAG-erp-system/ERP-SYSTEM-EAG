import { Outlet } from "react-router-dom";
import DashboardSideBar from "../Pages/DashboardSideBar";

import { useDispatch, useSelector } from "react-redux";

function AdminDashboardLayout() {

    const user = useSelector((state) => state.auth.user);
    

    return (
        <>
        <div className="">
            <div className="flex">
                <DashboardSideBar variant="main" />
                <main className="flex-1 min-h-screen w-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
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