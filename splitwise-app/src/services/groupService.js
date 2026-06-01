import api from "../api/axios";

export const groupService = {
  create: (data) => api.post("/groups", data),
  getMyGroups: () => api.get("/groups/my-groups"),
  getById: (id) => api.get(`/groups/${id}`),
  update: (id, data) => api.put(`/groups/${id}`, data),
  delete: (id) => api.delete(`/groups/${id}`),
  addMember: (groupId, data) => api.post(`/groups/${groupId}/members`, data),
  getMembers: (groupId) => api.get(`/groups/${groupId}/members`),
};
