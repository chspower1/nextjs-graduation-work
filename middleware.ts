import { NextResponse } from "next/server";
import type { NextMiddleware, NextRequest } from "next/server";
import { getSession } from "./libs/session.util";

interface PublicOnlyUrl {
  [key: string]: boolean;
}

const pulicOnlyUrl: PublicOnlyUrl = {
  "/log-in": true,
  "/create-account": true,
};
export const middleware: NextMiddleware = async (request: NextRequest) => {
  const session = await getSession();
  const accessingPublicPage = pulicOnlyUrl[request.nextUrl.pathname];
  if (session.id && accessingPublicPage) {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }
  if (!session.id && !accessingPublicPage) {
    return NextResponse.redirect(new URL("/log-in", request.nextUrl.origin));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
};

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|tweet_logo).*)",
};
