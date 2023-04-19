import 'server-only';

import { researcherBackendURL } from '@/utils/backend/api';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getTokenHeader } from '@/utils/backend/utils';


export const getContactDetails = async (substudyID: string, contactID: string) => {
  const session = await getServerSession(authOptions);
  if (!session || session.error || session.accessToken === undefined) {
    throw new Error("Not authenticated");
  }

  const url = new URL(`${researcherBackendURL}/v1/substudy/${substudyID}/participant-contacts/${contactID}`);
  const response = await fetch(url.toString(),
    {
      headers: { ...getTokenHeader(session.accessToken) },
    }
  );
  const data = await response.json();
  return data.participantContact;
}
