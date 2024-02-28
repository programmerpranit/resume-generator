import { type JWTPayload, jwtVerify } from "jose";
import { NextResponse, type NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside

// const isAdminRoute = (pathname) => {
//   return pathname.startsWith('/admin');
// }

interface IPayload extends JWTPayload {
  user: {
    verified: boolean;
  };
}

export async function middleware(req: NextRequest): Promise<NextResponse> {
  // console.log(req);
  const token = req.cookies.get("authorization");

  if (token === undefined) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  try {
    // check route and accordingly change the KEY
    const key = process.env.JWT_SEC;

    const sec = new TextEncoder().encode(key);

    const { payload } = await jwtVerify(token.value, sec);
    // console.log(payload);
    const typedPayload = payload as IPayload;

    if (typedPayload.user !== null) {
      return NextResponse.next();
    }
  } catch (error) {
    console.log("Middleware ", error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  return NextResponse.redirect(new URL("/auth/login", req.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/resume",
    "/resume/:path*",
    "/profile",
    "/profile/:path*",
    "/templates",
    "/templates/:path*",
  ],
};
