import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useAppSelector } from "./redux/hooks";

export function middleware(request: NextRequest) {
    // const userRole = getUserRole(request);
    // const { status, error, isLogin, data } = useAppSelector(
    //     (state) => state.authCredentials
    // );
    // if (data?.role?.[0] === "Admin") {
    //     return NextResponse.next(); // Allow access to the admin page
    // } else {
    //     return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login if not an admin
    // }
}

// Define the paths where this middleware should apply
// export const config = {
//     matcher: "/admin/:path*",
// };
