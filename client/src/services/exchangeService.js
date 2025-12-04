import api from "./api";

export const exchangeService = {
  createExchange: async (exchangeData) => {
    const response = await api.post("/exchanges", exchangeData);
    return response.data;
  },

  getIncomingExchanges: async () => {
    const response = await api.get("/exchanges/incoming");
    return response.data;
  },

  getOutgoingExchanges: async () => {
    const response = await api.get("/exchanges/outgoing");
    return response.data;
  },

  acceptExchange: async (exchangeId) => {
    const response = await api.patch(`/exchanges/${exchangeId}/accept`);
    return response.data;
  },

  rejectExchange: async (exchangeId) => {
    const response = await api.patch(`/exchanges/${exchangeId}/reject`);
    return response.data;
  },

  cancelExchange: async (exchangeId) => {
    const response = await api.patch(`/exchanges/${exchangeId}/cancel`);
    return response.data;
  },
};
