import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"
import { check } from "./check";
import { api_status } from "../../status";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { email, username, password } = body;
  let _status = api_status({
    status: 0,
    msg: "",
    data: { email, username, }
  });
  console.log("body ==> ", body);
  if (check(body)) {
    _status.status = 400;
    _status.msg = Object(check(body));
    
    return NextResponse.json(_status, { status: 400 });
  }

  const existUser = await prisma.user.findUnique({
    where: {email}
  })
  if (existUser) {
    _status.msg = "Email 已被使用";
    _status.status = 400;
    return NextResponse.json(_status, { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashedPassword ==> ", hashedPassword);

  const newUser = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    }
  });

  _status = {
    status: 201,
    msg: "ok",
    data: { email: newUser.email, username: newUser.username, id: newUser.id , }
  } ;
  return NextResponse.json(_status, { status: 200});

}