import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerEmployeeRequest, updateEmployeeRequest } from "./employeeAPI";

const errorMessage = (error) => error.response?.data?.message || error.message || "Employee request failed";

export const registerEmployee = createAsyncThunk("employee/register", async (payload, { rejectWithValue }) => {
  try { return await registerEmployeeRequest(payload); } catch (error) { return rejectWithValue(errorMessage(error)); }
});

export const updateEmployee = createAsyncThunk("employee/update", async (payload, { rejectWithValue }) => {
  try { return await updateEmployeeRequest(payload); } catch (error) { return rejectWithValue(errorMessage(error)); }
});
