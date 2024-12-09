import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const endpoints = {
  users: {
    getAll: () => api.get("/users"),
    getByEmail: (email: string) => api.get(`/users/${email}`),
  },
  products: {
    getAll: () => api.get("/products"),
    getById: (id: string) => api.get(`/products/${id}`),
  },
  wallets: {
    getByUserId: (userId: string) => api.get(`/wallets/${userId}`),
  },
  purchases: {
    getPurchaseHistory: (userId: string) =>
      api.get(`/purchases/history?userId=${userId}`),
  },
};
