
import { Icon } from "lucide-react";

function SidebarItem( { item, isActive, isOpen, onItemClick } ) {
    const Icon = item.icon;

    return (
        <button 
            type="button"
            onClick={() => onItemClick(item.id)}
            className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-xl px-3 py-3 text-left transition-all duration-300 ${
                isActive
                    ? "border-cyan-200 bg-cyan-100 text-cyan-700 shadow-[0_0_20px_rgba(34,211,238,0.2)] dark:border-cyan-700 dark:bg-cyan-800 dark:text-cyan-200"
                    : item.danger
                    ? "border-transparent text-rose-500 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 dark:hover:border-rose-700 dark:hover:bg-rose-800 dark:hover:text-rose-400"
                    : "border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:border-white/10 dark:hover:bg-slate-700 dark:hover:text-slate-100"
            } ${isOpen ? "justify-start" : "justify-center"}`}
            aria-label={item.label}
        >
            {isActive && (
                <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-cyan-400" />
            )}

            <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                    isActive
                        ? "border-cyan-200 bg-cyan-100 text-cyan-600 dark:border-cyan-700 dark:bg-cyan-800 dark:text-cyan-200"
                        : item.danger
                          ? "border-slate-200 bg-slate-100 text-rose-500 dark:border-rose-700 dark:bg-rose-800 dark:text-rose-400"
                          : "border-slate-200 bg-slate-100 text-slate-600 dark:border-white/10 dark:bg-slate-700 dark:text-slate-100"
                }`}
            >
                <Icon size={18} />
            </span>

            <div
                className={`flex min-w-0 flex-1 items-center justify-between transition-all duration-300 ${
                    isOpen ? "translate-x-0 opacity-100" : "pointer-events-none w-0 translate-x-2 opacity-0"
                }`}
            >
                <span className="roboto-medium truncate text-[15px]">{item.label}</span>
                {item.badge && (
                    <span
                        className={`ml-3 rounded-full px-2 py-1 text-[11px] roboto-medium ${
                            isActive ? "bg-cyan-200 text-cyan-700" : "bg-slate-200 text-slate-600"
                        }`}
                    >
                        {item.badge}
                    </span>
                )}
            </div>

            {!isOpen && (
                <span className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg border border-slate-200 bg-white dark:bg-slate-700 dark:border-white/10 px-2 py-1 text-xs text-slate-700 dark:text-slate-300 opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100">
                    {item.label}
                </span>
            )}

        </button>
    )
}

export default SidebarItem