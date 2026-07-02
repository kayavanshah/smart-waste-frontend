import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const path = req.nextUrl.pathname;
      // Protect admin routes
      if (path.startsWith("/admin")) {
        return token?.role === "admin";
      }
      // Protect dashboard routes
      if (path.startsWith("/dashboard") || path.startsWith("/profile")) {
        return !!token;
      }
      return true;
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/profile/:path*"],
};
