import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { CalendarDays, CircleDollarSign, Users, WalletCards } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../components/PageHeader";
import { fetchMonthlySummary } from "../features/attendance/attendanceThunks";

const now = new Date();

export default function MainDashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const monthly = useSelector((state) => state.attendance.monthly);
  const isManager = ["ADMIN", "HR"].includes(String(user?.role).toUpperCase());

  useEffect(() => {
    if (isManager) dispatch(fetchMonthlySummary({ month: now.getMonth() + 1, year: now.getFullYear() }));
  }, [dispatch, isManager]);

  if (!isManager) return <Navigate to="/dashboard/personal" replace />;

  const unpaidDays = monthly.reduce((total, employee) => total + Number(employee.unpaid_leave_count || 0), 0);
  const cards = [
    [Users, "Active employees", monthly.length, "text-indigo-600 bg-indigo-50"],
    [CalendarDays, "Unpaid leave days", unpaidDays, "text-rose-600 bg-rose-50"],
    [WalletCards, "Payroll workflow", "Ready to generate", "text-emerald-600 bg-emerald-50"],
    [CircleDollarSign, "Current period", now.toLocaleString("en", { month: "long", year: "numeric" }), "text-amber-600 bg-amber-50"],
  ];

  return <><PageHeader title="Operational overview" subtitle={`Welcome back, ${user?.full_name || "Administrator"}.`} /><section className="p-4 sm:p-6"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([Icon, label, value, color]) => <div className="card" key={label}><span className={`mb-4 inline-flex rounded-xl p-3 ${color}`}><Icon size={22} /></span><p className="text-sm text-slate-500">{label}</p><strong className="mt-1 block text-xl">{value}</strong></div>)}</div><div className="mt-6 grid gap-4 md:grid-cols-3">{[["Open attendance register", "Record attendance for every employee.", "/attendance"], ["Generate monthly payroll", "Calculate a new payroll batch.", "/payroll"], ["Manage employees", "Register employees and manage salaries.", "/employees"]].map(([title, description, to]) => <Link to={to} key={to} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"><h2 className="font-semibold">{title}</h2><p className="mt-2 text-sm text-slate-500">{description}</p><span className="mt-4 inline-block text-sm font-semibold text-indigo-600">Open →</span></Link>)}</div></section></>;
}
