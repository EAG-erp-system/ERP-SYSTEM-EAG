
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
            className={`relative flex h-screen flex-col overflow-hidden rounded-none border-r border-slate-200 bg-white dark:bg-slate-800/80 dark:border-white/10 text-ink-900 dark:text-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.05) dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out ${
                isOpen ? "w-72" : "w-24"
            }  transition-all duration-300 ease-out`}>
                snfksnf
        </aside>
        </>
    )
}

export default SidebarContent;