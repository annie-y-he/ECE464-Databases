// Allow users to follow (and eventually unfollow) other users

import { PrismaClient } from '@prisma/client';
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

async function follow(req: NextRequest) {
  const body = await req.json();
  // The JSON blob contains information about publication, book author, series, tag, and parent objects
  let res, result;
  const { token, user, followedObject, type } = body;
  // Follower info (user ID and maybe name)
  console.log("Follower info:");
  console.log(user);
  // Followed info: type
  console.log("Followed info:");
  console.log("ID: "+ followedObject +"\n");
  console.log("Type:" + type);
  
  interface Ids {
    uid: string;
    fid: string;
  }
  const ids: Ids = {
    uid: token.user.sub,
    fid: "",
  }

  try {  
    result = await prisma.userFollows.upsert({
      where: { uid: user.uid },
      update: { fid: followedObject.uid },
      create: {
        uid: user.uid,
        fid: followedObject.uid,
      },
    });
    ids.fid = result.fid;
    console.log("User follow Upserted\n", result);

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
