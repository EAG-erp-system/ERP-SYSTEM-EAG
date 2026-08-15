import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSalaryHistory, updateSalary } from "./salaryHistoryAPI";
const message = (error) => error.response?.data?.message || error.message || "Salary request failed";
export const fetchSalaryHistory = createAsyncThunk("salaryHistory/fetch", async (employeeId, { rejectWithValue }) => { try { return await getSalaryHistory(employeeId); } catch (error) { return rejectWithValue(message(error)); } });
export const changeSalary = createAsyncThunk("salaryHistory/change", async (payload, { rejectWithValue }) => { try { return await updateSalary(payload); } catch (error) { return rejectWithValue(message(error)); } });
