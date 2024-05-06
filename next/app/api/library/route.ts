// modify this file to return every book lmao

import { PrismaClient } from '@prisma/client';
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

async function getAllBooks(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  let res;
  try {  
    const books = await prisma.book.findMany();
    res = new Response(JSON.stringify({msg: "All books fetched", data: books}), { status: 201 });
  } catch (err) {
    res = new Response(JSON.stringify("database error"), { status: 418 });
  } finally {
    await prisma.$disconnect();
    return res;
  }
}

export { getAllBooks as GET, getAllBooks as POST };
