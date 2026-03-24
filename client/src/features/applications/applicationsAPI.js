import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getAuthHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const applyForJob = async (jobId, token) => {
  const response = await axios.post(
    `${BASE_URL}/api/jobs/${jobId}/apply`,
    {},
    getAuthHeader(token)
  );
  return response.data;
};

export const fetchApplications = async (token) => {
  const response = await axios.get(
    `${BASE_URL}/api/applications`,
    getAuthHeader(token)
  );
  return response.data;
};
