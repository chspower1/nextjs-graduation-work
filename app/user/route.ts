import db from "@/libs/db.util";
import { getSession } from "@/libs/session.util";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      id: true,
      name: true,
      avator: true,
    },
  });
  return NextResponse.json(user);
};
