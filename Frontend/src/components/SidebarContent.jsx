
import MainLogo from "../assets/MainLogo.png"

import {
    BarChart3,
    BookOpen,
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    LogOut,
    Menu,
    Package,
    Settings,
    Users,
    Video,
    X,
} from "lucide-react";

function SidebarContent( {isMobileOpen, isOpen, setIsMobileOpen, theme, themeToggle} ) {

    const fullName = "Admin";
    const initials = fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((name) => name[0].toUpperCase())
        .join("") || "AD";

    return (
        <>
        <aside 
            className={`relative flex h-full flex-col overflow-hidden border-r border-slate-200 bg-white dark:bg-slate-800/80 dark:border-white/10 text-ink-900 dark:text-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.05) dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out ${
                isOpen ? "w-72" : "w-24"
            }  transition-all duration-300 ease-out`}>
                
                <div className="relative z-10 flex h-full flex-col p-4">
                    <div className={`mb-6 flex items-center ${isOpen ? "justify-between" : "justify-center"} gap-0`}>
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 dark:bg-slate-700 shadow">
                            <img src={MainLogo} alt="StepWise logo" className="h-8 w-8 object-contain" />
                        </div>

                        <div
                            className={`min-w-0 overflow-hidden transition-all duration-300 ${
                                isOpen ? "max-w-[180px] opacity-100" : "max-w-0 opacity-0"
                            }`}
                        >
                            <p className="roboto-light text-[11px] uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                                Workspace
                            </p>
                            <h1 className="roboto-bold truncate text-lgtext-slate-800 dark:text-gray-200">EAG Admin</h1>
                        </div>
                    </div>
                </div>
        </aside>
        </>
    )
}

export default SidebarContent;