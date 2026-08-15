import api from "../../api/axios";

export const createPayrollBatch = async (payload) => (await api.post("/payroll/generate", payload)).data.data;
export const approvePayrollBatch = async (id) => (await api.patch(`/payroll/batch/${id}/approve`)).data.data;
export const payPayrollBatch = async (id) => (await api.patch(`/payroll/batch/${id}/pay`)).data.data;
export const getPayrollBatches = async () => (await api.get("/payroll/batches")).data.data;
export const getPayrollBatch = async (id) => (await api.get(`/payroll/batch/${id}`)).data.data;
export const getMyPayslip = async ({ month, year }) =>
  (await api.get("/payroll/my-payslip", { params: { month, year } })).data.data;
