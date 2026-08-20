
import { LayoutDashboard, Users, BarChart3, Settings, LogOut, FileCheck } from "lucide-react";

export const menueSections = [
    {
        title: "MAIN",
        items: [
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "employees", label: "Employees", icon: Users },
            { id: "attendance", label: "Attendance", icon: BarChart3 },
            { id: "payroll", label: "Payroll", icon: Settings },
            { id: "approved-payrolls", label: "Approved Payrolls", icon: FileCheck },
            { id: "personal", label: "My dashboard", icon: LayoutDashboard },
            { id: "payslip", label: "My payslip", icon: BarChart3 },
        ],
    },
];

export const footerItems = [
    { id: "logout", label: "Logout", icon: LogOut, danger: true },
];
