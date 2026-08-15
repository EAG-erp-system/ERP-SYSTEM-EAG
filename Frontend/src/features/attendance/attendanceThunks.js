import { createAsyncThunk } from "@reduxjs/toolkit";
import * as attendanceAPI from "./attendanceAPI";

const getErrorMessage = (error) => error.response?.data?.message || error.message || "Attendance request failed";
const makeThunk = (type, request) => createAsyncThunk(type, async (payload, { rejectWithValue }) => {
  try { return await request(payload); } catch (error) { return rejectWithValue(getErrorMessage(error)); }
});

export const fetchMonthlySummary = makeThunk("attendance/fetchMonthlySummary", attendanceAPI.getMonthlySummary);
export const fetchDailyReport = makeThunk("attendance/fetchDailyReport", attendanceAPI.getDailyReport);
export const saveAttendance = makeThunk("attendance/saveAttendance", attendanceAPI.markAttendance);
export const fetchMyAttendance = makeThunk("attendance/fetchMyAttendance", attendanceAPI.getMyAttendance);
export const fetchMyStats = makeThunk("attendance/fetchMyStats", attendanceAPI.getMyStats);
