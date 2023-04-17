// import "server-only";

export const getTokenHeader = (accessToken: string) => {
  return {
    'Authorization': `Bearer ${accessToken}`,
    'Api-Key': process.env.RESEARCHER_BACKEND_API_KEY ?? '',
  }
}
