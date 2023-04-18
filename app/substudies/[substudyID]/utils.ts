import "server-only";

import { researcherBackendURL } from "@/utils/backend/api";
import { getTokenHeader } from "@/utils/backend/utils";
import { cache } from "react";

export const getSubstudy = cache(async (substudyKey: string, accessToken: string) => {
  const url = new URL(`${researcherBackendURL}/v1/substudy/${substudyKey}/`);

  // await new Promise(resolve => setTimeout(resolve, 2000));

  const response = await fetch(url.toString(), {
    headers: getTokenHeader(accessToken),
  });
  const data = await response.json();
  if (!response.ok) {
    console.log(data.error)
    throw new Error('couldn\'t get substudy');
  }
  return data;
});
