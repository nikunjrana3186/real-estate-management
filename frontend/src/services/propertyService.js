import api from './api';

// Remove empty filters so they are not sent as query params
const cleanParams = (filters = {}) =>
  Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== '' && v !== null && v !== undefined));

export const getProperties = (filters, signal) =>
  api.get('/properties', { params: cleanParams(filters), signal }).then((r) => r.data.data);

export const getPropertyById = (id) => api.get(`/properties/${id}`).then((r) => r.data.data);
export const createProperty = (data) => api.post('/properties', data).then((r) => r.data.data);
export const updateProperty = (id, data) => api.put(`/properties/${id}`, data).then((r) => r.data.data);
export const updatePropertyStatus = (id, status) =>
  api.patch(`/properties/${id}/status`, { status }).then((r) => r.data.data);
export const deleteProperty = (id) => api.delete(`/properties/${id}`).then((r) => r.data);
