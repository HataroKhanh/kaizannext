// src/middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const p = req.nextUrl.pathname;
      if (p.startsWith("/root"))   return token?.role === "root";
      if (p.startsWith("/admin"))  return token?.role === "admin" || token?.role === "root";
      return !!token; 
    },
  },
  pages: { signIn: "/signin" },
});

export const config = { matcher: ["/admin/:path*", "/root/:path*"] };
