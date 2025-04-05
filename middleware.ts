import { NextResponse, NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { match } from 'assert'
const CHECK_PATHS = [
  '/user',
]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log('middleware', pathname); 

  if (!CHECK_PATHS.includes(pathname)) return NextResponse.next();
  
  const token = req.cookies.get('refreshToken')?.value;

  console.log('middleware token', token);
  if (!token) {
    console.log('沒有token 所以不行！')
    return NextResponse.redirect(new URL('/?eroor="尚未登入會員"', req.url));
  }
}

export const config = {
  matcher: [
    /*
     * 只保護非 /api、非 /_next、非 static 資源的頁面
     * 表示只攔截用戶真正進入的「頁面路由」
     */
    '/((?!api|_next|favicon.ico|assets).*)',
  ],
}
