import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getTokenHeader } from "@/utils/backend/utils";
import { getServerSession } from "next-auth/next";
import "server-only";

export const getContactDetailsData = async (substudyID: string) => {

  const session = await getServerSession(authOptions);
  if (!session || session.error || session.accessToken === undefined) {
    throw new Error('Not authenticated');
  }

  const url = new URL(`${process.env.RESEARCHER_BACKEND_URL}/v1/substudy/${substudyID}/participant-contacts`);
  const apiResponse = await fetch(url.toString(), { headers: { ...getTokenHeader(session.accessToken) } });
  if (!apiResponse.ok) {
    throw new Error('Error fetching contact details');
  }
  const data = await apiResponse.json();
  return data;
}
