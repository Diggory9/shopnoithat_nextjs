import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isLogin: boolean = true;
export function middleware(request: NextRequest) {
    // if (isLogin) {

    // }
    // return NextResponse.redirect(new URL('/login', request.url))
}

// See "Matching Paths" below to learn more
// export const config = {
//     matcher: '/admin/:path*',
// }