import api from "../../api/axios";

export const registerEmployeeRequest = async (payload) => {
  const response = await api.post("/auth/register", payload);
  return response.data.employee;
};

export const updateEmployeeRequest = async ({ id, payload }) => {
  const response = await api.put(`/auth/employees/${id}`, payload);
  return response.data.employee;
};
