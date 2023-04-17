import "server-only";

import { researcherBackendURL } from "@/utils/backend/api";
import { getTokenHeader } from "@/utils/backend/utils";
import { cache } from "react";

export const getSubstudy = cache(async (substudyKey: string, accessToken: string) => {
  const url = new URL(`${researcherBackendURL}/v1/substudy/${substudyKey}/`);

  const response = await fetch(url.toString(), {
    headers: getTokenHeader(accessToken),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
});
