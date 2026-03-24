import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/jobs';

const getAuthHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const fetchAllJobs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchMyJobs = async (token) => {
  const response = await axios.get(`${API_URL}/my-jobs`, getAuthHeader(token));
  return response.data;
};

export const createNewJob = async (jobData, token) => {
  const response = await axios.post(API_URL, jobData, getAuthHeader(token));
  return response.data;
};

export const updateExistingJob = async (id, jobData, token) => {
  const response = await axios.put(`${API_URL}/${id}`, jobData, getAuthHeader(token));
  return response.data;
};

export const deleteExistingJob = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader(token));
  return response.data;
};
