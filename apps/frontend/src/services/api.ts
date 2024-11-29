import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const endpoints = {
  users: {
    getAll: () => api.get('/users'),
    getByEmail: (email: string) => api.get(`/users/${email}`),
  },
  products: {
    getAll: () => api.get('/products'),
    getById: (id: string) => api.get(`/products/${id}`),
  },
  wallet: {
    getByUserId: (userId: string) => api.get(`/wallet/${userId}`),
  },
};
