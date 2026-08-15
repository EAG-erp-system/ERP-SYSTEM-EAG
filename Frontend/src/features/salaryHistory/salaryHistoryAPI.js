import api from "../../api/axios";
export const getSalaryHistory = async (employeeId) => (await api.get(`/salary/employee/${employeeId}`)).data.data;
export const updateSalary = async (payload) => (await api.post("/salary/change", payload)).data.data;
