// Resource-oriented wrappers around the HTTP client. Components and contexts
// call these instead of using fetch() directly, so URLs, auth and error
// handling live in exactly one place.
import { request } from './client';

export { ApiError, API_BASE, getToken, setToken, clearToken } from './client';

export const authApi = {
  login: (email, password) =>
    request('/api/login', { method: 'POST', body: { email, password } }),
  register: (payload) =>
    request('/api/register', { method: 'POST', body: payload }),
};

export const productsApi = {
  list: (signal) => request('/api/products', { signal }),
};

export const profileApi = {
  get: (signal) => request('/api/user/profile', { auth: true, signal }),
  update: (payload) =>
    request('/api/user/profile', { method: 'PUT', auth: true, body: payload }),
};

export const cartApi = {
  get: (signal) => request('/api/cart', { auth: true, signal }),
  add: (productId, quantity) =>
    request('/api/cart', { method: 'POST', auth: true, body: { productId, quantity } }),
  update: (productId, quantity) =>
    request(`/api/cart/${productId}`, { method: 'PUT', auth: true, body: { quantity } }),
  remove: (productId) =>
    request(`/api/cart/${productId}`, { method: 'DELETE', auth: true }),
  clear: () => request('/api/cart/clear', { method: 'POST', auth: true }),
};

export const wishlistApi = {
  get: (signal) => request('/api/wishlist', { auth: true, signal }),
  add: (productId) =>
    request('/api/wishlist', { method: 'POST', auth: true, body: { productId } }),
  remove: (productId) =>
    request(`/api/wishlist/${productId}`, { method: 'DELETE', auth: true }),
};

export const ordersApi = {
  list: (signal) => request('/api/orders', { auth: true, signal }),
  get: (orderId, signal) => request(`/api/orders/${orderId}`, { auth: true, signal }),
  place: (payload) => request('/api/orders', { method: 'POST', auth: true, body: payload }),
};
