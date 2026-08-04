
import { LayoutDashboard, Users, BarChart3, Settings, LogOut } from "lucide-react";

export const menueSections = [
    {
        title: "MAIN",
        items: [
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "employers", label: "Employers ", icon: Users },
            { id: "analytics", label: "Analytics", icon: BarChart3 }    
        ]
    }
],

export const footerItems = [
    { id: "settings", label: "Settings", icon: Settings },
    { id: "logout", label: "Logout", icon: LogOut, danger: true },
]