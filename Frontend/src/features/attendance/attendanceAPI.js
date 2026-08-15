import api from "../../api/axios";

export const getMonthlySummary = async ({ month, year }) =>
  (await api.get("/attendance/monthly-summary", { params: { month, year } })).data.data;

export const getDailyReport = async (date) =>
  (await api.get("/attendance/daily-report", { params: { date } })).data.data;

export const markAttendance = async (attendance) => {
  await api.post("/attendance/mark", attendance);
  return attendance;
};

export const getMyAttendance = async ({ startDate, endDate }) =>
  (await api.get("/attendance/my-attendance", { params: { startDate, endDate } })).data.data;

export const getMyStats = async ({ month, year }) =>
  (await api.get("/attendance/my-stats", { params: { month, year } })).data.data;
