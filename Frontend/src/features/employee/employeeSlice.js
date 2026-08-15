import { createSlice } from "@reduxjs/toolkit";
import { registerEmployee, updateEmployee } from "./employeeThunks";

const initialState = { saving: false, error: null, lastCreated: null };
const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    clearEmployeeError: (state) => { state.error = null; },
    clearLastCreated: (state) => { state.lastCreated = null; },
  },
  extraReducers: (builder) => builder
    .addCase(registerEmployee.fulfilled, (state, action) => { state.saving = false; state.lastCreated = action.payload; })
    .addCase(updateEmployee.fulfilled, (state) => { state.saving = false; })
    .addMatcher((action) => action.type.startsWith("employee/") && action.type.endsWith("/pending"), (state) => { state.saving = true; state.error = null; })
    .addMatcher((action) => action.type.startsWith("employee/") && action.type.endsWith("/rejected"), (state, action) => { state.saving = false; state.error = action.payload; }),
});

export const { clearEmployeeError, clearLastCreated } = employeeSlice.actions;
export default employeeSlice.reducer;
