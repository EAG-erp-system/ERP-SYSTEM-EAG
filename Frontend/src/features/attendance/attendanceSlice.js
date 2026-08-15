import { createSlice } from "@reduxjs/toolkit";
import { fetchDailyReport, fetchMonthlySummary, fetchMyAttendance, fetchMyStats, saveAttendance } from "./attendanceThunks";

const initialState = { monthly: [], daily: [], mine: [], myStats: null, loading: false, error: null };
const attendanceSlice = createSlice({ name: "attendance", initialState, reducers: { clearAttendanceError: (state) => { state.error = null; } }, extraReducers: (builder) => {
  builder
    .addCase(fetchMonthlySummary.pending, (state) => { state.loading = true; state.error = null; })
    .addCase(fetchMonthlySummary.fulfilled, (state, action) => { state.loading = false; state.monthly = action.payload; })
    .addCase(fetchMonthlySummary.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
    .addCase(fetchDailyReport.fulfilled, (state, action) => { state.loading = false; state.daily = action.payload; })
    .addCase(fetchMyAttendance.fulfilled, (state, action) => { state.loading = false; state.mine = action.payload; })
    .addCase(fetchMyStats.fulfilled, (state, action) => { state.loading = false; state.myStats = action.payload; })
    .addCase(saveAttendance.fulfilled, (state) => { state.loading = false; })
    .addMatcher((action) => action.type.startsWith("attendance/") && action.type.endsWith("/pending"), (state) => { state.loading = true; state.error = null; })
    .addMatcher((action) => action.type.startsWith("attendance/") && action.type.endsWith("/rejected"), (state, action) => { state.loading = false; state.error = action.payload; });
} });
export const { clearAttendanceError } = attendanceSlice.actions;
export default attendanceSlice.reducer;
