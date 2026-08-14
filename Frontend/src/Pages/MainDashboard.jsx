
import { useOutletContext } from "react-router-dom"
import { Sparkles } from "lucide-react"

function MainDashboard() {
    const { user } = useOutletContext();

    return(
        <div>
            <main className="flex items-center w-full bg-white p-5 pl-20 md:pl-10">
                <div>
                    <h3 className="roboto-semibold text-lg">Employee & Payroll Managment</h3>
                    <p className="roboto-light text-slate-400 text-xs">Ethiopian Assemblies of God Church</p>
                </div>
            </main>
        </div>
    )
}

export default MainDashboard