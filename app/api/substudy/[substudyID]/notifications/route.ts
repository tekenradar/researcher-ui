import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getTokenHeader } from "@/utils/backend/utils";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest, { params: { substudyID } }: { params: { substudyID: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.error || session.accessToken === undefined) {
    throw new Error("Not authenticated");
  }


  const url = new URL(`${process.env.RESEARCHER_BACKEND_URL}/v1/substudy/${substudyID}/notifications`);

  // get body from request
  const body = await request.json();

  const apiResponse = await fetch(url.toString(), {
    headers: { ...getTokenHeader(session.accessToken) },
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (!apiResponse.ok) {
    return new Response(apiResponse.body, { status: apiResponse.status });
  }
  return NextResponse.json(await apiResponse.json());
}
