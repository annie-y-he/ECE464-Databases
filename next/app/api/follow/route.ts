// Allow users to follow (and eventually unfollow) other users

import { PrismaClient } from '@prisma/client';
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

async function follow(req: NextRequest) {
  const body = await req.json();
  let res, result;
  const { token, fid, type } = body;
  // Follower info (user ID and maybe name)
  console.log("Follower info:");
  console.log(token.user);
  // Followed info: type
  console.log("Followed info:");
  console.log("ID: "+ fid +"\n");
  console.log("Type:" + type);

  interface Ids {
    uid: string;
    fid: string;
    type: string;
  }
  const ids: Ids = {
    uid: token.user.sub,
    fid: fid,
    type: type,
  }

  try {  
    result = await prisma.userFollows.upsert({
      where: { uid_fid_type: ids },
      update: {},
      create: ids,
    });

    res = new Response(JSON.stringify("Entries added"), { status: 201 });
  } catch (err) {
    console.log(err);
    res = new Response(JSON.stringify("Database Error"), { status: 418 });
  } finally {
    await prisma.$disconnect();
    return res;
  }
}

export { follow as GET, follow as POST };
