import React from 'react';
import api from '@/services/api';

const turfService = {
  getTurfs: async (params) => {
    const response = await api.get('/turfs', { params });
    return response.data;
  },

  getTurf: async (id) => {
    const response = await api.get(`/turfs/${id}`);
    return response.data;
  },

  createTurf: async (turfData) => {
    const response = await api.post('/turfs', turfData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  updateTurf: async (id, turfData) => {
    const response = await api.put(`/turfs/${id}`, turfData);
    return response.data;
  },

  deleteTurf: async (id) => {
    const response = await api.delete(`/turfs/${id}`);
    return response.data;
  },

  approveTurf: async (id, status) => {
    const response = await api.put(`/turfs/${id}/approve`, { status });
    return response.data;
  },
};

export default turfService;
