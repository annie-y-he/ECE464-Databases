// edit this function to allow retrieval of data

import { PrismaClient } from '@prisma/client';
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

async function addTag(req: NextRequest) {
  const body = await req.json();
  // The JSON blob contains information about publication, book author, series, tag, and parent objects
  let res, result;
  const { token, book, publication, authors } = body;
  // Book: bname, description, tags
  console.log("Book info:");
  console.log(book);
  // Publication: edition, isbn, sname, psid, pname, year, langs
  console.log("Publication info:");
  console.log(publication);
  // Authors: aname, description, dob, role, wbook
  console.log("Author info:");
  console.log(authors);
  console.log("User info:");
  console.log(token);
  interface Ids {
    uid: string;
    pid: string;
    bid: string;
    tid: string[];
    sid: string;
    aid: string[];
    cid: string;
    lid: string[];
  }
  const ids: Ids = {
    uid: token.user.sub,
    pid: "",
    bid: "",
    tid: [],
    sid: "",
    aid: [],
    cid: "",
    lid: [],
  }

  try {  
    result = await prisma.book.upsert({
      where: { bname: book.bname },
      update: { description: book.description },
      create: {
        bname: book.bname,
        description: book.description,
      },
    });
    ids.bid = result.bid;
    console.log("Book Upserted\n", result);
    res = new Response(JSON.stringify("Entries added"), { status: 201 });
  } catch (err) {
    console.log(err);
    res = new Response(JSON.stringify("Database Error"), { status: 418 });
  } finally {
    await prisma.$disconnect();
    return res;
  }
}

export { addTag as GET, addTag as POST };
