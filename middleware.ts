import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
   console.log("🔒 Middleware running for:", req.nextUrl.pathname);
   console.log("🔒 Is authenticated:", !!req.auth);

   if (!req.auth) {
      console.log("🔒 Redirecting unauthenticated user to /login");
      return NextResponse.redirect(new URL("/login", req.url));
   }
});

export const config = {
   matcher: ["/dashboard/:path*", "/settings"],
};
