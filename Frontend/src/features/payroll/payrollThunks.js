import { createAsyncThunk } from "@reduxjs/toolkit";
import { approvePayrollBatch, createPayrollBatch, getMyPayslip, getPayrollBatch, getPayrollBatches, payPayrollBatch } from "./payrollAPI";

const getErrorMessage = (error) => error.response?.data?.message || error.message || "Payroll request failed";
const makeThunk = (type, request) => createAsyncThunk(type, async (payload, { rejectWithValue }) => {
  try { return await request(payload); } catch (error) { return rejectWithValue(getErrorMessage(error)); }
});

export const generatePayroll = makeThunk("payroll/generate", createPayrollBatch);
export const approvePayroll = makeThunk("payroll/approve", approvePayrollBatch);
export const payPayroll = makeThunk("payroll/pay", payPayrollBatch);
// Semantic alias used by the approved-payroll disbursement workflow.
export const payBatch = makeThunk("payroll/payBatch", payPayrollBatch);
export const fetchMyPayslip = makeThunk("payroll/fetchMyPayslip", getMyPayslip);
export const fetchPayrollBatches = makeThunk("payroll/fetchBatches", getPayrollBatches);
export const fetchPayrollBatch = makeThunk("payroll/fetchBatch", getPayrollBatch);
