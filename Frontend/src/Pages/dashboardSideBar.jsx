
import { useTheme } from "../context/ThemeContext.jsx";
import { Sun, Moon } from "lucide-react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Menu  } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import SidebarContent from "../components/SidebarContent.jsx";

const itemRoutes = {}

function DashboardSideBar() {
    const { theme, toggleTheme } = useTheme();

    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const activeItem = Object.entries(itemRoutes).find(([, path]) => path === location.pathname)?.[0] ?? "";

    const handleItemClick = (itemId) => {
        const route = itemRoutes[itemId];
        if (route) {
            navigate(route);
        }
        setIsMobileOpen(false);
    }
    return (
        <>
            <div className="min-h-screen bg-[#f4f7fa] dark:bg-[#060b14] text-ink-900 dark:text-slate-100 transition-colors duration-300">
                <button
                    onClick={toggleTheme}
                    type="button"
                    className="fixed top-4 right-4 p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-black/10 dark:border-white/10 backdrop-blur-md text-ink-800 dark:text-slate-200 hover:opacity-80 active:scale-95 transition-all shadow-sm"
                    aria-label="Toggle theme"
                >
                    {theme === "dark" ? (
                        <Sun size={18} className="text-amber-400" />
                    ) : (
                        <Moon size={18} className="text-brand-500" />
                    )}
                </button>

                <button 
                    type="button"
                    onClick={() => setIsMobileOpen(true)}
                    className="fixed left-4 top-4 cursor-pointer w-10 h-10 flex items-center justify-center rounded-xl border dark:border-white/10 border-slate-200 bg-white dark:bg-slate-800/80 text-ink-700 dark:text-slate-300 outline-none shadow-lg md:hidden"
                >
                    <Menu size={18} />
                </button>

                <div className="hidden md:block h-screen">
                    <SidebarContent 
                        isOpen={isOpen} 
                        activeItem={activeItem}
                        onItemClick={handleItemClick}
                        onCollapseToggle={() => setIsOpen((prev) => !prev)}
                    />
                </div>

                <div className={`fixed inset-0 z-50 md:hidden ${
                    isMobileOpen ? "pointer-events-auto backdrop-blur-sm" : "pointer-events-none"
                    }`}>

                    <div className={`h-full max-w-[86vw] transition-transform duration-300 ease-out ${
                        isMobileOpen ? "translate-x-0" : "-translate-x-full"
                        }`}>
                        <SidebarContent 
                            isOpen
                            activeItem={activeItem}
                            onItemClick={handleItemClick}
                            isMobileOpen={isMobileOpen}
                            onMobileClose={() => setIsMobileOpen(false)}
                            mobile
                            setIsMobileOpen={setIsMobileOpen}
                            />
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsMobileOpen(false)}
                        className="absolute inset-0 -z-10"
                    />
                </div>
            </div>
        </>
    )
}

export default DashboardSideBar;