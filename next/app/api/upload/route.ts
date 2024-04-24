// modify this file to accept book upload fields

import { PrismaClient } from '@prisma/client';
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

async function addPublication(req: NextRequest) {
  const body = await req.json();
  // The JSON blob contains information about publication, book author, series, tag, and parent objects
  const { book_name, author_name, description, tag, series, psid, pid, isbn, file, edition, num_pages, cover } = body;
  // Publication: pid, isbn, file, edition, num_pages, cover
  console.log("Publication info:");
  console.log(pid, isbn, file, edition, num_pages, cover);
  let pub_res;
  // Book: book_name, description
  console.log("Book info:");
  console.log(book_name, description);
  let book_res;
  // Series: series

  // Tag: tag(_name)

  // Author: author_name

  // Publication in Series: psid
  try {  
    await prisma.publication.create({
      data: {
        pid: pid,
        isbn: isbn,
        file: file,
        edition: edition,
        num_pages: num_pages,
        cover: cover,
      },
    });
    pub_res = new Response(JSON.stringify("Publication added"), { status: 201 });
  } catch (err) {
    pub_res = new Response(JSON.stringify("Database Error"), { status: 418 });
  } finally {
    await prisma.$disconnect();
    console.log(pub_res)
  }
  try {  
    await prisma.book.create({
      data: {
        bname: book_name,
        description: description,
      },
    });
    book_res = new Response(JSON.stringify("Book added"), { status: 201 });
  } catch (err) {
    book_res = new Response(JSON.stringify("Database Error"), { status: 418 });
  } finally {
    await prisma.$disconnect();
    console.log(book_res)
  }
}

export { addPublication as GET, addPublication as POST };
