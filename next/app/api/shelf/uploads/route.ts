// this function retrieves of uploads of the current user

import { PrismaClient } from '@prisma/client';
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

async function getUploads(req: NextRequest) {
  const body = await req.json();
  const uid = body.token.user.sub;
  let res, result;
  try {  
    const user = await prisma.user.findUnique({
      where: { uid: uid },
      include: { publications: true },
    });

    if (!user) throw new Error("no user");

    result = await prisma.$transaction(user.publications.map((item: any) => 
      prisma.book.findUnique({
        where: { bid: item.bid },
      }),
    ));

    console.log(user);
    res = new Response(JSON.stringify({msg: "user uploads fetched", data: result}), { status: 201 });
  } catch (err) {
    res = new Response(JSON.stringify({msg: "database error", data: err}), { status: 418 });
  } finally {
    await prisma.$disconnect();
    return res;
  }
}

export { getUploads as GET, getUploads as POST };
