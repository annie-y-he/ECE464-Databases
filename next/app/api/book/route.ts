// get publications from book

import { PrismaClient } from '@prisma/client';
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

async function getAllBooks(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  let res;
  try {  
    const book = await prisma.book.findUnique({
      where: { bid: body.bid },
      include: { 
        publications: true,
        bookHasTag: { 
          include: { tag: { select: { tname: true } } } 
        },
        authWritesBook: {
          include: { author: { select: { aname: true, description: true } } } 
        } 
      }
    });
    if (!book) throw new Error("no book");
    console.log(book.publications)
    res = new Response(JSON.stringify({msg: "All books fetched", data: book}), { status: 201 });
  } catch (err) {
    res = new Response(JSON.stringify("database error"), { status: 418 });
  } finally {
    await prisma.$disconnect();
    return res;
  }
}

export { getAllBooks as GET, getAllBooks as POST };
