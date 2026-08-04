import MainLogo from "../assets/MainLogo.png";
import SidebarSection from "../components/SidebarSection";
import SidebarItem from "../components/SidebarItem";

import { menueSections, footerItems } from "../data/SideBarData"
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

function SidebarContent({
    isMobileOpen,
    mobile,
    onCollapseToggle,
    isOpen,
    setIsMobileOpen,
    onItemClick,
    activeItem,
    onMobileClose,
}) {
    const fullName = "Admin";
    const initials =
        fullName
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((name) => name[0].toUpperCase())
            .join("") || "AD";

    return (
        <aside
            className={`relative flex h-full flex-col overflow-hidden border-r border-slate-200 bg-white dark:bg-slate-800/80 dark:border-white/10 text-slate-900 dark:text-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out ${
                isOpen ? "w-72" : "w-24"
            }`}
        >
            <div className="relative z-10 flex h-full flex-col p-4">
                <div
                    className={`mb-6 flex items-center ${
                        isOpen ? "justify-between" : "justify-center"
                    } gap-3`}
                >
                    <div
                        className={`flex min-w-0 items-center gap-3 ${
                            isOpen ? "" : "justify-center"
                        }`}
                    >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-700 shadow">
                            <img
                                src={MainLogo}
                                alt="StepWise logo"
                                className="h-8 w-8 object-contain"
                            />
                        </div>

                        <div
                            className={`min-w-0 overflow-hidden transition-all duration-300 ${
                                isOpen
                                    ? "max-w-[180px] opacity-100"
                                    : "max-w-0 opacity-0"
                            }`}
                        >
                            <p className="roboto-light text-[11px] uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                                Workspace
                            </p>
                            <h1 className="roboto-bold truncate text-lg text-slate-800 dark:text-slate-200">
                                StepWise Admin
                            </h1>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={mobile ? onMobileClose : onCollapseToggle}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 transition hover:bg-slate-200 dark:hover:bg-slate-600 hover:text-slate-900 dark:hover:text-slate-100"
                    >
                        {mobile ? (
                            <X size={18} />
                        ) : isOpen ? (
                            <ChevronLeft size={18} />
                        ) : (
                            <ChevronRight size={18} />
                        )}
                    </button>
                </div>

                <div className="mb-6 h-px bg-slate-200 dark:bg-slate-700" />

                <div className="flex-1 space-y-6 overflow-y-auto pr-1">
                    {menueSections.map((section) => (
                        <SidebarSection
                            key={section.title}
                            title={section.title}
                            items={section.items}
                            isOpen={isOpen}
                            activeItem={activeItem}
                            onItemClick={onItemClick}
                    />

                    ))}
                </div>

                <div className="mt-4 h-px bg-slate-200 dark:bg-slate-700" />

                <div className="mt-4 space-y-2">
                    {footerItems.map((item) => (
                        <SidebarItem
                            key={item.id}
                            item={item}
                            isActive={activeItem === item.id}
                            isOpen={isOpen}
                            onItemClick={onItemClick}
                    />
                    ))}
                </div>

                <div
                    className={`mt-4 flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-700/50 p-3 shadow-inner ${
                        isOpen ? "justify-start px-3" : "justify-center px-2"
                    }`}
                >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 dark:bg-slate-200 text-sm font-semibold text-white dark:text-slate-900 shadow">
                        {initials}
                    </div>

                    {isOpen && (
                        <div className="min-w-0 flex-1 overflow-hidden transition-all duration-300">
                            <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                                {fullName}
                            </p>
                            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                                Administrator
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}

export default SidebarContent;