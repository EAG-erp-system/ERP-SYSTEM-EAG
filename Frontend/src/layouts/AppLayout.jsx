import { Outlet } from "react-router-dom";
import DashboardSideBar from "../Pages/DashboardSideBar";


function AdminDashboardLayout() {
    // const dispatch = useDispatch();
    

    // useEffect(() => {
    //     dispatch(getMe());
    // }, [dispatch]);

    return (
        <>
        <div className="">
            {/* <Navbar/> */}
            <div className="flex">
                <DashboardSideBar variant="main" />
                <main className="flex-1 min-h-screen w-full bg-slate-50 text-slate-900">
                    <Outlet />
                </main>
            </div>
        </div>
        </>
    );
}

export default AdminDashboardLayout;