import "server-only";

import { researcherBackendURL } from "@/utils/backend/api";
import { getTokenHeader } from "@/utils/backend/utils";

export const getSubstudies = async (accessToken: string) => {
  // TODO: remove this
  // await new Promise(resolve => setTimeout(resolve, 2000));

  const url = new URL(`${researcherBackendURL}/v1/substudy/infos`);

  const response = await fetch(url.toString(), {
    headers: getTokenHeader(accessToken),
    cache: 'force-cache',
    next: { revalidate: 10 }
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data.studyInfos;
}
