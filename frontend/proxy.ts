import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { JWT_SECRET_KEY } from "./lib/config/config";

const secret = new TextEncoder().encode(JWT_SECRET_KEY);

export const proxy = async (req: NextRequest) => {
    const token = req.cookies.get("auth_token")?.value;
    const { pathname } = req.nextUrl;

    // No token
    if (!token) {
        if (pathname.startsWith("/admin") || pathname.startsWith("/user")) {
            return NextResponse.redirect(new URL("/login", req.url));
        };

        return NextResponse.next();
    };

    try {
        // Verify + decode JWT
        const { payload } = await jwtVerify(token, secret);

        const role = payload.role as string | undefined;

        // Admin routes
        if (pathname.startsWith("/admin") && role !== "admin") {
            return NextResponse.redirect(new URL("/login", req.url));
        };

        // User routes
        if (pathname.startsWith("/user") && role !== "user") {
            return NextResponse.redirect(new URL("/login", req.url));
        };

        return NextResponse.next();

    } catch (error) {
        const response = NextResponse.redirect(new URL("/login", req.url));

        response.cookies.delete("auth_token");

        return response;
    };
};

// Apply middleware only to protected routes
export const config = {
    matcher: ["/admin/:path*", "/user/:path*"]
};