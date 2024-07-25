import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/sign-in", "/sign-up", "/text-editor"],
  ignoredRoutes: ["/no-auth-in-this-route", "/api/:path*"],
  afterAuth: async (auth, req) => {
    if (auth.userId && auth.isPublicRoute) {
      const orgSelection = new URL("/ru/me", req.url);
      return NextResponse.redirect(orgSelection);
    }

    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    const res = NextResponse.next();
    const token = await auth.getToken({ template: "100d" });

    token && res.cookies.set("jwt", token);

    return res;
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
