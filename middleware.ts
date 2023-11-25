import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log("here middleware is executing");
  const isPublicPath = path === "/adminpanel/login";

  let token = request.cookies.get("token")?.value || "";

  console.log("token **********************************", token);
  // if (isPublicPath && token) {
  //   return NextResponse.redirect(new URL("/", request.nextUrl));
  // }

  // if (!isPublicPath && !token) {
  //   return NextResponse.redirect(new URL("/adminpanel/login", request.nextUrl));
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/adminpanel/login"],
};
