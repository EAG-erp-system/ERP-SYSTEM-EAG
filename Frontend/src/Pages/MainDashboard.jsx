
import { useOutletContext } from "react-router-dom"
import { Sparkles, Users } from "lucide-react"

function MainDashboard() {
    const { user } = useOutletContext();

    return(
        <main>
            <header className="flex items-center w-full bg-white p-5 pl-20 md:pl-10">
                <div>
                    <h3 className="roboto-semibold text-lg">Employee & Payroll Managment</h3>
                    <p className="roboto-light text-slate-400 text-xs">Ethiopian Assemblies of God Church</p>
                </div>
            </header>

            <div className="m-10">
                <div className="space-y-10">
                    <div className="">
                        <h2 className="roboto-medium text-blue-900">Welcom back, {user?.full_name || "Admin"}</h2>
                        <h1 className="roboto-bold text-3xl">Operational overview</h1>
                        <p className="text-slate-500 roboto-light">Your payroll and people Operational at a glance</p>
                    </div>

                    <div className="grid grid-cols-4 gap-5">
                        <div className="p-5 w-full rounded-md flex flex-col bg-white">
                            <div className="flex justify-between">
                                <p className="roboto-medium text-slate-400">Total Employee</p>
                                <span className="p-2 rounded-lg flex justify-center items-center bg-blue-100 text-blue-900">
                                    <Users />
                                </span>
                            </div>
                            <h1 className="roboto-bold text-2xl">9</h1>
                        </div>

                        <div className="p-5 w-full rounded-md flex flex-col bg-white">
                            <div className="flex justify-between">
                                <p className="roboto-medium text-slate-400">Total Employee</p>
                                <span className="p-2 rounded-lg flex justify-center items-center bg-blue-100 text-blue-900">
                                    <Users />
                                </span>
                            </div>
                            <h1 className="roboto-bold text-2xl">9</h1>
                        </div>

                        <div className="p-5 w-full rounded-md flex flex-col bg-white">
                            <div className="flex justify-between">
                                <p className="roboto-medium text-slate-400">Total Employee</p>
                                <span className="p-2 rounded-lg flex justify-center items-center bg-blue-100 text-blue-900">
                                    <Users />
                                </span>
                            </div>
                            <h1 className="roboto-bold text-2xl">9</h1>
                        </div>

                        <div className="p-5 w-full rounded-md flex flex-col bg-white">
                            <div className="flex justify-between">
                                <p className="roboto-medium text-slate-400">Total Employee</p>
                                <span className="p-2 rounded-lg flex justify-center items-center bg-blue-100 text-blue-900">
                                    <Users />
                                </span>
                            </div>
                            <h1 className="roboto-bold text-2xl">9</h1>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MainDashboard