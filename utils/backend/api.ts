import axios from 'axios';

export const researcherBackendURL = process.env.RESEARCHER_BACKEND_URL ? process.env.RESEARCHER_BACKEND_URL : '';

const reseacherBackendAPI = axios.create({
  baseURL: researcherBackendURL,
});

export const getTokenHeader = (accessToken: string) => {
  return {
    'Authorization': `Bearer ${accessToken}`,
    'Api-Key': process.env.RESEARCHER_BACKEND_API_KEY ?? '',
  }
}


export default reseacherBackendAPI;
