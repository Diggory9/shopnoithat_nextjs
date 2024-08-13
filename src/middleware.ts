import { NextRequest, NextResponse } from "next/server";
const authPages = ["/login", "/register"];
export default function middleware(req: NextRequest) {
    // const pathname = req.nextUrl.pathname;
    // const token = req.cookies.get("next-auth.session-token")?.value;
    // if (token) {
    //     if (token && authPages.some((page) => pathname.includes(page))) {
    //         return NextResponse.redirect(new URL("/admin", req.url));
    //         // return NextResponse.redirect(new URL(pathRedirect, req.url));
    //     }
    //     return NextResponse.next();
    // } else {
    //     return NextResponse.redirect(new URL("/login", req.url));
    // }
}

// export const config = {
//     matcher: ["/((?!api|_next|.*\\..*).*)"],
// };
