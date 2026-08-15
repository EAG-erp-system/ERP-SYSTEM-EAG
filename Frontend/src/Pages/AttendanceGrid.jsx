import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CalendarDays, Check, Users, WalletCards } from "lucide-react";
import PageHeader, { Empty } from "../components/PageHeader";
import { fetchDailyReport, fetchMonthlySummary, saveAttendance } from "../features/attendance/attendanceThunks";

const today = new Date();
const makeDate = (year, month, day) => `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
const statuses = [
  { value: "PRESENT", label: "P", labelLong: "Present", active: "bg-emerald-600 text-white", idle: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" },
  { value: "UNPAID_LEAVE", label: "A", labelLong: "Unpaid leave", active: "bg-rose-600 text-white", idle: "bg-rose-50 text-rose-700 hover:bg-rose-100" },
  { value: "LEAVE_AUTHORIZED", label: "H", labelLong: "Holiday / authorized leave", active: "bg-slate-700 text-white", idle: "bg-slate-100 text-slate-600 hover:bg-slate-200" },
];

export default function AttendanceGrid() {
  const dispatch = useDispatch();
  const { daily, monthly, loading, error } = useSelector((state) => state.attendance);
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [day, setDay] = useState(today.getDate());
  const [savingEmployeeId, setSavingEmployeeId] = useState(null);
  const daysInMonth = new Date(year, month, 0).getDate();
  const selectedDay = Math.min(day, daysInMonth);
  const selectedDate = makeDate(year, month, selectedDay);

  useEffect(() => {
    dispatch(fetchDailyReport(selectedDate));
    dispatch(fetchMonthlySummary({ month, year }));
  }, [dispatch, month, year, selectedDate]);

  const monthlyByEmployee = useMemo(() => Object.fromEntries(monthly.map((item) => [item.employee_id, item])), [monthly]);
  const totalUnpaidDays = monthly.reduce((total, item) => total + Number(item.unpaid_leave_count || 0), 0);

  const setStatus = async (employeeId, status) => {
    setSavingEmployeeId(employeeId);
    try {
      await dispatch(saveAttendance({ employee_id: employeeId, date: selectedDate, status })).unwrap();
      await Promise.all([dispatch(fetchDailyReport(selectedDate)), dispatch(fetchMonthlySummary({ month, year }))]);
    } finally {
      setSavingEmployeeId(null);
    }
  };

  const setAllPresent = async () => {
    for (const employee of daily) await setStatus(employee.employee_id, "PRESENT");
  };

  return <>
    <PageHeader title="Attendance register" subtitle="Choose a date, then record every employee’s attendance in one clear view.">
      <select className="field" value={month} onChange={(event) => { setMonth(Number(event.target.value)); setDay(1); }} aria-label="Month">
        {Array.from({ length: 12 }, (_, index) => <option key={index + 1} value={index + 1}>{new Date(2026, index).toLocaleString("en", { month: "long" })}</option>)}
      </select>
      <input className="field w-24" type="number" min="2020" value={year} onChange={(event) => setYear(Number(event.target.value))} aria-label="Year" />
      <select className="field" value={selectedDay} onChange={(event) => setDay(Number(event.target.value))} aria-label="Day">
        {Array.from({ length: daysInMonth }, (_, index) => <option key={index + 1} value={index + 1}>Day {index + 1}</option>)}
      </select>
    </PageHeader>
    <section className="p-4 sm:p-6">
      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <SummaryCard icon={Users} label="Employees in register" value={daily.length} color="text-indigo-600 bg-indigo-50" />
        <SummaryCard icon={CalendarDays} label="Selected date" value={new Date(`${selectedDate}T00:00:00`).toLocaleDateString("en", { day: "numeric", month: "short", year: "numeric" })} color="text-emerald-600 bg-emerald-50" />
        <SummaryCard icon={WalletCards} label="Unpaid days this month" value={totalUnpaidDays} color="text-rose-600 bg-rose-50" />
      </div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap gap-2 text-xs font-medium"><span className="rounded-md bg-emerald-100 px-2.5 py-1 text-emerald-700">P · Present</span><span className="rounded-md bg-rose-100 px-2.5 py-1 text-rose-700">A · Unpaid leave</span><span className="rounded-md bg-slate-200 px-2.5 py-1 text-slate-700">H · Holiday / authorized leave</span></div>
        <button disabled={loading || !daily.length || savingEmployeeId} onClick={setAllPresent} className="button text-sm"><Check size={16} />Mark all present</button>
      </div>
      {error && <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div>}
      {loading && !daily.length ? <Empty>Loading the attendance register…</Empty> : daily.length ? <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"><table className="w-full min-w-[820px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800/60"><tr><th className="px-5 py-4">Employee</th><th className="px-4 py-4">Department</th><th className="px-4 py-4">Attendance status</th><th className="px-5 py-4">Monthly summary</th></tr></thead><tbody>{daily.map((employee) => <AttendanceRow key={employee.employee_id} employee={employee} monthly={monthlyByEmployee[employee.employee_id]} saving={savingEmployeeId === employee.employee_id} onChange={setStatus} />)}</tbody></table></div> : <Empty>No employees were returned for this date.</Empty>}
    </section>
  </>;
}

function SummaryCard({ icon: Icon, label, value, color }) { return <div className="card flex items-center gap-4"><span className={`rounded-xl p-3 ${color}`}><Icon size={20} /></span><div><p className="text-xs font-medium text-slate-500">{label}</p><p className="mt-1 text-lg font-bold">{value}</p></div></div>; }
function AttendanceRow({ employee, monthly, saving, onChange }) { const unpaid = Number(monthly?.unpaid_leave_count || 0); return <tr className="border-t border-slate-100 dark:border-slate-800"><td className="px-5 py-4"><p className="font-semibold">{employee.full_name}</p><p className="mt-0.5 text-xs text-slate-500">ID #{employee.employee_id}</p></td><td className="px-4 py-4 text-slate-600 dark:text-slate-300">{employee.department || "—"}</td><td className="px-4 py-4"><div className="flex gap-2">{statuses.map((status) => <button key={status.value} disabled={saving} title={status.labelLong} onClick={() => onChange(employee.employee_id, status.value)} className={`grid h-9 w-9 place-items-center rounded-lg text-sm font-bold transition disabled:cursor-wait disabled:opacity-50 ${employee.status === status.value ? status.active : status.idle}`}>{status.label}</button>)}</div></td><td className="px-5 py-4"><p className="font-medium text-slate-700 dark:text-slate-200">{monthly?.present_count || 0} present · <span className={unpaid ? "text-rose-600" : ""}>{unpaid} unpaid</span></p><p className="mt-1 text-xs text-slate-500">Payroll uses unpaid leave days for deductions.</p></td></tr>; }
