// modify this file to recommend publications to user based on what the user has liked.

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

async function signUp(req: NextRequest) {
  const body = await req.json();
  const { suEmail, uname, suPassword, fname, lname, dob } = body;
  console.log(suEmail, uname, suPassword, fname, lname, dob)
  const hashedPassword = await bcrypt.hash(suPassword, 10);
  let res;
  try {  
    await prisma.user.create({
      data: {
        email: suEmail,
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
