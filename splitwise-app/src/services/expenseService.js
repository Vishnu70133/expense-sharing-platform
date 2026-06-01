import api from "../api/axios";

export const expenseService = {
  create: (data) => api.post("/expenses", data),
  getByGroup: (groupId) => api.get(`/expenses/groups/${groupId}`),
  getBalances: (groupId) => api.get(`/expenses/groups/${groupId}/balances`),
  getSettlements: (groupId) => api.get(`/expenses/groups/${groupId}/settlements`),
  getById: (expenseId) => api.get(`/expenses/${expenseId}`),
  update: (expenseId, data) => api.put(`/expenses/${expenseId}`, data),
  delete: (expenseId) => api.delete(`/expenses/${expenseId}`),
  recordSettlement: (data) =>
    api.post("/expenses/settlements", data),
};
