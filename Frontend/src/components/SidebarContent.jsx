
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

function SidebarContent( {isMobileOpen, setIsMobileOpen, theme, themeToggle} ) {

    const fullName = user?.full_name || "Admin";
    const initials = fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((name) => name[0].toUpperCase())
        .join("") || "AD";

    return (
        <>
            <div>

            </div>
        </>
    )
}

export default SidebarContent;