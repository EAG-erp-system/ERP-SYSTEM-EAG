import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Building2, CheckCircle, CreditCard, Eye, Plus, Printer, Users } from "lucide-react";
import PageHeader, { Empty, money, StatusBadge } from "../components/PageHeader";
import { approvePayroll, fetchPayrollBatch, fetchPayrollBatches, generatePayroll, payPayroll } from "../features/payroll/payrollThunks";

const now = new Date();
const monthName = (month) => new Date(2026, Number(month) - 1).toLocaleString("en", { month: "long" });

export default function PayrollManagement() {
  const dispatch = useDispatch();
  const { batch, batches, loading, error } = useSelector((s) => s.payroll);
  const [month, setMonth] = useState(now.getMonth() + 1); const [year, setYear] = useState(now.getFullYear());
  const run = (thunk) => dispatch(thunk).unwrap().then(() => dispatch(fetchPayrollBatches())).catch(() => {});
  useEffect(() => { dispatch(fetchPayrollBatches()); }, [dispatch]);
  const totals = batch?.grand_totals;
  return <><PageHeader title="Payroll processing" subtitle="Generate, review, approve, and pay monthly payroll."><select aria-label="Payroll month" className="field" value={month} onChange={(e) => setMonth(+e.target.value)}>{Array.from({ length: 12 }, (_, i) => <option key={i} value={i + 1}>{monthName(i + 1)}</option>)}</select><input aria-label="Payroll year" className="field w-24" type="number" min="2000" max="2100" value={year} onChange={(e) => setYear(e.target.value)} /><button disabled={loading} onClick={() => run(generatePayroll({ month, year: Number(year) }))} className="button"><Plus size={17} />Generate payroll</button></PageHeader><section className="space-y-6 p-4 sm:p-6">{error && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">{error}</p>}<div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className="border-b border-slate-100 px-5 py-4 dark:border-slate-800"><h2 className="font-semibold">Generated payrolls</h2><p className="mt-1 text-sm text-slate-500">Select a period to view employee payroll details and take action.</p></div>{batches.length ? <table className="w-full min-w-[700px] text-sm"><thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800/60"><tr><th className="px-5 py-3">Period</th><th className="px-4 py-3">Employees</th><th className="px-4 py-3">Gross payroll</th><th className="px-4 py-3">Net payroll</th><th className="px-4 py-3">Status</th><th className="px-5 py-3 text-right">View</th></tr></thead><tbody>{batches.map((item) => <tr key={item.id} className="border-t border-slate-100 dark:border-slate-800"><td className="px-5 py-4 font-semibold">{monthName(item.month)} {item.year}</td><td className="px-4 py-4">{item.employee_count}</td><td className="px-4 py-4">{money(item.total_gross)} ETB</td><td className="px-4 py-4 font-medium">{money(item.total_net)} ETB</td><td className="px-4 py-4"><StatusBadge status={item.status} /></td><td className="px-5 py-4 text-right"><button className="inline-flex items-center gap-1 font-semibold text-blue-600" onClick={() => dispatch(fetchPayrollBatch(item.id))}><Eye size={16} />Open</button></td></tr>)}</tbody></table> : <Empty>No payroll batches have been generated.</Empty>}</div>{batch && <PayrollReport batch={batch} totals={totals} loading={loading} approve={() => run(approvePayroll(batch.id))} pay={() => run(payPayroll(batch.id))} />}</section></>;
}

function PayrollReport({ batch, totals, loading, approve, pay }) {
  const summaryCards = [
    ["Basic salary", totals?.total_basic_salary, "text-slate-700 dark:text-slate-200"],
    ["Gross salary", totals?.total_gross_salary, "text-blue-700 dark:text-blue-300"],
    ["Staff pension · 7%", totals?.total_employee_pension, "text-amber-700 dark:text-amber-300"],
    ["Employer pension · 11%", totals?.total_employer_pension, "text-violet-700 dark:text-violet-300"],
    ["Total deductions", totals?.total_deductions, "text-rose-700 dark:text-rose-300"],
    ["Net salary", totals?.total_net_salary, "text-emerald-700 dark:text-emerald-300"],
  ];

  return <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 print:border-0 print:p-0 print:shadow-none">
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 print:hidden"><div><h2 className="text-lg font-bold">{monthName(batch.month)} {batch.year} payroll</h2><div className="mt-2"><StatusBadge status={batch.status} /></div></div><div className="flex gap-2"><button className="button bg-slate-700 hover:bg-slate-800" onClick={() => window.print()}><Printer size={16} />Print table</button>{batch.status === "DRAFT" && <button disabled={loading} onClick={approve} className="button"><CheckCircle size={16} />Approve</button>}{batch.status === "APPROVED" && <button disabled={loading} onClick={pay} className="button"><CreditCard size={16} />Process payment</button>}</div></div>
    <div className="mb-6 hidden print:block"><h1 className="text-xl font-bold">Ethiopian Assemblies of God</h1><p className="text-sm text-slate-600">Payroll register · {monthName(batch.month)} {batch.year}</p></div>
    <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3 print:hidden">{summaryCards.map(([label, value, color]) => <div className="card p-4" key={label}><p className="text-sm text-slate-500">{label}</p><strong className={color}>{money(value)} ETB</strong></div>)}</div>
    <div className="mb-4 flex items-center gap-2 text-sm text-slate-500 print:hidden"><Users size={16} /><span>{batch.employees?.length || 0} employees</span><span className="mx-1">•</span><Building2 size={16} /><span>Employer contribution is not deducted from employee net pay.</span></div>
    <div className="overflow-x-auto"><table className="w-full min-w-[980px] text-sm print:min-w-0"><thead className="bg-slate-50 text-left dark:bg-slate-800/60 print:bg-slate-100"><tr>{["Employee", "Basic", "Allowances", "Unpaid days", "Tax", "Pension", "Net salary", "Payment"].map((x) => <th key={x} className={`p-3 ${x === "Payment" ? "print:hidden" : ""}`}>{x}</th>)}</tr></thead><tbody>{batch.employees?.map((p) => <tr key={p.id} className="border-t border-slate-100 dark:border-slate-800"><td className="p-3"><b>{p.full_name}</b><small className="block text-slate-500">{p.department}</small></td><td className="p-3">{money(p.basic_salary)}</td><td className="p-3">{money(Number(p.transport_allowance) + Number(p.mobil_card_allowance))}</td><td className="p-3">{p.unpaid_days_count} <span className="text-rose-600">({money(p.unpaid_days_deduction)})</span></td><td className="p-3">{money(p.income_tax)}</td><td className="p-3"><span className="block">Staff: {money(p.employee_pension_staff)}</span><span className="block text-xs text-slate-500">Employer: {money(p.employer_pension)}</span></td><td className="p-3 font-semibold">{money(p.net_salary)} ETB</td><td className="p-3 print:hidden"><StatusBadge status={p.payment_status || batch.status} /></td></tr>)}</tbody></table></div>
  </section>;
}
