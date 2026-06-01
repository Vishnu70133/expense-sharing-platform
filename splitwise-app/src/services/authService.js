import api from "../api/axios";

export const authService = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  me: () => api.get("/auth/me"),
  updatePassword: (data) => api.put("/auth/password", data),
  updateEmail: (data) => api.put("/auth/email", data),
};
