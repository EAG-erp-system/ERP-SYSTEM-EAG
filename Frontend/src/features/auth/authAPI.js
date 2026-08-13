import api from "../../api/axios";

export const loginRequest = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

export const fetchMeRequest = async () => {
    const response = await api.get("/auth/me");
    return response.data.data;
};
