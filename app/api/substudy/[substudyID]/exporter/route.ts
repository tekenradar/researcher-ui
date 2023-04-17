import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getTokenHeader } from "@/utils/backend/utils";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params: { substudyID } }: { params: { substudyID: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.error || session.accessToken === undefined) {
    throw new Error("Not authenticated");
  }
  // extract search params
  const { searchParams } = request.nextUrl;
  const dataset = searchParams.get('dataset');

  const url = new URL(`${process.env.RESEARCHER_BACKEND_URL}/v1/substudy/${substudyID}/data/${dataset}`);
  url.search = searchParams.toString();


  const apiResponse = await fetch(url.toString(), { headers: { ...getTokenHeader(session.accessToken) } });
  if (!apiResponse.ok) {
    return new Response(apiResponse.body, { status: apiResponse.status });
  }

  return new Response(apiResponse.body, { headers: { 'Content-Type': 'text/csv' } });
}
