import { getTokenHeader } from '@/utils/backend/utils';
import { getServerSession } from 'next-auth/next';
import 'server-only';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const getAllSubstudies = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session.error || session.accessToken === undefined) {
    throw new Error("Not authenticated");
  }

  const url = new URL('/v1/substudy-management', process.env.RESEARCHER_BACKEND_URL);

  const response = await fetch(url.toString(), {
    headers: { ...getTokenHeader(session.accessToken) },
  });
  if (!response.ok) {
    throw new Error(`Failed to get substudies: ${response.statusText}`);
  }
  const substudies = await response.json();
  return substudies.studyInfos;
}
