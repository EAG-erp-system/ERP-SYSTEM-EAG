import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"; 
import attendanceReducer from "../features/attendance/attendanceSlice";
import payrollReducer from "../features/payroll/payrollSlice";
import salaryHistoryReducer from "../features/salaryHistory/salaryHistorySlice";
import employeeReducer from "../features/employee/employeeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    attendance: attendanceReducer,
    payroll: payrollReducer,
    salaryHistory: salaryHistoryReducer,
    employee: employeeReducer,
  },
});
