import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const startTime = Date.now();
  const response = NextResponse.next();
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}: ${response.status} ${new Date().getTime() - startTime}ms`);
}
