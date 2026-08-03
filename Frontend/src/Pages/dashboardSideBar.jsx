
import { useTheme } from "../context/ThemeContext.jsx";
import { Sun, Moon } from "lucide-react";

function DashboardSideBar() {
    const { theme, toggleTheme } = useTheme();
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
            </div>
        </>
    )
}

export default DashboardSideBar;