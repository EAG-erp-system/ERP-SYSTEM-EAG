import { createSlice } from "@reduxjs/toolkit";
import { changeSalary, fetchSalaryHistory } from "./salaryHistoryThunks";
const initialState = { records: [], loading: false, error: null };
const salaryHistorySlice = createSlice({ name: "salaryHistory", initialState, reducers: { clearHistory: (state) => { state.records = []; state.error = null; } }, extraReducers: (builder) => {
  builder
    .addCase(fetchSalaryHistory.fulfilled, (state, action) => { state.loading = false; state.records = action.payload; })
    .addCase(changeSalary.fulfilled, (state) => { state.loading = false; })
    .addMatcher((action) => action.type.startsWith("salaryHistory/") && action.type.endsWith("/pending"), (state) => { state.loading = true; state.error = null; })
    .addMatcher((action) => action.type.startsWith("salaryHistory/") && action.type.endsWith("/rejected"), (state, action) => { state.loading = false; state.error = action.payload; });
} });
export const { clearHistory } = salaryHistorySlice.actions;
export default salaryHistorySlice.reducer;
