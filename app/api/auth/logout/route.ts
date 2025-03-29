import { serialize } from "cookie";
import { NextResponse } from "next/server";
import { api_status } from "../../status";

export async function POST() {
  const clearCookie = serialize("refreshToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  const _status = api_status({
    status: 200,
    msg: "登出成功",
    data: {},
  });

  const response = NextResponse.json(_status, { status: 200 });
  response.headers.set("Set-Cookie", clearCookie);
  return response;
}