import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;
  if (pathname.includes("/api/auth") || pathname === "/login") {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!_next/static|favicon.ico|/images|/assets|.*\\.(?:jpg|jpeg|png|svg|gif|ico)).*)",
  ],
};
