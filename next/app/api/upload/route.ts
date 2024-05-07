// this function inserts entires into the database
// need to edit to allow actual file upload
// fetch existing relations if applicable, compare at the end then delete.

import { PrismaClient } from '@prisma/client';
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

async function addPublication(req: NextRequest) {
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

    if (book.tags) {
      result = await prisma.$transaction(
        book.tags.split(',').map((t: string) => prisma.tag.upsert({
        where: { tname: t.trim() },
        update: {},
        create: {
          tname: t.trim(),
        }
      })));
      ids.tid = result.map(t => t.tid);
      console.log("Tags Upserted\n", result)
    }

    if (publication.sname){ 
      result = await prisma.series.upsert({
        where: { sname: publication.sname },
        update: {},
        create: {
          sname: publication.sname,
        },
      });
      ids.sid = result.sid;
      console.log("Series Upserted\n", result)
    }

    if (authors) {
      result = await prisma.$transaction(
        authors.map((a: any) => prisma.author.upsert({
          where: { aname: a.aname },
          update: { 
            description: a.description,
            dob: a.dob,
          },
          create: {
            aname: a.aname,
            description: a.description,
            dob: a.dob,
          }
        }))
      );
      ids.aid = result.map(a => a.aid);
      console.log("Authors Upserted\n", result)
    }

    if (publication.pname){ 
      result = await prisma.publisher.upsert({
        where: { pname: publication.pname },
        update: {},
        create: {
          pname: publication.pname,
        },
      });
      ids.cid = result.cid;
      console.log("Publisher Upserted\n", result)
    }

    if (book.langs) {
      result = await prisma.$transaction(
        book.langs.split(',').map((l: string) => prisma.language.upsert({
        where: { lname: l.trim() },
        update: {},
        create: {
          lname: l.trim(),
        }
      })));
      ids.lid = result.map(l => l.lid);
      console.log("Languages Upserted\n", result)
    }

    result = await prisma.publication.upsert({
      where: { bid_edition: {bid: ids.bid, edition: publication.edition} },
      update: {
        bid: ids.bid,
        edition: publication.edition,
        sid: ids.sid ? ids.sid : null,
        psid: publication.psid,
        uid: ids.uid ? ids.uid : null,
        cid: ids.cid ? ids.cid : null,
        year: publication.year,
        isbn: publication.isbn,
        file: publication.file,
        cover: publication.cover,
      },
      create: {
        bid: ids.bid,
        edition: publication.edition,
        sid: ids.sid ? ids.sid : null,
        psid: publication.psid,
        uid: ids.uid ? ids.uid : null,
        cid: ids.cid ? ids.cid : null,
        year: publication.year,
        isbn: publication.isbn,
        file: publication.file,
        cover: publication.cover,
      }
    });
    ids.pid = result.pid;
    console.log("Publication Upserted\n", result);

    console.log("Id of Updated Fields\n", ids)

    if (ids.tid) {
      result = await prisma.$transaction(ids.tid.map(id => prisma.bookHasTag.upsert({
          where: { bid_tid: { bid: ids.bid, tid: id } },
          update: {},
          create: {
            bid: ids.bid,
            tid: id,
          }
        }))
      );
      console.log("Book Has Tags Upserted\n", result)
    }

    if (ids.aid) {
      result = await prisma.$transaction(ids.aid.map((id: any, index) => authors[index].wbook ? prisma.authWritesBook.upsert({
          where: { aid_bid: { aid: id, bid: ids.bid } },
          update: {
            role: authors[index].role,
          },
          create: {
            aid: id,
            bid: ids.bid,
            role: authors[index].role,
          }
        }) : prisma.authWritesPub.upsert({
          where: { aid_pid: { aid: id, pid: ids.pid } },
          update: {
            role: authors[index].role,
          },
          create: {
            aid: id,
            pid: ids.pid,
            role: authors[index].role,
          }
        }))
      );
      console.log("Author Writes Upserted\n", result)
    }

    if (ids.lid) {
      result = await prisma.$transaction(ids.lid.map((id: any) => prisma.pubInLang.upsert({
          where: { pid_lid: { pid: ids.pid, lid: id } },
          update: {},
          create: {
            pid: ids.pid,
            lid: id,
          }
        }))
      );
      console.log("Pub In Lang Upserted\n", result)
    }

    res = new Response(JSON.stringify("Entries added"), { status: 201 });
  } catch (err) {
    console.log(err);
    res = new Response(JSON.stringify({ msg: "Database Error", data: err }), { status: 418 });
  } finally {
    await prisma.$disconnect();
    return res;
  }
}

export { addPublication as GET, addPublication as POST };
