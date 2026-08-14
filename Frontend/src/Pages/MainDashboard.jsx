
import { useOutletContext } from "react-router-dom"
import { Sparkles } from "lucide-react"

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
                <div className="">
                    <h2 className="roboto-medium text-blue-900">Welcom back, {user?.full_name || "Admin"}</h2>
                    <h1 className="roboto-bold text-3xl">Operational overview</h1>
                    <p className="text-slate-500 roboto-light">Your payroll and people Operational at a glance</p>
                </div>
            </div>
        </main>
    )
}

export default MainDashboard