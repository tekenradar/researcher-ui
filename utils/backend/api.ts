import axios from 'axios';

export const researcherBackendURL = process.env.RESEARCHER_BACKEND_URL ? process.env.RESEARCHER_BACKEND_URL : '';

const reseacherBackendAPI = axios.create({
  baseURL: researcherBackendURL,
});

export default reseacherBackendAPI;
