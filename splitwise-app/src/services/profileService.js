import api from "../api/axios";

export const profileService = {
  getMe: () => api.get("/profiles/me"),
  updateMe: (data) => api.put("/profiles/me", data),
  deleteMe: () => api.delete("/profiles/me"),
};
