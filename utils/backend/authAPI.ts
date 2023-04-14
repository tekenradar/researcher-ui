import reseacherBackendAPI, { getTokenHeader } from "./api";


interface TokenResponse {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export const initializeTokenReq = (email: string) => reseacherBackendAPI.post<TokenResponse>('/v1/auth/init-token', { email }, { headers: { ...getTokenHeader('') } });
export const renewTokenReq = (refreshToken: string, accessToken: string) => reseacherBackendAPI.post<TokenResponse>('/v1/auth/renew-token', { refreshToken }, { headers: { ...getTokenHeader(accessToken) } });
export const logoutReq = (accessToken: string, refreshToken: string) => reseacherBackendAPI.post('/v1/auth/logout', { refreshToken }, { headers: { ...getTokenHeader(accessToken) } });
