// modify this file to allow retrieval of search results: user, book, author, series, publisher, tag

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

async function signUp(req: NextRequest) {
  const body = await req.json();
  const { query } = body;
  console.log(query)
  let res, result, item;
  try {  
    const books = await prisma.book.findMany({
      where: {
        OR: [
          {
            bname: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            bookHasTag: {
              some: {
                tag: {
                  tname: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              },
            },
          },
        ],
      },
    });
    res = new Response(JSON.stringify({ msg: "found stuff", data: books }), { status: 200 });
  } catch (err) {
    res = new Response(JSON.stringify({ msg: "database error", data: err }), { status: 418 });
  } finally {
    await prisma.$disconnect();
    return res;
  }
}

export { signUp as GET, signUp as POST };
