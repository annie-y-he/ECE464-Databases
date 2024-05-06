// modify this file to allow retrieval of followed content and uploads: uploads, user, publication, book, tag, series, author, publisher, language

import { PrismaClient } from '@prisma/client';
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

async function getFollows(req: NextRequest) {
  const body = await req.json();
  const uid = body.token.user.sub;
  let res, result;
  try {  
    const user = await prisma.user.findUnique({
      where: { uid: uid },
      include: { userFollows: true },
    });

    if (!user) throw new Error("no user");

    result = await prisma.$transaction(user.userFollows.map((item: any) => {
      switch (item.type) {
        case 'book':
          return (prisma.book.findUnique({
            where: { bid: item.fid },
          }) as any)
        // more types in the future            
      }
    }));

    res = new Response(JSON.stringify({msg: "fetched follows", data: result}), { status: 200 });
  } catch (err) {
    res = new Response(JSON.stringify({msg: "database error", data: err}), { status: 418 });
  } finally {
    await prisma.$disconnect();
    return res;
  }
}

export { getFollows as GET, getFollows as POST };
