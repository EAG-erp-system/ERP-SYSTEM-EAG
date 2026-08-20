import { createSlice } from "@reduxjs/toolkit";
import { approvePayroll, fetchMyPayslip, fetchPayrollBatch, fetchPayrollBatches, generatePayroll, payBatch, payPayroll } from "./payrollThunks";

const initialState = { batch: null, activeBatch: null, batches: [], payslip: null, loading: false, error: null };
const payrollSlice = createSlice({ name: "payroll", initialState, reducers: { clearPayrollError: (state) => { state.error = null; } }, extraReducers: (builder) => {
  builder
    .addCase(generatePayroll.fulfilled, (state, action) => { state.loading = false; state.batch = action.payload; state.activeBatch = action.payload; })
    .addCase(approvePayroll.fulfilled, (state, action) => { state.loading = false; state.batch = action.payload; state.activeBatch = action.payload; })
    .addCase(payPayroll.fulfilled, (state, action) => { state.loading = false; state.batch = action.payload; state.activeBatch = action.payload; })
    .addCase(payBatch.fulfilled, (state, action) => { state.loading = false; state.batch = action.payload; state.activeBatch = action.payload; state.batches = state.batches.map((batch) => batch.id === action.payload.id ? { ...batch, status: action.payload.status, total_net: action.payload.total_net } : batch); })
    .addCase(fetchMyPayslip.fulfilled, (state, action) => { state.loading = false; state.payslip = action.payload; })
    .addCase(fetchPayrollBatches.fulfilled, (state, action) => { state.loading = false; state.batches = action.payload; })
    .addCase(fetchPayrollBatch.fulfilled, (state, action) => { state.loading = false; state.batch = action.payload; state.activeBatch = action.payload; })
    .addMatcher((action) => action.type.startsWith("payroll/") && action.type.endsWith("/pending"), (state) => { state.loading = true; state.error = null; })
    .addMatcher((action) => action.type.startsWith("payroll/") && action.type.endsWith("/rejected"), (state, action) => { state.loading = false; state.error = action.payload; });
} });
export const { clearPayrollError } = payrollSlice.actions;
export default payrollSlice.reducer;
