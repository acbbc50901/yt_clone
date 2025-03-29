import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"
import { api_status } from "../../status";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  const { email, password } = body;
  let _status = api_status({
    status: 0,
    msg: "",
    data: { email, }
  });

  const user = await prisma.user.findUnique({
    where: { email }
  })
  if (!user) {
    _status.status = 400;
    _status.msg = "無此使用者";
    return NextResponse.json(_status, { status: 400 });
  }
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    _status.status = 400;
    _status.msg = "密碼錯誤";
    return NextResponse.json(_status, { status: 400 });
  }

  if (!process.env.JWT_SECRET) {
    _status.status = 500;
    _status.msg = "JWT_SECRET 伺服器錯誤";
    return NextResponse.json(_status, { status: 500 });
  }
  const accessToken = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: "1h"});
  const refreshToken = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: "7d"});

  _status = {
    status: 201,
    msg: "ok",
    data: { email: user.email, username: user.username, accessToken }
  } ;
  const response = NextResponse.json(_status, { status: 200});
  response.cookies.set("refreshToken", refreshToken, {httpOnly: true, path: "/", maxAge: 60*60*24*7});
  return response;
}