import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

async function signUp(req: NextRequest) {
  const body = await req.json();
  const { email, uname, password, fname, lname, dob } = body;
  const hashedPassword = await bcrypt.hash(password, 10);
  let res;
  try {  
    await prisma.user.create({
      data: {
        email: email,
        uname: uname,
        password: hashedPassword,
        first_name: fname,
        last_name: lname,
        dob: new Date(dob),
      },
    });
    res = new Response(JSON.stringify("user created"), { status: 201 });
  } catch (err) {
    res = new Response(JSON.stringify("database error"), { status: 418 });
  } finally {
    await prisma.$disconnect();
    return res;
  }
}

export { signUp as GET, signUp as POST };
